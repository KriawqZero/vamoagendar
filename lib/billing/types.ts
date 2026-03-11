export interface CheckoutInput {
  userId: string;
  email: string;
  planId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  checkoutUrl: string;
  externalId?: string;
}

export interface SubscriptionInfo {
  externalId: string;
  status: "active" | "past_due" | "canceled" | "inactive" | "trialing";
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
}

export interface WebhookEvent {
  type: "subscription.created" | "subscription.updated" | "payment.approved" | "payment.rejected" | "unknown";
  externalSubscriptionId?: string;
  externalCustomerId?: string;
  status?: string;
  rawPayload: unknown;
}

export interface BillingProvider {
  createCheckoutUrl(input: CheckoutInput): Promise<CheckoutResult>;
  getSubscription(externalId: string): Promise<SubscriptionInfo | null>;
  cancelSubscription(externalId: string): Promise<boolean>;
  parseWebhookEvent(body: unknown, headers: Record<string, string>): Promise<WebhookEvent>;
}
