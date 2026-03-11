import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export const metadata = {
  title: "Entrar | VamoAgendar",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            VamoAgendar
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Entre na sua conta
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="font-medium text-violet-600 hover:text-violet-500"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
