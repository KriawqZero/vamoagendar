import Link from "next/link";
import { ReactNode } from "react";
import { BrandLink, BrandLogo } from "@/components/brand/brand";

interface NicheLandingLayoutProps {
  children: ReactNode;
}

export function NicheLandingLayout({ children }: NicheLandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Nav */}
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <BrandLink
            href="/"
            className="inline-flex items-center"
            aria-label="VamoAgendar"
          />
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-700"
            >
              Criar conta grátis
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <BrandLogo height={18} />
              </div>
              <p className="mt-1 text-xs text-zinc-600">
                Agendamento online simples e profissional
              </p>
            </div>
            <div className="flex gap-6 text-xs text-zinc-500">
              <Link href="/planos" className="hover:text-zinc-400">
                Planos
              </Link>
              <Link href="/login" className="hover:text-zinc-400">
                Entrar
              </Link>
              <Link href="/register" className="hover:text-zinc-400">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
