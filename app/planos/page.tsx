import Link from "next/link";
import { Check, X, Zap, Crown, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth-server";
import { BrandLink } from "@/components/brand/brand";

export const metadata: Metadata = {
  title: "Planos | VamoAgendar",
  description: "Escolha o plano ideal para o seu negócio.",
};

const features = [
  { name: "Agendamento online", free: true, pro: true },
  { name: "Link de agendamento", free: true, pro: true },
  { name: "Gestão de agenda", free: true, pro: true },
  { name: "Horários personalizáveis", free: true, pro: true },
  { name: "Exceções e feriados", free: true, pro: true },
  { name: "Serviços", free: "Até 2", pro: "Ilimitados" },
  { name: "Link personalizado", free: false, pro: true },
  { name: "Cor e logo personalizado", free: false, pro: true },
  { name: "Lembretes por WhatsApp", free: false, pro: true },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-zinc-300">{value}</span>;
  }
  return value ? (
    <Check size={16} className="text-emerald-400" />
  ) : (
    <X size={16} className="text-zinc-600" />
  );
}

export default async function PlanosPage() {
    const session = await getSession();
    const isAuthenticated = !!session?.user?.id;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Nav */}
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <BrandLink href="/" className="inline-flex items-center" aria-label="VamoAgendar" />
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200"
            >
              Dashboard
            </Link>
          ) : (
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
              Criar conta
            </Link>
          </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Planos simples, sem surpresas
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-zinc-500">
              Comece grátis e faça upgrade quando precisar. Sem taxas escondidas.
            </p>
          </div>

          {/* Plan cards */}
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {/* FREE */}
            <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-zinc-400" />
                  <h2 className="text-lg font-semibold text-zinc-100">Gratuito</h2>
                </div>
                <div className="mt-4">
                  <div className="mb-2 h-6" aria-hidden />
                  <span className="text-4xl font-bold text-zinc-100">R$ 0</span>
                  <span className="text-sm text-zinc-500">/mês</span>
                </div>
                <p className="mt-2 text-sm text-zinc-500">
                  Ideal para começar e testar o sistema.
                </p>
              </div>

              <Link
                href="/register"
                className="mb-6 block rounded-xl border border-zinc-700 py-2.5 text-center text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
              >
                Começar grátis
              </Link>

              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f.name} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{f.name}</span>
                    <FeatureValue value={f.free} />
                  </li>
                ))}
              </ul>
            </div>

            {/* PRO */}
            <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Crown size={18} className="text-violet-400" />
                  <h2 className="text-lg font-semibold text-zinc-100">Pro</h2>
                </div>
                <div className="mt-4">
                  <div className="mb-2 h-6">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                      <Sparkles size={12} />
                      Oferta especial - 50% OFF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-zinc-100">R$ 9,90</span>
                    <span className="text-lg text-zinc-600 line-through">R$ 19,90</span>
                  </div>
                  <span className="text-sm text-zinc-500">/mês</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">
                  Para profissionais que querem se destacar e crescer.
                </p>
              </div>

              <Link
                href="/register"
                className="mb-6 block rounded-xl bg-violet-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-violet-700"
              >
                Assinar Pro
              </Link>

              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f.name} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{f.name}</span>
                    <FeatureValue value={f.pro} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ section */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h3 className="text-lg font-semibold text-zinc-200">Dúvidas frequentes</h3>
            <div className="mt-6 space-y-4 text-left">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm font-medium text-zinc-200">Posso cancelar a qualquer momento?</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Sim. Sem multa, sem burocracia. Seu plano volta para o gratuito imediatamente.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm font-medium text-zinc-200">Preciso de cartão de crédito para começar?</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Não. O plano gratuito não requer nenhum dado de pagamento.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm font-medium text-zinc-200">Como funciona o pagamento?</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Pagamento via Mercado Pago. Aceita PIX, cartão de crédito e boleto.{" "}
                  <Link href="/faturamento" className="text-violet-400 hover:text-violet-300">
                    Ver detalhes sobre faturamento →
                  </Link>
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm font-medium text-zinc-200">Posso fazer upgrade depois?</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Sim! Você pode começar no plano gratuito e fazer upgrade para Pro a qualquer momento.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm font-medium text-zinc-200">O que acontece se eu cancelar o Pro?</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Seu plano volta para o gratuito. Você mantém até 2 serviços e o link automático continua funcionando.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-8">
              <h3 className="text-xl font-bold text-zinc-100">
                Pronto para começar?
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Crie sua conta grátis agora e comece a receber agendamentos em minutos
              </p>
              <Link
                href="/register"
                className="mt-6 inline-flex rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Criar conta grátis
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-700">
        <div className="flex items-center justify-center gap-4">
          <Link href="/faturamento" className="hover:text-zinc-500">
            Faturamento e Políticas
          </Link>
          <span>•</span>
          <span>VamoAgendar &middot; Agendamento simples para profissionais</span>
        </div>
      </footer>
    </div>
  );
}
