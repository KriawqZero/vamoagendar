import Link from "next/link";
import { NicheLandingLayout } from "@/components/niche/niche-landing-layout";
import { CheckCircle2, Shield, Calendar, Clock, Crown, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendamento Online para Psicólogos | VamoAgendar",
  description: "Sua agenda de consultas organizada e profissional. Sistema simples de agendamento online para psicólogos e terapeutas.",
};

export default function PsicologosPage() {
  return (
    <NicheLandingLayout>
      {/* Hero */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            <Zap size={12} className="text-violet-400" />
            Feito para psicólogos e terapeutas
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            Sua agenda de consultas
            <br />
            <span className="text-violet-400">organizada e profissional</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Chega de planilhas e confirmações manuais. Ofereça aos seus pacientes uma forma simples e profissional de agendar consultas online — 24 horas por dia.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="w-full rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-700 sm:w-auto"
            >
              Começar grátis agora
            </Link>
            <Link
              href="/planos"
              className="w-full rounded-xl border border-zinc-800 px-8 py-3.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 sm:w-auto"
            >
              Ver planos
            </Link>
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            Grátis para começar • Sem cartão de crédito • Pronto em 2 minutos
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="border-t border-zinc-900 bg-zinc-900/30 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-100">
            Desafios do dia a dia
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Calendar,
                problem: "Confirmações manuais",
                description: "Trocar mensagens para confirmar horários toma tempo que você poderia usar com seus pacientes.",
              },
              {
                icon: Clock,
                problem: "Agenda desorganizada",
                description: "Planilhas, cadernos, anotações soltas. Difícil ter visão clara da sua semana.",
              },
              {
                icon: Shield,
                problem: "Imagem pouco profissional",
                description: "Seus pacientes merecem uma experiência moderna e organizada desde o primeiro contato.",
              },
            ].map((item) => (
              <div key={item.problem} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <item.icon size={24} className="mb-4 text-red-400" />
                <h3 className="text-base font-semibold text-zinc-200">{item.problem}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-t border-zinc-900 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-zinc-100">
              Agendamento profissional e simples
            </h2>
            <p className="mt-3 text-base text-zinc-500">
              Foco no que importa: seus pacientes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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
                <CheckCircle2 size={24} className="mt-1 shrink-0 text-emerald-400" />
                <div>
                  <h3 className="text-base font-semibold text-zinc-200">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-zinc-900 bg-gradient-to-b from-violet-500/5 to-transparent px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-zinc-100">
            Planos acessíveis
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Comece grátis e faça upgrade quando precisar
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-left">
              <h3 className="text-sm font-semibold text-zinc-300">Gratuito</h3>
              <p className="mt-2 text-3xl font-bold text-zinc-100">R$ 0</p>
              <p className="mt-1 text-xs text-zinc-500">Para sempre</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>✓ Até 2 tipos de consulta</li>
                <li>✓ Link de agendamento</li>
                <li>✓ Agenda automática</li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-violet-500/50 bg-violet-500/5 p-6 text-left">
              <div className="flex items-center gap-2">
                <Crown size={16} className="text-violet-400" />
                <h3 className="text-sm font-semibold text-violet-400">Pro</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-zinc-100">R$ 9,90</p>
              <p className="mt-1 text-xs text-zinc-400">por mês</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>✓ Tipos de consulta ilimitados</li>
                <li>✓ Link personalizado</li>
                <li>✓ Identidade profissional</li>
                <li>✓ Lembretes por WhatsApp</li>
              </ul>
            </div>
          </div>

          <p className="mt-8 text-xs text-zinc-600">
            Sem taxa de setup • Cancele quando quiser • Suporte em português
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-zinc-900 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
            Pronto para organizar sua agenda?
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Crie sua conta grátis e comece a oferecer agendamento online para seus pacientes
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Começar agora — é grátis
            </Link>
          </div>
        </div>
      </section>
    </NicheLandingLayout>
  );
}
