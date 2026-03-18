import { createHmac, timingSafeEqual } from "node:crypto";
import { MercadoPagoConfig, Preference, PreApproval } from "mercadopago";
import type {
  BillingProvider,
  CheckoutInput,
  CheckoutResult,
  SubscriptionInfo,
  WebhookEvent,
} from "./types";
import {
  PLUS_ANNUAL_PLAN_ID,
  PLUS_MONTHLY_PLAN_ID,
  PRO_ANNUAL_PLAN_ID,
  PRO_MONTHLY_PLAN_ID,
} from "@/lib/billing/plan-catalog";

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

    const catalog: Record<
      string,
      { title: string; description: string; unit_price: number; currency_id: "BRL" }
    > = {
      [PLUS_MONTHLY_PLAN_ID]: {
        title: "VamoAgendar Plus",
        description: "Plano Plus — R$ 9,90/mês",
        unit_price: 9.9,
        currency_id: "BRL",
      },
      [PLUS_ANNUAL_PLAN_ID]: {
        title: "VamoAgendar Plus (Anual)",
        description: "Plano Plus — R$ 99,90/ano",
        unit_price: 99.9,
        currency_id: "BRL",
      },
      [PRO_MONTHLY_PLAN_ID]: {
        title: "VamoAgendar Pro",
        description: "Plano Pro — R$ 14,90/mês",
        unit_price: 14.9,
        currency_id: "BRL",
      },
      [PRO_ANNUAL_PLAN_ID]: {
        title: "VamoAgendar Pro (Anual)",
        description: "Plano Pro — R$ 149,90/ano",
        unit_price: 149.9,
        currency_id: "BRL",
      },
    };

    const item = catalog[input.planId];
    if (!item) {
      throw new Error(`Unknown planId: ${input.planId}`);
    }

    const result = await preference.create({
      body: {
        items: [
          {
            id: input.planId,
            title: item.title,
            description: item.description,
            quantity: 1,
            unit_price: item.unit_price,
            currency_id: item.currency_id,
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
    headers: Record<string, string>
  ): Promise<WebhookEvent> {
    const payload = body as Record<string, unknown>;
    const type = payload.type as string | undefined;
    const action = payload.action as string | undefined;
    const data = payload.data as Record<string, unknown> | undefined;

    console.log("[MercadoPago Webhook]", { type, action, data });
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error("MERCADO_PAGO_WEBHOOK_SECRET is not configured");
    }

    const signature = headers["x-signature"];
    const requestId = headers["x-request-id"];
    if (!signature || !requestId) {
      throw new Error("Missing Mercado Pago webhook signature headers");
    }

    let ts = "";
    let v1 = "";
    for (const part of signature.split(",")) {
      const [rawKey, rawValue] = part.split("=", 2);
      const key = rawKey?.trim();
      const value = rawValue?.trim();

      if (key === "ts" && value) ts = value;
      if (key === "v1" && value) v1 = value;
    }

    if (!ts || !v1) {
      throw new Error("Invalid Mercado Pago x-signature header");
    }

    const dataId = String(data?.id ?? "").trim();
    const normalizedDataId =
      dataId && /^[a-z0-9]+$/i.test(dataId) ? dataId.toLowerCase() : dataId;
    const manifest = [
      normalizedDataId ? `id:${normalizedDataId};` : "",
      requestId ? `request-id:${requestId};` : "",
      `ts:${ts};`,
    ].join("");

    const expectedSignature = createHmac("sha256", secret)
      .update(manifest)
      .digest("hex");

    const provided = Buffer.from(v1, "hex");
    const expected = Buffer.from(expectedSignature, "hex");
    if (
      provided.length === 0 ||
      provided.length !== expected.length ||
      !timingSafeEqual(provided, expected)
    ) {
      throw new Error("Invalid Mercado Pago webhook signature");
    }

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
