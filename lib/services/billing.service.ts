import { getBillingProvider } from "@/lib/billing";
import type { WebhookEvent } from "@/lib/billing/types";
import { subscriptionRepository } from "@/lib/repositories/subscription.repository";
import { userRepository } from "@/lib/repositories/user.repository";

const PRO_PLAN_ID = "vamoagendar-pro-monthly";

interface UpgradeResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

export async function initiateUpgrade(userId: string): Promise<UpgradeResult> {
  const user = await userRepository.findById(userId);
  if (!user) return { success: false, error: "Usuário não encontrado." };

  if (user.plan === "PRO") {
    return { success: false, error: "Você já é Pro!" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";

  try {
    const provider = getBillingProvider();
    const result = await provider.createCheckoutUrl({
      userId: user.id,
      email: user.email,
      planId: PRO_PLAN_ID,
      successUrl: `${appUrl}/dashboard/assinatura?status=success`,
      cancelUrl: `${appUrl}/dashboard/assinatura?status=canceled`,
    });

    // Create or update subscription record as pending
    const existing = await subscriptionRepository.findByUserId(userId);
    if (existing) {
      await subscriptionRepository.update(existing.id, {
        status: "INACTIVE",
        mpSubscriptionId: result.externalId || null,
      });
    } else {
      await subscriptionRepository.create({
        user: { connect: { id: userId } },
        plan: "PRO",
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
      const paymentData = await payment.get({ id: paymentId });
      
      const userId = paymentData.external_reference;
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

      // Activate subscription
      await subscriptionRepository.update(subscription.id, {
        status: "ACTIVE",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
        mpSubscriptionId: paymentId, // Store payment ID for reference
      });
      await userRepository.update(userId, { plan: "PRO" });
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
      await subscriptionRepository.update(subscription.id, {
        status: "ACTIVE",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      });
      await userRepository.update(subscription.userId, { plan: "PRO" });
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
          await userRepository.update(subscription.userId, { plan: "FREE" });
        } else if (newStatus === "ACTIVE") {
          await userRepository.update(subscription.userId, { plan: "PRO" });
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
  await userRepository.update(userId, { plan: "FREE" });

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
