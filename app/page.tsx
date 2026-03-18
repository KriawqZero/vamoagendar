import Link from "next/link";
import { CalendarDays, Clock, Link2, Zap, Crown, Sparkles, CheckCircle2, ArrowRight, BarChart3, Users, Smartphone } from "lucide-react";
import { getSession } from "@/lib/auth-server";
import { PricingTeaser } from "@/components/upsell/pricing-teaser";
import { BrandLink } from "@/components/brand/brand";

export default async function Home() {
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
                href="/planos"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                Planos
              </Link>
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
                Começar grátis
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-20 sm:py-32 lg:py-40">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
          <div className="absolute -right-40 -top-40 -z-10 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/10" />
          <div className="absolute -left-40 -bottom-40 -z-10 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-900/10" />

          <div className="mx-auto max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">
              <Zap size={16} />
              Para profissionais que querem crescer
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
              Seus clientes agendam.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Você trabalha.</span>
            </h1>

            <p className="mb-10 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              Pare de responder mensagens perguntando horários. Compartilhe um link e deixe seus clientes agendarem sozinhos — simples, rápido e profissional.
            </p>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
                >
                  Ir para Dashboard
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Social proof */}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ✓ Grátis para começar • ✓ Sem cartão de crédito • ✓ Pronto em 2 minutos
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
                Tudo que você precisa para gerenciar agendamentos
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Simples, profissional e sem complicação
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Link2,
                  title: "Link na bio",
                  description: "Um link único para compartilhar no Instagram, WhatsApp ou qualquer lugar. Seus clientes agendam direto.",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: CalendarDays,
                  title: "Agenda inteligente",
                  description: "Horários disponíveis gerados automaticamente. Sem conflitos, sem dupla marcação, sem dor de cabeça.",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  icon: Clock,
                  title: "Controle total",
                  description: "Defina seus horários de atendimento, exceções, feriados e serviços com facilidade.",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: Smartphone,
                  title: "Visual profissional",
                  description: "Página de agendamento bonita e responsiva. Seus clientes vão adorar a experiência.",
                  color: "from-cyan-500 to-cyan-600",
                },
                {
                  icon: CheckCircle2,
                  title: "Confirmação automática",
                  description: "Seus clientes recebem confirmação por email. Você vê tudo no painel em tempo real.",
                  color: "from-emerald-500 to-emerald-600",
                },
                {
                  icon: Crown,
                  title: "Personalize sua marca",
                  description: "Com o plano Pro, adicione seu logo, escolha suas cores e tenha um link personalizado.",
                  color: "from-amber-500 to-amber-600",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700"
                >
                  <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${feature.color} p-3`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/30 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
                Como funciona
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Comece a receber agendamentos em 3 passos
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
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
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  {index < 2 && (
                    <div className="absolute right-0 top-8 hidden w-full translate-x-1/2 md:block">
                      <div className="h-1 bg-gradient-to-r from-blue-600 to-transparent" />
                    </div>
                  )}
                  <div className="relative">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
                Planos simples e transparentes
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Comece grátis. Faça upgrade quando precisar.
              </p>
            </div>

            <PricingTeaser />

            <div className="mt-12 text-center">
              <Link
                href="/planos"
                className="inline-flex items-center gap-2 text-lg font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Ver comparação completa
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Pro Highlight */}
        <section className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-12 text-center dark:border-blue-900 dark:from-blue-950/30 dark:to-indigo-950/30">
              <Crown size={48} className="mx-auto mb-6 text-blue-600 dark:text-blue-400" />
              <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
                Destaque sua marca com o plano Pro
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Por apenas <span className="font-semibold text-emerald-600 dark:text-emerald-400">R$ 9,90/mês</span> <span className="text-slate-500 line-through dark:text-slate-500">R$ 19,90</span> (50% OFF), tenha acesso a recursos profissionais que fazem a diferença
              </p>

              <div className="mx-auto mb-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
                {[
                  "Link personalizado (vamoagendar.com.br/sua-marca)",
                  "Serviços ilimitados",
                  "Logo e cor da sua marca",
                  "Lembretes automáticos por WhatsApp (em breve)",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
              >
                <Crown size={20} />
                Começar agora
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/30 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
              Pronto para começar?
            </h2>
            <p className="mb-10 text-lg text-slate-600 dark:text-slate-400">
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
