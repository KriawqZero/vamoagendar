"use server";

import { auth } from "@/lib/auth";
import { userRepository } from "@/lib/repositories/user.repository";
import { isValidSlug } from "@/lib/utils/slug";
import { getPlanLimits } from "@/lib/utils/plan";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  businessName: z.string().min(2, "Nome do negócio deve ter pelo menos 2 caracteres"),
  logoUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cor inválida"),
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
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    businessName: formData.get("businessName"),
    logoUrl: formData.get("logoUrl") || "",
    accentColor: formData.get("accentColor"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  await userRepository.update(session.user.id, {
    name: parsed.data.name,
    businessName: parsed.data.businessName,
    logoUrl: parsed.data.logoUrl || null,
    accentColor: parsed.data.accentColor,
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateSlugAction(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const user = await userRepository.findById(session.user.id);
  if (!user) return { error: "Usuário não encontrado." };

  const limits = getPlanLimits(user.plan);
  if (!limits.canEditSlug) {
    return { error: "Faça upgrade para o plano Pro para personalizar seu link." };
  }

  const newSlug = (formData.get("slug") as string).toLowerCase().trim();

  if (!isValidSlug(newSlug)) {
    return { error: "Slug inválido. Use apenas letras, números e hifens (mínimo 3 caracteres)." };
  }

  if (newSlug !== user.slug) {
    const exists = await userRepository.slugExists(newSlug);
    if (exists) {
      return { error: "Este link já está em uso." };
    }
  }

  await userRepository.update(session.user.id, { slug: newSlug });

  revalidatePath("/dashboard/settings");
  return { success: true };
}
