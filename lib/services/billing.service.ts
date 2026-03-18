import { getBillingProvider } from "@/lib/billing";
import type { WebhookEvent } from "@/lib/billing/types";
import { subscriptionRepository } from "@/lib/repositories/subscription.repository";
import { userRepository } from "@/lib/repositories/user.repository";
import { Plan } from "@/generated/prisma/client";
import {
  BillingCycle,
  PRO_MONTHLY_PLAN_ID,
  resolvePlanFromPlanId,
} from "@/lib/billing/plan-catalog";

type MercadoPagoPaymentData = {
  external_reference?: string | null;
  metadata?: { plan_id?: string | null } | null;
  additional_info?: { items?: Array<{ id?: string | null }> | null } | null;
  order?: { items?: Array<{ id?: string | null }> | null } | null;
};

function addCyclePeriod(start: Date, cycle: BillingCycle): Date {
  const msPerDay = 24 * 60 * 60 * 1000;
  const days = cycle === "annual" ? 365 : 30;
  return new Date(start.getTime() + days * msPerDay);
}

interface UpgradeResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

export async function initiateUpgrade(
  userId: string,
  planId: string = PRO_MONTHLY_PLAN_ID
): Promise<UpgradeResult> {
  const user = await userRepository.findById(userId);
  if (!user) return { success: false, error: "Usuário não encontrado." };

  const resolved = resolvePlanFromPlanId(planId);
  if (!resolved) return { success: false, error: "Plano inválido." };

  if (user.plan === "PRO" && resolved.plan === Plan.PRO) {
    return { success: false, error: "Você já é Pro!" };
  }
  if (user.plan === "PLUS" && resolved.plan === "PLUS") {
    return { success: false, error: "Você já é Plus!" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";

  try {
    const provider = getBillingProvider();
    const result = await provider.createCheckoutUrl({
      userId: user.id,
      email: user.email,
      planId,
      successUrl: `${appUrl}/dashboard/assinatura?status=success`,
      cancelUrl: `${appUrl}/dashboard/assinatura?status=canceled`,
    });

    // Create or update subscription record as pending
    const existing = await subscriptionRepository.findByUserId(userId);
    const resolvedPlan = resolved.plan === "PRO" ? Plan.PRO : Plan.PLUS;
    if (existing) {
      await subscriptionRepository.update(existing.id, {
        status: "INACTIVE",
        mpSubscriptionId: result.externalId || null,
        plan: resolvedPlan,
      });
    } else {
      await subscriptionRepository.create({
        user: { connect: { id: userId } },
        plan: resolvedPlan,
        status: "INACTIVE",
        mpSubscriptionId: result.externalId || null,
      });
    }

    return { success: true, checkoutUrl: result.checkoutUrl };
  } catch (error) {
    console.error("Failed to initiate upgrade:", error);
    return { success: false, error: "Erro ao criar sessão de pagamento." };
  }
}

export async function processWebhookEvent(event: WebhookEvent): Promise<void> {
  console.log("[processWebhookEvent] Event:", event.type, event.externalSubscriptionId);
  
  if (event.type === "unknown") {
    console.log("[processWebhookEvent] Unknown event type, skipping");
    return;
  }

  const paymentId = event.externalSubscriptionId;
  if (!paymentId) {
    console.log("[processWebhookEvent] No payment ID, skipping");
    return;
  }

  // For payment events, we need to fetch payment details from Mercado Pago to get external_reference (userId)
  if (event.type === "payment.approved") {
    try {
      const { MercadoPagoConfig, Payment } = await import("mercadopago");
      const client = new MercadoPagoConfig({ 
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! 
      });
      const payment = new Payment(client);
      const paymentData = (await payment.get({ id: paymentId })) as MercadoPagoPaymentData;
      
      const userId = paymentData.external_reference;
      const paidPlanId =
        // MercadoPago returns metadata as an object in most flows; keep fallbacks to be safe.
        paymentData.metadata?.plan_id ||
        paymentData.additional_info?.items?.[0]?.id ||
        paymentData.order?.items?.[0]?.id ||
        null;

      console.log("[processWebhookEvent] Payment approved for user:", userId);
      
      if (!userId) {
        console.warn("[processWebhookEvent] No external_reference in payment");
        return;
      }

      const subscription = await subscriptionRepository.findByUserId(userId);
      if (!subscription) {
        console.warn("[processWebhookEvent] No subscription found for user:", userId);
        return;
      }

      const resolved = paidPlanId ? resolvePlanFromPlanId(String(paidPlanId)) : null;
      if (!resolved) {
        console.warn("[processWebhookEvent] Could not resolve plan from payment metadata:", paidPlanId);
        return;
      }

      const resolvedPlan = resolved.plan === "PRO" ? Plan.PRO : Plan.PLUS;
      const now = new Date();
      // Activate subscription
      await subscriptionRepository.update(subscription.id, {
        status: "ACTIVE",
        plan: resolvedPlan,
        currentPeriodStart: now,
        currentPeriodEnd: addCyclePeriod(now, resolved.cycle),
        mpSubscriptionId: paymentId, // Store payment ID for reference
      });
      await userRepository.update(userId, { plan: resolvedPlan });
      console.log("[processWebhookEvent] Subscription activated for user:", userId);
      return;
    } catch (error) {
      console.error("[processWebhookEvent] Error processing payment webhook:", error);
      return;
    }
  }

  // For subscription events (PreApproval), use the old logic
  const subscription = await subscriptionRepository.findByMpSubscriptionId(paymentId);
  if (!subscription) {
    console.warn("[processWebhookEvent] Webhook for unknown subscription:", paymentId);
    return;
  }

  switch (event.type) {
    case "subscription.created": {
      // Legacy PreApproval flow: keep behavior as PRO monthly by default.
      const now = new Date();
      await subscriptionRepository.update(subscription.id, {
        status: "ACTIVE",
        currentPeriodStart: now,
        currentPeriodEnd: addCyclePeriod(now, "monthly"),
      });
      await userRepository.update(subscription.userId, { plan: Plan.PRO });
      break;
    }

    case "subscription.updated": {
      // Fetch latest status from provider
      const provider = getBillingProvider();
      const info = await provider.getSubscription(paymentId);
      if (info) {
        const statusMap: Record<string, "ACTIVE" | "PAST_DUE" | "CANCELED" | "INACTIVE"> = {
          active: "ACTIVE",
          past_due: "PAST_DUE",
          canceled: "CANCELED",
          inactive: "INACTIVE",
        };
        const newStatus = statusMap[info.status] || "INACTIVE";
        await subscriptionRepository.update(subscription.id, {
          status: newStatus,
          currentPeriodStart: info.currentPeriodStart || undefined,
          currentPeriodEnd: info.currentPeriodEnd || undefined,
        });

        if (newStatus === "CANCELED" || newStatus === "INACTIVE") {
          await userRepository.update(subscription.userId, { plan: Plan.FREE });
        } else if (newStatus === "ACTIVE") {
          // Legacy PreApproval: treat as PRO
          await userRepository.update(subscription.userId, { plan: Plan.PRO });
        }
      }
      break;
    }

    case "payment.rejected": {
      await subscriptionRepository.update(subscription.id, { status: "PAST_DUE" });
      break;
    }
  }
}

export async function cancelSubscription(userId: string): Promise<{ success: boolean; error?: string }> {
  const subscription = await subscriptionRepository.findByUserId(userId);
  if (!subscription) {
    return { success: false, error: "Nenhuma assinatura encontrada." };
  }

  if (subscription.status === "CANCELED" || subscription.status === "INACTIVE") {
    return { success: false, error: "Assinatura já está cancelada." };
  }

  // Cancel externally if there's an MP subscription
  if (subscription.mpSubscriptionId) {
    try {
      const provider = getBillingProvider();
      await provider.cancelSubscription(subscription.mpSubscriptionId);
    } catch (error) {
      console.error("Failed to cancel external subscription:", error);
    }
  }

  await subscriptionRepository.update(subscription.id, {
    status: "CANCELED",
    canceledAt: new Date(),
  });
  await userRepository.update(userId, { plan: Plan.FREE });

  return { success: true };
}

export async function getSubscriptionInfo(userId: string) {
  const [user, subscription] = await Promise.all([
    userRepository.findById(userId),
    subscriptionRepository.findByUserId(userId),
  ]);

  if (!user) return null;

  return {
    plan: user.plan,
    subscription: subscription
      ? {
          status: subscription.status,
          currentPeriodStart: subscription.currentPeriodStart,
          currentPeriodEnd: subscription.currentPeriodEnd,
          canceledAt: subscription.canceledAt,
        }
      : null,
  };
}
