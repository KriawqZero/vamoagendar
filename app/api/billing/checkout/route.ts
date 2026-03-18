import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { initiateUpgrade } from "@/lib/services/billing.service";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  let planId: string | undefined;
  try {
    const body = await req.json();
    planId = body?.planId;
  } catch {
    // ignore (no body)
  }

  const result = await initiateUpgrade(session.user.id, planId);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ checkoutUrl: result.checkoutUrl });
}
