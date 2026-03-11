"use server";

import { auth } from "@/lib/auth";
import {
  initiateUpgrade,
  cancelSubscription,
} from "@/lib/services/billing.service";
import { revalidatePath } from "next/cache";

export type BillingState = {
  error?: string;
  success?: boolean;
  checkoutUrl?: string;
};

export async function upgradeAction(): Promise<BillingState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const result = await initiateUpgrade(session.user.id);

  if (!result.success) {
    return { error: result.error };
  }

  revalidatePath("/dashboard/assinatura");
  return { success: true, checkoutUrl: result.checkoutUrl };
}

export async function cancelSubscriptionAction(): Promise<BillingState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const result = await cancelSubscription(session.user.id);

  if (!result.success) {
    return { error: result.error };
  }

  revalidatePath("/dashboard/assinatura");
  revalidatePath("/dashboard/services");
  revalidatePath("/dashboard/settings");
  return { success: true };
}
