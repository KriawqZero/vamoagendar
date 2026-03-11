"use client";

import { useActionState } from "react";
import { loginAction, type AuthState } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </div>
      )}

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
        placeholder="••••••"
        required
        error={state.fieldErrors?.password?.[0]}
      />

      <Button type="submit" size="lg" loading={pending} className="mt-2 w-full">
        Entrar
      </Button>
    </form>
  );
}
