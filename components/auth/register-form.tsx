"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction, type AuthState } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthState = {};

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (state.success) {
      // Redirect to login after successful registration
      router.push("/login?registered=true");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
          Conta criada com sucesso! Redirecionando...
        </div>
      )}

      <Input
        id="name"
        name="name"
        type="text"
        label="Seu nome"
        placeholder="João Silva"
        required
        error={state.fieldErrors?.name?.[0]}
      />

      <Input
        id="businessName"
        name="businessName"
        type="text"
        label="Nome da empresa ou marca"
        placeholder="Studio Maria"
        required
        error={state.fieldErrors?.businessName?.[0]}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="seu@email.com"
        required
        error={state.fieldErrors?.email?.[0]}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Senha"
        placeholder="Mínimo 6 caracteres"
        required
        error={state.fieldErrors?.password?.[0]}
      />

      <Button type="submit" size="lg" loading={pending} className="mt-2 w-full">
        Criar conta
      </Button>
    </form>
  );
}
