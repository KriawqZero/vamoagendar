import Link from "next/link";
import { Check, X, Zap, Crown, Sparkles, ArrowRight } from "lucide-react";
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
    return <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</span>;
  }
  return value ? (
    <Check size={20} className="text-emerald-600 dark:text-emerald-400" />
  ) : (
    <X size={20} className="text-slate-300 dark:text-slate-700" />
  );
}

export default async function PlanosPage() {
  const session = await getSession();
  const isAuthenticated = !!session?.user?.id;

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLink href="/" className="inline-flex items-center" aria-label="VamoAgendar" />
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              Dashboard
            </Link>
          ) : (
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
                Criar conta
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-slate-200 px-4 py-20 dark:border-slate-800 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Planos simples, sem surpresas
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Comece grátis e faça upgrade quando precisar. Sem taxas escondidas.
            </p>
          </div>
        </section>

        {/* Plan cards */}
        <section className="px-4 py-20 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* FREE */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-10 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
                <div className="mb-8">
                  <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 dark:bg-blue-950/30">
                    <Zap size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Gratuito</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Ideal para começar e testar o sistema.
                  </p>
                </div>

                <div className="mb-8">
                  <div className="mb-2 text-5xl font-bold text-slate-900 dark:text-white">R$ 0</div>
                  <p className="text-slate-600 dark:text-slate-400">/mês</p>
                </div>

                <Link
                  href="/register"
                  className="mb-8 inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                >
                  Começar grátis
                  <ArrowRight className="ml-2" size={18} />
                </Link>

                <div className="space-y-4">
                  {features.map((f) => (
                    <div key={f.name} className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">{f.name}</span>
                      <FeatureValue value={f.free} />
                    </div>
                  ))}
                </div>
              </div>

              {/* PRO */}
              <div className="relative flex flex-col rounded-2xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 shadow-xl dark:border-blue-500 dark:from-blue-950/30 dark:to-indigo-950/30">
                <div className="absolute -top-4 right-8">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    <Sparkles size={16} />
                    50% OFF
                  </span>
                </div>

                <div className="mb-8">
                  <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-3">
                    <Crown size={24} className="text-white" />
                  </div>
                  <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Pro</h2>
                  <p className="text-slate-700 dark:text-slate-300">
                    Para profissionais que querem se destacar e crescer.
                  </p>
                </div>

                <div className="mb-8">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">R$ 9,90</span>
                    <span className="text-xl text-slate-500 line-through dark:text-slate-500">R$ 19,90</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">/mês</p>
                </div>

                <Link
                  href="/register"
                  className="mb-8 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
                >
                  Assinar Pro
                  <ArrowRight className="ml-2" size={18} />
                </Link>

                <div className="space-y-4">
                  {features.map((f) => (
                    <div key={f.name} className="flex items-center justify-between">
                      <span className="font-medium text-slate-900 dark:text-slate-100">{f.name}</span>
                      <FeatureValue value={f.pro} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/30 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
              Comparação completa
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Recurso</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Gratuito</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr
                      key={f.name}
                      className={`border-b border-slate-200 dark:border-slate-800 ${
                        i % 2 === 0 ? "bg-white dark:bg-slate-950/50" : "bg-slate-50 dark:bg-slate-900/30"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{f.name}</td>
                      <td className="px-6 py-4 text-center">
                        <FeatureValue value={f.free} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <FeatureValue value={f.pro} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
              Dúvidas frequentes
            </h3>

            <div className="space-y-6">
              {[
                {
                  question: "Posso cancelar a qualquer momento?",
                  answer: "Sim. Sem multa, sem burocracia. Seu plano volta para o gratuito imediatamente.",
                },
                {
                  question: "Preciso de cartão de crédito para começar?",
                  answer: "Não. O plano gratuito não requer nenhum dado de pagamento.",
                },
                {
                  question: "Como funciona o pagamento?",
                  answer: "Pagamento via Mercado Pago. Aceita PIX, cartão de crédito e boleto.",
                },
                {
                  question: "Posso fazer upgrade depois?",
                  answer: "Sim! Você pode começar no plano gratuito e fazer upgrade para Pro a qualquer momento.",
                },
                {
                  question: "O que acontece se eu cancelar o Pro?",
                  answer: "Seu plano volta para o gratuito. Você mantém até 2 serviços e o link automático continua funcionando.",
                },
              ].map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50"
                >
                  <p className="mb-2 font-semibold text-slate-900 dark:text-white">{faq.question}</p>
                  <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/30 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-12 dark:border-blue-900 dark:from-blue-950/30 dark:to-indigo-950/30">
              <h3 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
                Pronto para começar?
              </h3>
              <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
                Crie sua conta grátis agora e comece a receber agendamentos em minutos
              </p>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
              >
                Criar conta grátis
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <BrandLink href="/" className="inline-flex items-center" aria-label="VamoAgendar" />
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Agendamento online simples para profissionais
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
