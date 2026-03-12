import Link from "next/link";
import { CalendarDays, Clock, Link2, Zap, Crown, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { getSession } from "@/lib/auth-server";
import { PricingTeaser } from "@/components/upsell/pricing-teaser";

export default async function Home() {
  const session = await getSession();
  const isAuthenticated = !!session?.user?.id;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Nav */}
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-violet-500"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              <path d="M8 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-playfair text-lg font-bold text-zinc-100" style={{ fontFamily: 'var(--font-playfair)' }}>vamoagendar</span>
          </div>

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
              href="/planos"
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200"
            >
              Planos
            </Link>
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

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
              <Zap size={12} className="text-violet-400" />
              Para profissionais, clínicas e empresas
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
              Seus clientes agendam.
              <br />
              <span className="text-violet-400">Você trabalha.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Pare de responder mensagens perguntando horários. Compartilhe um link e deixe seus clientes agendarem sozinhos — simples, rápido e profissional.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="w-full rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-700 sm:w-auto"
                >
                  Ir para Dashboard
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Example link */}
            <div className="mt-10 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm">
              <Link2 size={14} className="text-zinc-600" />
              <span className="text-zinc-500">vamoagendar.com.br/</span>
              <span className="font-medium text-violet-400">studio-maria</span>
            </div>

            {/* Social proof */}
            <p className="mt-8 text-xs text-zinc-600">
              Ideal para barbeiros, salões, psicólogos, clínicas, consultórios e profissionais autônomos
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-zinc-900 px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-zinc-100">
                Tudo que você precisa para gerenciar agendamentos
              </h2>
              <p className="mt-3 text-base text-zinc-500">
                Simples, profissional e sem complicação
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Link2,
                  title: "Link na bio",
                  description: "Um link único para compartilhar no Instagram, WhatsApp ou qualquer lugar. Seus clientes agendam direto.",
                },
                {
                  icon: CalendarDays,
                  title: "Agenda inteligente",
                  description: "Horários disponíveis gerados automaticamente. Sem conflitos, sem dupla marcação, sem dor de cabeça.",
                },
                {
                  icon: Clock,
                  title: "Controle total",
                  description: "Defina seus horários de atendimento, exceções, feriados e serviços com facilidade.",
                },
                {
                  icon: Sparkles,
                  title: "Visual profissional",
                  description: "Página de agendamento bonita e responsiva. Seus clientes vão adorar a experiência.",
                },
                {
                  icon: CheckCircle2,
                  title: "Confirmação automática",
                  description: "Seus clientes recebem confirmação por email. Você vê tudo no painel em tempo real.",
                },
                {
                  icon: Crown,
                  title: "Personalize sua marca",
                  description: "Com o plano Pro, adicione seu logo, escolha suas cores e tenha um link personalizado.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <feature.icon size={24} className="mb-4 text-violet-400" />
                  <h3 className="text-base font-semibold text-zinc-200">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-zinc-900 bg-zinc-900/30 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-zinc-100">
                Como funciona
              </h2>
              <p className="mt-3 text-base text-zinc-500">
                Comece a receber agendamentos em 3 passos
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Crie sua conta",
                  description: "Cadastro grátis em menos de 1 minuto. Sem cartão de crédito.",
                },
                {
                  step: "2",
                  title: "Configure seus serviços",
                  description: "Adicione seus serviços, defina durações e horários de atendimento.",
                },
                {
                  step: "3",
                  title: "Compartilhe seu link",
                  description: "Coloque na bio do Instagram, envie no WhatsApp. Pronto!",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/20 text-lg font-bold text-violet-400">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-200">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-zinc-900 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-zinc-100">
                Planos simples e transparentes
              </h2>
              <p className="mt-3 text-base text-zinc-500">
                Comece grátis. Faça upgrade quando precisar.
              </p>
            </div>

            <PricingTeaser />

            <div className="mt-8 text-center">
              <Link
                href="/planos"
                className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                Ver comparação completa
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* PRO Highlight */}
        <section className="border-t border-zinc-900 bg-gradient-to-b from-violet-500/5 to-transparent px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border-2 border-violet-500/30 bg-violet-500/5 p-8 text-center md:p-12">
              <Crown size={40} className="mx-auto mb-4 text-violet-400" />
              <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                Destaque sua marca com o plano Pro
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
                Por apenas <span className="font-semibold text-emerald-400">R$ 9,90/mês</span> <span className="text-zinc-600 line-through">R$ 19,90</span> (50% OFF), tenha acesso a recursos profissionais que fazem a diferença
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
                {[
                  "Link personalizado (vamoagendar.com.br/sua-marca)",
                  "Serviços ilimitados",
                  "Logo e cor da sua marca",
                  "Lembretes automáticos por WhatsApp (em breve)",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span className="text-sm text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  <Crown size={18} />
                  Começar agora
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-900 px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              Pronto para simplificar seus agendamentos?
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              Junte-se a centenas de profissionais que já usam o VamoAgendar
            </p>
            <div className="mt-8">
              <Link
                href="/register"
                className="inline-flex rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Criar conta grátis
              </Link>
            </div>
            <p className="mt-4 text-xs text-zinc-600">
              Sem cartão de crédito • Sem taxa de setup • Cancele quando quiser
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-zinc-400" style={{ fontFamily: 'var(--font-playfair)' }}>vamoagendar</p>
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
