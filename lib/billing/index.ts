import { MercadoPagoProvider } from "./mercadopago";
import type { BillingProvider } from "./types";

let provider: BillingProvider | null = null;

export function getBillingProvider(): BillingProvider {
  if (!provider) {
    provider = new MercadoPagoProvider();
  }
  return provider;
}

export type { BillingProvider, CheckoutInput, CheckoutResult, SubscriptionInfo, WebhookEvent } from "./types";
