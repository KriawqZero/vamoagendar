import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmation, sendWhatsAppReminder } from "@/lib/services/notification.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
    }

    switch (type) {
      case "booking_confirmation":
        await sendBookingConfirmation(data);
        break;
      case "whatsapp_reminder":
        await sendWhatsAppReminder(data);
        break;
      default:
        return NextResponse.json({ error: "Unknown notification type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
