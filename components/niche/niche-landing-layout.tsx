import Link from "next/link";
import { ReactNode } from "react";
import { BrandLink, BrandLogo } from "@/components/brand/brand";

interface NicheLandingLayoutProps {
  children: ReactNode;
}

export function NicheLandingLayout({ children }: NicheLandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLink
            href="/"
            className="inline-flex items-center"
            aria-label="VamoAgendar"
          />
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
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
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <BrandLink href="/" className="inline-flex items-center" aria-label="VamoAgendar" />
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Agendamento online simples e profissional
              </p>
            </div>
            <div className="flex gap-8 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/planos" className="transition-colors hover:text-slate-900 dark:hover:text-slate-100">
                Planos
              </Link>
              <Link href="/login" className="transition-colors hover:text-slate-900 dark:hover:text-slate-100">
                Entrar
              </Link>
              <Link href="/register" className="transition-colors hover:text-slate-900 dark:hover:text-slate-100">
                Criar conta
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-600">
            <p>&copy; 2024 VamoAgendar. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
