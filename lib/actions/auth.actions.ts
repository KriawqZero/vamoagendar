"use server";

import { auth } from "@/lib/auth";
import { userRepository } from "@/lib/repositories/user.repository";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  businessName: z.string().min(2, "Nome do negócio deve ter pelo menos 2 caracteres"),
});

export type AuthState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  success?: boolean;
  credentials?: {
    email: string;
    password: string;
  };
};

export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    businessName: formData.get("businessName") as string,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password, businessName } = parsed.data;

  const existing = await userRepository.findByEmail(email);
  if (existing) {
    return { error: "Este email já está cadastrado." };
  }

  try {
    const { createClient } = await import("@/utils/supabase/server");
    const supabase = await createClient();
    
    const { data: result, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (signUpError || !result.user) {
      return { error: signUpError?.message || "Erro ao criar conta." };
    }

    try {
      const { prisma } = await import("@/lib/prisma");
      const { generateBookingCode } = await import("@/lib/utils/slug");
      await prisma.user.create({
        data: {
          id: result.user.id,
          name,
          email,
          businessName,
          bookingCode: generateBookingCode(),
          plan: "FREE"
        }
      });
    } catch (e) {
      await userRepository.update(result.user.id, {
        businessName,
      });
    }

    return { 
      success: true,
      credentials: { email, password }
    };
  } catch (error: unknown) {
    console.error("Register error:", error);
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}

export async function logoutAction() {
  redirect("/");
}
