"use server";

import { getSession } from "@/lib/auth-server";
import { userRepository } from "@/lib/repositories/user.repository";
import { isValidCustomSlug, isReservedSlug } from "@/lib/utils/slug";
import { getPlanLimits } from "@/lib/utils/plan";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  businessName: z.string().min(2, "Nome do negócio deve ter pelo menos 2 caracteres"),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cor inválida").nullable().optional(),
});

export type SettingsState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[]>;
};

export async function updateProfileAction(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const session = await getSession();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const user = await userRepository.findById(session.user.id);
  if (!user) return { error: "Usuário não encontrado." };

  const limits = getPlanLimits(user.plan);

  console.log(formData.get("name"));
  console.log(formData.get("businessName"));
  console.log(formData.get("accentColor"));

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    businessName: formData.get("businessName"),
    accentColor: formData.get("accentColor"),
  });

  if (!parsed.success) {
    const errors: Record<string, string[]> = {};

    for (let i = 0; i < parsed.error.issues.length; i++) {
      const issue = parsed.error.issues[i];
      errors[issue.path[0] as string] = [issue.message];
    }
    console.log(errors);
    return { fieldErrors: errors };
  }

  await userRepository.update(session.user.id, {
    name: parsed.data.name,
    businessName: parsed.data.businessName,
    accentColor: limits.canCustomize ? parsed.data.accentColor ?? user.accentColor : user.accentColor,
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateCustomSlugAction(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const session = await getSession();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const user = await userRepository.findById(session.user.id);
  if (!user) return { error: "Usuário não encontrado." };

  const limits = getPlanLimits(user.plan);
  if (!limits.canCustomSlug) {
    return { error: "Faça upgrade para o plano Pro para personalizar seu link." };
  }

  const newSlug = (formData.get("customSlug") as string).toLowerCase().trim();

  if (!isValidCustomSlug(newSlug)) {
    return { error: "Link inválido. Use 3-32 caracteres: letras, números e hifens (sem hifens consecutivos)." };
  }

  if (isReservedSlug(newSlug)) {
    return { error: "Este link está reservado pelo sistema. Escolha outro." };
  }

  // Check 7-day cooldown
  if (user.slugChangedAt) {
    const daysSinceChange = Math.floor(
      (Date.now() - user.slugChangedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceChange < 7) {
      const daysRemaining = 7 - daysSinceChange;
      return {
        error: `Você poderá alterar seu link novamente em ${daysRemaining} dia${daysRemaining > 1 ? "s" : ""}.`,
      };
    }
  }

  if (newSlug !== user.customSlug) {
    const exists = await userRepository.customSlugExists(newSlug);
    if (exists) {
      return { error: "Este link já está em uso." };
    }
  }

  await userRepository.update(session.user.id, {
    customSlug: newSlug,
    slugChangedAt: new Date(),
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}
