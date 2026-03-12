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
    // Create user with Better Auth
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (!result || !result.user) {
      return { error: "Erro ao criar conta." };
    }

    // Update user with businessName and bookingCode (if not set by databaseHooks)
    const user = await userRepository.findById(result.user.id);
    await userRepository.update(result.user.id, {
      businessName,
      bookingCode: user?.bookingCode || undefined, // Keep existing if set
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Register error:", error);
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}

export async function logoutAction() {
  redirect("/");
}
