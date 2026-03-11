import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { initiateUpgrade } from "@/lib/services/billing.service";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const result = await initiateUpgrade(session.user.id);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ checkoutUrl: result.checkoutUrl });
}
