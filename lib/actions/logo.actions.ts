"use server";

import { getSession } from "@/lib/auth-server";
import { userRepository } from "@/lib/repositories/user.repository";
import { getPlanLimits } from "@/lib/utils/plan";
import { uploadLogo, deleteLogo, extractKeyFromUrl } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export type LogoState = {
  error?: string;
  success?: boolean;
  logoUrl?: string;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadLogoAction(
  _prevState: LogoState,
  formData: FormData
): Promise<LogoState> {
  const session = await getSession();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const user = await userRepository.findById(session.user.id);
  if (!user) return { error: "Usuário não encontrado." };

  const limits = getPlanLimits(user.plan);
  if (!limits.canCustomizeLogo) {
    return { error: "Faça upgrade para o plano Pro para adicionar logo personalizado." };
  }

  const file = formData.get("logo") as File;
  if (!file || file.size === 0) {
    return { error: "Nenhum arquivo selecionado." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "Arquivo muito grande. Máximo: 2MB." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Tipo de arquivo inválido. Use JPG, PNG ou WebP." };
  }

  try {
    // Delete old logo if exists
    if (user.logoUrl) {
      const oldKey = extractKeyFromUrl(user.logoUrl);
      if (oldKey) {
        try {
          await deleteLogo(oldKey);
        } catch (error) {
          console.error("Failed to delete old logo:", error);
          // Continue anyway - not critical
        }
      }
    }

    // Upload new logo
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = await uploadLogo(session.user.id, buffer, file.type);
    
    // Get public URL
    const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/storage/${key}`;

    // Update user
    await userRepository.update(session.user.id, { logoUrl });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    return { success: true, logoUrl };
  } catch (error) {
    console.error("Logo upload error:", error);
    return { error: "Erro ao fazer upload do logo. Tente novamente." };
  }
}

export async function removeLogoAction(): Promise<LogoState> {
  const session = await getSession();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const user = await userRepository.findById(session.user.id);
  if (!user) return { error: "Usuário não encontrado." };

  if (!user.logoUrl) {
    return { error: "Nenhum logo para remover." };
  }

  try {
    // Delete from MinIO
    const key = extractKeyFromUrl(user.logoUrl);
    if (key) {
      try {
        await deleteLogo(key);
      } catch (error) {
        console.error("Failed to delete logo from storage:", error);
        // Continue anyway - we'll update the DB
      }
    }

    // Update user
    await userRepository.update(session.user.id, { logoUrl: null });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Logo removal error:", error);
    return { error: "Erro ao remover logo. Tente novamente." };
  }
}
