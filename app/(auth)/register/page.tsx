import { RegisterForm } from "@/components/auth/register-form";
import { GoogleButton } from "@/components/auth/google-button";
import { OAuthErrorBanner } from "@/components/auth/oauth-error-banner";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Criar conta | VamoAgendar",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            VamoAgendar
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Comece grátis em menos de 1 minuto
          </p>
        </div>

        <Suspense fallback={null}>
          <OAuthErrorBanner />
        </Suspense>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <GoogleButton />
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                ou
              </span>
            </div>
          </div>

          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-medium text-violet-600 hover:text-violet-500"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
