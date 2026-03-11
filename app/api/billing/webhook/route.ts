import { NextRequest, NextResponse } from "next/server";
import { getBillingProvider } from "@/lib/billing";
import { processWebhookEvent } from "@/lib/services/billing.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // TODO: Validate webhook signature before processing
    // const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;

    const provider = getBillingProvider();
    const event = await provider.parseWebhookEvent(body, headers);

    await processWebhookEvent(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
