import Link from "next/link";
import { NicheLandingLayout } from "@/components/niche/niche-landing-layout";
import { CheckCircle2, Shield, Calendar, Clock, Crown, Zap, ArrowRight, Brain } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendamento Online para Psicólogos | VamoAgendar",
  description: "Sua agenda de consultas organizada e profissional. Sistema simples de agendamento online para psicólogos e terapeutas.",
};

export default function PsicologosPage() {
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
            <Brain size={16} />
            Feito para psicólogos e terapeutas
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            Sua agenda de consultas
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">organizada e profissional</span>
          </h1>

          <p className="mb-10 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            Chega de planilhas e confirmações manuais. Ofereça aos seus pacientes uma forma simples e profissional de agendar consultas online — 24 horas por dia.
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
            Desafios do dia a dia
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Calendar,
                problem: "Confirmações manuais",
                description: "Trocar mensagens para confirmar horários toma tempo que você poderia usar com seus pacientes.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Clock,
                problem: "Agenda desorganizada",
                description: "Planilhas, cadernos, anotações soltas. Difícil ter visão clara da sua semana.",
                color: "from-amber-500 to-amber-600",
              },
              {
                icon: Shield,
                problem: "Imagem pouco profissional",
                description: "Seus pacientes merecem uma experiência moderna e organizada desde o primeiro contato.",
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
              Agendamento profissional e simples
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Foco no que importa: seus pacientes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Link de agendamento profissional",
                description: "Compartilhe um link único por email, WhatsApp ou redes sociais. Seus pacientes agendam quando quiserem, sem precisar falar com você.",
              },
              {
                title: "Horários configuráveis",
                description: "Defina seus dias e horários de atendimento, pausas, exceções e feriados. O sistema mostra só o que está disponível.",
              },
              {
                title: "Confirmação automática",
                description: "Seus pacientes recebem confirmação por email automaticamente. Você vê tudo organizado no painel.",
              },
              {
                title: "Privacidade e simplicidade",
                description: "Sistema focado em praticidade. Seus pacientes informam apenas nome e contato para agendar.",
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
            Planos acessíveis
          </h2>
          <p className="mb-12 text-lg text-slate-600 dark:text-slate-400">
            Comece grátis e faça upgrade quando precisar
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
                  Até 2 tipos de consulta
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
                <span className="text-4xl font-bold text-slate-900 dark:text-white">R$ 9,90</span>
                <span className="text-slate-500 line-through dark:text-slate-500">R$ 19,90</span>
              </div>
              <ul className="space-y-3 text-slate-900 dark:text-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Tipos de consulta ilimitados
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Link personalizado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Identidade profissional
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
            Pronto para organizar sua agenda?
          </h2>
          <p className="mb-10 text-lg text-slate-600 dark:text-slate-400">
            Crie sua conta grátis e comece a oferecer agendamento online para seus pacientes
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
