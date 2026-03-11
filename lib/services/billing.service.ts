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

  const appUrl = process.env.APP_URL || "http://localhost:3000";

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
  if (event.type === "unknown") return;

  const externalId = event.externalSubscriptionId;
  if (!externalId) return;

  const subscription = await subscriptionRepository.findByMpSubscriptionId(externalId);
  if (!subscription) {
    console.warn("Webhook for unknown subscription:", externalId);
    return;
  }

  switch (event.type) {
    case "subscription.created":
    case "payment.approved": {
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
      const info = await provider.getSubscription(externalId);
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
