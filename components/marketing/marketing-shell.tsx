import Link from "next/link";
import { BrandLink } from "@/components/brand/brand";

type NavProps = {
  isAuthenticated: boolean;
};

export function MarketingNav({ isAuthenticated }: NavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E2DAF8] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLink href="/" className="inline-flex items-center" aria-label="VamoAgendar" />

        {isAuthenticated ? (
          <Link
            href="/dashboard"
            className="rounded-xl bg-[#4219B0] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#3515A0] hover:shadow-md hover:shadow-[#4219B0]/20"
          >
            Dashboard
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/planos"
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#6B5FA8] transition-colors hover:text-[#0D0820]"
            >
              Planos
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#6B5FA8] transition-colors hover:text-[#0D0820]"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-[#4219B0] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3515A0] hover:shadow-md hover:shadow-[#4219B0]/20"
            >
              Começar grátis
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-[#E2DAF8] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div>
            <BrandLink href="/" className="inline-flex items-center" aria-label="VamoAgendar" />
            <p className="mt-2 text-sm text-[#9B90C8]">
              Agendamento online simples para profissionais
            </p>
          </div>
          <nav className="flex gap-8 text-sm text-[#6B5FA8]">
            <Link href="/planos" className="transition-colors hover:text-[#0D0820]">
              Planos
            </Link>
            <Link href="/login" className="transition-colors hover:text-[#0D0820]">
              Entrar
            </Link>
            <Link href="/register" className="transition-colors hover:text-[#0D0820]">
              Criar conta
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-[#E2DAF8] pt-8 text-center text-xs text-[#9B90C8]">
          &copy; 2025 VamoAgendar. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
