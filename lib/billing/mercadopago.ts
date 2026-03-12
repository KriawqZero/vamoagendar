import { MercadoPagoConfig, Preference, PreApproval } from "mercadopago";
import type {
  BillingProvider,
  CheckoutInput,
  CheckoutResult,
  SubscriptionInfo,
  WebhookEvent,
} from "./types";

function getClient() {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not configured");
  }
  return new MercadoPagoConfig({ accessToken });
}

export class MercadoPagoProvider implements BillingProvider {
  async createCheckoutUrl(input: CheckoutInput): Promise<CheckoutResult> {
    const client = getClient();
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: input.planId,
            title: "VamoAgendar Pro",
            description: "Plano Pro — R$ 9,90/mês",
            quantity: 1,
            unit_price: 9.9,
            currency_id: "BRL",
          },
        ],
        payer: {
          email: input.email,
        },
        back_urls: {
          success: input.successUrl,
          failure: input.cancelUrl,
          pending: input.successUrl,
        },
        auto_return: "approved",
        external_reference: input.userId,
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000"}/api/billing/webhook`,
        metadata: {
          user_id: input.userId,
          plan_id: input.planId,
        },
      },
    });

    return {
      checkoutUrl: result.init_point!,
      externalId: result.id,
    };
  }

  async getSubscription(externalId: string): Promise<SubscriptionInfo | null> {
    try {
      const client = getClient();
      const preapproval = new PreApproval(client);
      const result = await preapproval.get({ id: externalId });

      if (!result) return null;

      const statusMap: Record<string, SubscriptionInfo["status"]> = {
        authorized: "active",
        paused: "past_due",
        cancelled: "canceled",
        pending: "inactive",
      };

      return {
        externalId: result.id!,
        status: statusMap[result.status || ""] || "inactive",
        currentPeriodStart: result.date_created ? new Date(result.date_created) : undefined,
        currentPeriodEnd: result.next_payment_date ? new Date(result.next_payment_date) : undefined,
      };
    } catch (error) {
      console.error("Failed to get MP subscription:", error);
      return null;
    }
  }

  async cancelSubscription(externalId: string): Promise<boolean> {
    try {
      const client = getClient();
      const preapproval = new PreApproval(client);
      await preapproval.update({
        id: externalId,
        body: { status: "cancelled" },
      });
      return true;
    } catch (error) {
      console.error("Failed to cancel MP subscription:", error);
      return false;
    }
  }

  async parseWebhookEvent(
    body: unknown,
    _headers: Record<string, string>
  ): Promise<WebhookEvent> {
    const payload = body as Record<string, unknown>;
    const type = payload.type as string | undefined;
    const action = payload.action as string | undefined;
    const data = payload.data as Record<string, unknown> | undefined;

    console.log("[MercadoPago Webhook]", { type, action, data });

    // TODO: Validate webhook signature using MERCADO_PAGO_WEBHOOK_SECRET
    // const signature = headers["x-signature"];
    // const requestId = headers["x-request-id"];

    if (type === "subscription_preapproval") {
      const externalId = data?.id as string | undefined;
      if (action === "created") {
        return {
          type: "subscription.created",
          externalSubscriptionId: externalId,
          rawPayload: payload,
        };
      }
      if (action === "updated") {
        return {
          type: "subscription.updated",
          externalSubscriptionId: externalId,
          rawPayload: payload,
        };
      }
    }

    if (type === "payment") {
      // For payment events, we need to fetch the payment details to get external_reference
      const paymentId = data?.id as string | undefined;
      console.log("[MercadoPago Webhook] Payment event, ID:", paymentId);
      
      if (action === "payment.created" || action === "payment.updated") {
        return {
          type: "payment.approved",
          externalSubscriptionId: paymentId,
          rawPayload: payload,
        };
      }
    }

    return {
      type: "unknown",
      rawPayload: payload,
    };
  }
}
