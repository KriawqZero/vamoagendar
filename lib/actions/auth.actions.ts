"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { userRepository } from "@/lib/repositories/user.repository";
import { generateSlug } from "@/lib/utils/slug";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  businessName: z.string().min(2, "Nome do negócio deve ter pelo menos 2 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type AuthState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
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

  const passwordHash = await bcrypt.hash(password, 12);
  const slug = generateSlug();

  await userRepository.create({
    name,
    email,
    passwordHash,
    slug,
    businessName,
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "digest" in error) {
      const digestError = error as { digest: string };
      if (digestError.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }
    }
    return { error: "Erro ao fazer login após registro." };
  }

  return {};
}

export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "digest" in error) {
      const digestError = error as { digest: string };
      if (digestError.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }
    }
    return { error: "Email ou senha incorretos." };
  }

  return {};
}
