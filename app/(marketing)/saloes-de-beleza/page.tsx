import Link from "next/link";
import { NicheLandingLayout } from "@/components/niche/niche-landing-layout";
import { CheckCircle2, Clock, Users, Sparkles, Crown, Zap, ArrowRight, Wand2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendamento Online para Salões de Beleza | VamoAgendar",
  description: "Seu salão organizado, seus clientes agendando sozinhos. Gerencie múltiplos serviços, horários e profissionais com facilidade.",
};

export default function SaloesPage() {
  return (
    <NicheLandingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32 lg:py-40">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
        <div className="absolute -right-40 -top-40 -z-10 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/10" />
        <div className="absolute -left-40 -bottom-40 -z-10 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-900/10" />

        <div className="mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">
            <Wand2 size={16} />
            Feito para salões de beleza
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            Seu salão organizado,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">clientes agendando sozinhos</span>
          </h1>

          <p className="mb-10 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            Chega de planilhas, cadernos e mensagens perdidas. Tenha uma agenda profissional onde suas clientes agendam online — corte, escova, manicure, tudo em um lugar só.
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
            >
              Começar grátis agora
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/planos"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-900"
            >
              Ver planos
            </Link>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            ✓ Grátis para começar • ✓ Sem cartão de crédito • ✓ Pronto em 2 minutos
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/30 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-slate-900 dark:text-white">
            Desafios que todo salão enfrenta
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Clock,
                problem: "Serviços com durações diferentes",
                description: "Escova 30min, corte 1h, química 3h. Difícil organizar tudo sem conflito de horário.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Users,
                problem: "Múltiplos profissionais",
                description: "Cada profissional tem sua agenda, seus horários. Fica complicado coordenar tudo manualmente.",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: Sparkles,
                problem: "Falta de organização profissional",
                description: "Agenda no papel ou no WhatsApp passa imagem amadora. Suas clientes merecem melhor.",
                color: "from-purple-500 to-purple-600",
              },
            ].map((item) => (
              <div
                key={item.problem}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700"
              >
                <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${item.color} p-3`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{item.problem}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
              Tudo que seu salão precisa
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Organização profissional em poucos cliques
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Múltiplos serviços, uma agenda só",
                description: "Cadastre corte, escova, manicure, pedicure, química — cada um com sua duração. O sistema organiza tudo automaticamente.",
              },
              {
                title: "Horários inteligentes",
                description: "A agenda mostra só os horários disponíveis baseado na duração de cada serviço. Sem sobreposição, sem erro.",
              },
              {
                title: "Visual profissional e bonito",
                description: "Página de agendamento elegante com o nome e logo do seu salão. Suas clientes vão adorar a experiência.",
              },
              {
                title: "Controle total no painel",
                description: "Veja todos os agendamentos, gerencie horários, configure exceções e feriados. Tudo em um lugar só.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle2 size={28} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/30 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
            Investimento que vale a pena
          </h2>
          <p className="mb-12 text-lg text-slate-600 dark:text-slate-400">
            Menos de um cafezinho por dia para ter seu salão organizado
          </p>

          <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-left transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
              <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 dark:bg-blue-950/30">
                <Zap size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Gratuito</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">Para sempre</p>
              <div className="mb-6 text-4xl font-bold text-slate-900 dark:text-white">R$ 0</div>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Até 2 serviços
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Link de agendamento
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Agenda automática
                </li>
              </ul>
            </div>

            <div className="relative rounded-2xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-left shadow-xl dark:border-blue-500 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="absolute -top-4 right-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  50% OFF
                </span>
              </div>
              <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-3">
                <Crown size={24} className="text-white" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Pro</h3>
              <p className="mb-6 text-slate-700 dark:text-slate-300">por mês</p>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">R$ 14,90</span>
                <span className="text-slate-500 line-through dark:text-slate-500">R$ 29,90</span>
              </div>
              <ul className="space-y-3 text-slate-900 dark:text-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Serviços ilimitados
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Link personalizado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Logo do seu salão
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Lembretes por WhatsApp
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 text-sm text-slate-600 dark:text-slate-400">
            ✓ Sem taxa de setup • ✓ Cancele quando quiser • ✓ Suporte em português
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Pronto para ter um salão mais organizado?
          </h2>
          <p className="mb-10 text-lg text-slate-600 dark:text-slate-400">
            Crie sua conta grátis e comece a oferecer agendamento online para suas clientes
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
          >
            Começar agora — é grátis
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </NicheLandingLayout>
  );
}
