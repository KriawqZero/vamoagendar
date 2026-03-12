import Link from "next/link";
import { NicheLandingLayout } from "@/components/niche/niche-landing-layout";
import { CheckCircle2, Clock, Users, Sparkles, Crown, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendamento Online para Salões de Beleza | VamoAgendar",
  description: "Seu salão organizado, seus clientes agendando sozinhos. Gerencie múltiplos serviços, horários e profissionais com facilidade.",
};

export default function SaloesPage() {
  return (
    <NicheLandingLayout>
      {/* Hero */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            <Zap size={12} className="text-violet-400" />
            Feito para salões de beleza
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            Seu salão organizado,
            <br />
            <span className="text-violet-400">clientes agendando sozinhos</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Chega de planilhas, cadernos e mensagens perdidas. Tenha uma agenda profissional onde suas clientes agendam online — corte, escova, manicure, tudo em um lugar só.
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
            Desafios que todo salão enfrenta
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Clock,
                problem: "Serviços com durações diferentes",
                description: "Escova 30min, corte 1h, química 3h. Difícil organizar tudo sem conflito de horário.",
              },
              {
                icon: Users,
                problem: "Múltiplos profissionais",
                description: "Cada profissional tem sua agenda, seus horários. Fica complicado coordenar tudo manualmente.",
              },
              {
                icon: Sparkles,
                problem: "Falta de organização profissional",
                description: "Agenda no papel ou no WhatsApp passa imagem amadora. Suas clientes merecem melhor.",
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
              Tudo que seu salão precisa
            </h2>
            <p className="mt-3 text-base text-zinc-500">
              Organização profissional em poucos cliques
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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
            Investimento que vale a pena
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Menos de um cafezinho por dia para ter seu salão organizado
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-left">
              <h3 className="text-sm font-semibold text-zinc-300">Gratuito</h3>
              <p className="mt-2 text-3xl font-bold text-zinc-100">R$ 0</p>
              <p className="mt-1 text-xs text-zinc-500">Para sempre</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>✓ Até 2 serviços</li>
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
                <li>✓ Serviços ilimitados</li>
                <li>✓ Link personalizado</li>
                <li>✓ Logo do seu salão</li>
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
            Pronto para ter um salão mais organizado?
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Crie sua conta grátis e comece a oferecer agendamento online para suas clientes
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
