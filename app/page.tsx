import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Link2,
  Zap,
  Crown,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { getSession } from "@/lib/auth-server";
import { MarketingNav, MarketingFooter } from "@/components/marketing/marketing-shell";

// ─── Inline pricing data ────────────────────────────────────────────────────
const pricingFeatures = [
  { label: "Serviços", free: "Até 2", plus: "Ilimitados", pro: "Ilimitados" },
  { label: "Link de agendamento", free: true, plus: true, pro: true },
  { label: "Link personalizado", free: false, plus: true, pro: true },
  { label: "Cor personalizada", free: false, plus: true, pro: true },
  { label: "Logo personalizado", free: false, plus: false, pro: true },
  { label: "Lembretes por WhatsApp", free: false, plus: false, pro: true },
];

function FeatureRow({ value }: { value: boolean | string }) {
  if (typeof value === "string")
    return <span className="text-sm font-semibold text-[#0D0820]">{value}</span>;
  if (value)
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 size={13} className="text-emerald-600" />
      </span>
    );
  return <span className="h-5 w-5 rounded-full border border-[#E2DAF8] inline-block" />;
}

// ─── Hero booking card mock ─────────────────────────────────────────────────
function BookingCard() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      {/* Floating notification */}
      <div
        className="absolute -top-4 left-4 z-20 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-[#E2DAF8]"
        style={{ animation: "fade-up 0.6s ease 0.6s both" }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold text-[#0D0820]">Novo agendamento!</span>
        <span className="text-xs text-[#9B90C8]">agora</span>
      </div>

      {/* Main card */}
      <div
        className="relative rounded-3xl bg-white ring-1 ring-[#E2DAF8] overflow-hidden"
        style={{
          transform: "rotate(2deg)",
          animation: "float 5s ease-in-out infinite",
          boxShadow:
            "0 32px 72px rgba(66, 25, 176, 0.16), 0 8px 24px rgba(66, 25, 176, 0.06)",
        }}
      >
        {/* Card header strip */}
        <div className="bg-[#4219B0] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
              MS
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Maria Santos</p>
              <p className="text-xs text-white/60">Psicóloga Clínica</p>
            </div>
            <div className="ml-auto rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
              Online
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6">
          {/* Selected service */}
          <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-[#F0ECFF] p-3.5">
            <div>
              <p className="text-sm font-semibold text-[#0D0820]">Consulta Individual</p>
              <p className="text-xs text-[#9B90C8] mt-0.5">50 min · R$ 150,00</p>
            </div>
            <CheckCircle2 size={18} className="text-[#4219B0] shrink-0" />
          </div>

          {/* Time slots */}
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#9B90C8]">
            Quinta, 10 de Abril
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { t: "09:00", s: false, b: false },
              { t: "09:50", s: false, b: true },
              { t: "10:40", s: true, b: false },
              { t: "11:30", s: false, b: false },
              { t: "14:00", s: false, b: false },
              { t: "14:50", s: false, b: false },
            ].map(({ t, s, b }) => (
              <div
                key={t}
                className={`rounded-xl py-2.5 text-center text-xs font-semibold ${
                  s
                    ? "bg-[#4219B0] text-white"
                    : b
                    ? "bg-[#F4F2FD] text-[#C4B8E8] line-through"
                    : "border border-[#E2DAF8] text-[#0D0820]"
                }`}
              >
                {t}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 rounded-2xl bg-[#4219B0] py-3.5 text-center text-sm font-semibold text-white">
            Confirmar Agendamento →
          </div>
          <p className="mt-2.5 text-center text-[10px] text-[#9B90C8]">
            Agendado via VamoAgendar
          </p>
        </div>
      </div>

      {/* Floating stat below */}
      <div
        className="absolute -bottom-5 -right-4 z-20 rounded-2xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-[#E2DAF8]"
        style={{ animation: "fade-up 0.6s ease 0.9s both" }}
      >
        <p className="text-xs font-bold text-[#0D0820]">+12 este mês</p>
        <p className="text-[10px] text-[#9B90C8]">agendamentos</p>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default async function Home() {
  const session = await getSession();
  const isAuthenticated = !!session?.user?.id;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <MarketingNav isAuthenticated={isAuthenticated} />

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 py-20 sm:py-28 lg:py-36">
          {/* Dot grid texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(102,51,204,0.10) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Concentric arc decorations — top right */}
          <svg
            className="pointer-events-none absolute right-0 top-0 h-[640px] w-[640px]"
            viewBox="0 0 640 640"
            fill="none"
            aria-hidden
          >
            <circle cx="640" cy="0" r="220" stroke="#4219B0" strokeWidth="1" opacity="0.08" />
            <circle cx="640" cy="0" r="360" stroke="#4219B0" strokeWidth="0.75" opacity="0.06" />
            <circle cx="640" cy="0" r="500" stroke="#3DBAED" strokeWidth="0.5" opacity="0.08" />
            <circle cx="640" cy="0" r="120" stroke="#3961D5" strokeWidth="1.5" opacity="0.10" />
          </svg>

          {/* Soft glow blobs */}
          <div className="pointer-events-none absolute right-[10%] top-[15%] h-80 w-80 rounded-full bg-[#C7B5FF]/30 blur-[80px]" />
          <div className="pointer-events-none absolute left-[5%] bottom-[10%] h-52 w-52 rounded-full bg-[#BAEEFF]/25 blur-[60px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
              {/* Left: copy */}
              <div style={{ animation: "fade-up 0.7s ease both" }}>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#4219B0]/20 bg-[#4219B0]/6 px-4 py-2 text-sm font-medium text-[#4219B0]">
                  <Zap size={14} />
                  Para profissionais que querem crescer
                </div>

                <h1 className="mb-6 font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.08] tracking-tight text-[#0D0820] sm:text-6xl lg:text-[5rem]">
                  Seus clientes{" "}
                  <span className="italic text-[#4219B0]">agendam.</span>
                  <br />
                  Você{" "}
                  <span className="italic text-[#3961D5]">trabalha.</span>
                </h1>

                <p className="mb-9 max-w-[500px] text-lg leading-relaxed text-[#6B5FA8]">
                  Pare de responder mensagens perguntando horários. Compartilhe
                  um link e deixe seus clientes agendarem sozinhos — simples,
                  rápido e profissional.
                </p>

                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  {isAuthenticated ? (
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center rounded-2xl bg-[#4219B0] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#4219B0]/25 transition-all hover:bg-[#3515A0] hover:shadow-xl hover:shadow-[#4219B0]/30 hover:-translate-y-0.5"
                    >
                      Ir para Dashboard <ArrowRight className="ml-2" size={18} />
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/register"
                        className="inline-flex items-center justify-center rounded-2xl bg-[#4219B0] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#4219B0]/25 transition-all hover:bg-[#3515A0] hover:shadow-xl hover:shadow-[#4219B0]/30 hover:-translate-y-0.5"
                      >
                        Começar grátis agora <ArrowRight className="ml-2" size={18} />
                      </Link>
                      <Link
                        href="/planos"
                        className="inline-flex items-center justify-center rounded-2xl border-2 border-[#E2DAF8] px-8 py-4 text-base font-semibold text-[#4219B0] transition-all hover:border-[#4219B0]/40 hover:bg-white"
                      >
                        Ver planos
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {["✓ Grátis para começar", "✓ Sem cartão de crédito", "✓ Pronto em 2 minutos"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#E2DAF8] bg-white px-3.5 py-1.5 text-sm text-[#6B5FA8]"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Right: booking card */}
              <div
                className="hidden lg:flex lg:justify-center lg:pr-8"
                style={{ animation: "fade-in 0.9s ease 0.3s both", opacity: 0 }}
              >
                <BookingCard />
              </div>
            </div>
          </div>

          {/* Animated waves — bottom */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            {/* Wave 1 — back layer, slower */}
            <svg
              viewBox="0 0 2880 88"
              xmlns="http://www.w3.org/2000/svg"
              className="relative block w-[200%]"
              style={{ animation: "wave-move 18s linear infinite" }}
              aria-hidden
            >
              <path
                d="M0,44 C240,80 480,8 720,44 C960,80 1200,8 1440,44 C1680,80 1920,8 2160,44 C2400,80 2640,8 2880,44 L2880,88 L0,88 Z"
                fill="#4219B0"
                fillOpacity="0.06"
              />
            </svg>
            {/* Wave 2 — front layer, faster, reverse */}
            <svg
              viewBox="0 0 2880 64"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0 block w-[200%]"
              style={{ animation: "wave-move-reverse 12s linear infinite" }}
              aria-hidden
            >
              <path
                d="M0,32 C360,60 720,4 1080,32 C1440,60 1800,4 2160,32 C2520,60 2880,4 2880,32 L2880,64 L0,64 Z"
                fill="#3961D5"
                fillOpacity="0.05"
              />
            </svg>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────── */}
        <section className="border-t border-[#E2DAF8] bg-white px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3DBAED]">
                Funcionalidades
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-[#0D0820] sm:text-5xl">
                Tudo para sua agenda profissional
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Link2,
                  title: "Link na bio",
                  desc: "Um link único para o Instagram, WhatsApp ou qualquer lugar. Seus clientes agendam direto.",
                },
                {
                  icon: CalendarDays,
                  title: "Agenda inteligente",
                  desc: "Horários gerados automaticamente. Sem conflitos, sem dupla marcação, sem dor de cabeça.",
                },
                {
                  icon: Clock,
                  title: "Controle total",
                  desc: "Defina horários de atendimento, exceções, feriados e serviços com facilidade.",
                },
                {
                  icon: Smartphone,
                  title: "Visual profissional",
                  desc: "Página de agendamento bonita e responsiva — seus clientes vão adorar.",
                },
                {
                  icon: CheckCircle2,
                  title: "Confirmação automática",
                  desc: "Clientes recebem confirmação por email. Você vê tudo no painel em tempo real.",
                },
                {
                  icon: Crown,
                  title: "Personalize sua marca",
                  desc: "Com Plus ou Pro, escolha cores e tenha link personalizado. No Pro, adicione sua logo.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-[#E2DAF8] bg-[#FAFAFF] p-8 transition-all duration-200 hover:border-[#4219B0]/30 hover:shadow-lg hover:shadow-[#4219B0]/6 hover:-translate-y-0.5"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-[#4219B0]/10 p-3">
                    <f.icon size={22} className="text-[#4219B0]" />
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0D0820]">
                    {f.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-[#6B5FA8]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <section className="border-t border-[#E2DAF8] bg-[#F0ECFF] px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3DBAED]">
                Como funciona
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0D0820] sm:text-5xl">
                Comece em 3 passos
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Crie sua conta",
                  desc: "Cadastro grátis em menos de 1 minuto. Sem cartão de crédito, sem compromisso.",
                },
                {
                  step: "02",
                  title: "Configure seus serviços",
                  desc: "Adicione serviços, defina durações e horários do jeito que você trabalha.",
                },
                {
                  step: "03",
                  title: "Compartilhe seu link",
                  desc: "Coloque na bio do Instagram, envie no WhatsApp. Pronto! Agendamentos automáticos.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E2DAF8]"
                >
                  <div className="mb-2 select-none font-[family-name:var(--font-playfair)] text-8xl font-black leading-none text-[#4219B0]/8">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0D0820]">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-[#6B5FA8]">{item.desc}</p>
                  {i < 2 && (
                    <div className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-7 w-7 items-center justify-center rounded-full bg-[#4219B0]/10">
                      <ArrowRight size={14} className="text-[#4219B0]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing preview ───────────────────────────────────────────── */}
        <section className="border-t border-[#E2DAF8] bg-white px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3DBAED]">
                Planos
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0D0820] sm:text-5xl">
                Simples e transparente
              </h2>
              <p className="mt-4 text-lg text-[#6B5FA8]">Comece grátis. Faça upgrade quando precisar.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {/* Free */}
              <div className="flex flex-col rounded-2xl border border-[#E2DAF8] bg-[#FAFAFF] p-7">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#9B90C8]">
                  Gratuito
                </p>
                <p className="mb-1 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D0820]">
                  R$ 0
                </p>
                <p className="mb-6 text-xs text-[#9B90C8]">para sempre</p>
                <ul className="flex-1 space-y-3">
                  {pricingFeatures.map((f) => (
                    <li key={f.label} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-[#6B5FA8]">{f.label}</span>
                      <FeatureRow value={f.free} />
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="mt-7 block rounded-xl border-2 border-[#E2DAF8] py-2.5 text-center text-sm font-semibold text-[#4219B0] transition-all hover:border-[#4219B0]/40 hover:bg-[#4219B0]/5"
                >
                  Começar grátis
                </Link>
              </div>

              {/* Plus */}
              <div className="flex flex-col rounded-2xl border border-[#E2DAF8] bg-[#FAFAFF] p-7">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#9B90C8]">Plus</p>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    −50%
                  </span>
                </div>
                <div className="mb-0.5 flex items-baseline gap-2">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D0820]">
                    R$ 9,90
                  </p>
                  <p className="text-sm text-[#C4B8E8] line-through">R$ 19,90</p>
                </div>
                <p className="mb-6 text-xs text-[#9B90C8]">por mês · R$ 99,90/ano</p>
                <ul className="flex-1 space-y-3">
                  {pricingFeatures.map((f) => (
                    <li key={f.label} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-[#6B5FA8]">{f.label}</span>
                      <FeatureRow value={f.plus} />
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="mt-7 block rounded-xl border-2 border-[#E2DAF8] py-2.5 text-center text-sm font-semibold text-[#4219B0] transition-all hover:border-[#4219B0]/40 hover:bg-[#4219B0]/5"
                >
                  Assinar Plus
                </Link>
              </div>

              {/* Pro — highlighted */}
              <div className="flex flex-col rounded-2xl border-2 border-[#4219B0] bg-[#4219B0] p-7">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/50">Pro</p>
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-bold text-white">
                    <Sparkles size={10} /> −50%
                  </span>
                </div>
                <div className="mb-0.5 flex items-baseline gap-2">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                    R$ 14,90
                  </p>
                  <p className="text-sm text-white/30 line-through">R$ 29,90</p>
                </div>
                <p className="mb-6 text-xs text-white/50">por mês · R$ 149,90/ano</p>
                <ul className="flex-1 space-y-3">
                  {pricingFeatures.map((f) => (
                    <li key={f.label} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/70">{f.label}</span>
                      <span className="text-white/90">
                        {typeof f.pro === "string" ? (
                          <span className="text-sm font-semibold">{f.pro}</span>
                        ) : f.pro ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                            <CheckCircle2 size={13} className="text-white" />
                          </span>
                        ) : (
                          <span className="h-5 w-5 rounded-full border border-white/20 inline-block" />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="mt-7 block rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-[#4219B0] transition-all hover:bg-white/90"
                >
                  Assinar Pro
                </Link>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/planos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4219B0] transition-colors hover:text-[#3515A0]"
              >
                Ver comparação completa <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Pro CTA ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-[#3515A0] bg-[#4219B0] px-4 py-20 sm:py-28">
          {/* Dot grid on dark */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Arc decoration */}
          <svg
            className="pointer-events-none absolute -left-20 -bottom-20 h-[500px] w-[500px] opacity-10"
            viewBox="0 0 500 500"
            fill="none"
            aria-hidden
          >
            <circle cx="0" cy="500" r="200" stroke="white" strokeWidth="1.5" />
            <circle cx="0" cy="500" r="350" stroke="white" strokeWidth="0.75" />
          </svg>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Crown size={28} className="text-[#3DBAED]" />
            </div>
            <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold italic text-white sm:text-5xl">
              Destaque sua marca com Plus ou Pro
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/65">
              Plus por{" "}
              <span className="font-semibold text-white">R$ 9,90/mês</span>{" "}
              <span className="text-white/35 line-through">R$ 19,90</span> — ou
              Pro por{" "}
              <span className="font-semibold text-white">R$ 14,90/mês</span>{" "}
              <span className="text-white/35 line-through">R$ 29,90</span>.{" "}
              50% OFF no lançamento.
            </p>
            <div className="mx-auto mb-12 grid max-w-xl gap-3 text-left sm:grid-cols-2">
              {[
                "Link personalizado (/sua-marca)",
                "Serviços ilimitados",
                "Cor da sua marca",
                "Logo personalizado (Pro)",
                "Lembretes por WhatsApp (Pro)",
              ].map((b) => (
                <div key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#3DBAED]" />
                  <span className="text-sm leading-relaxed text-white/75">{b}</span>
                </div>
              ))}
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#4219B0] shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5 hover:bg-white/95"
            >
              <Crown size={18} /> Começar agora
            </Link>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────────────── */}
        <section className="border-t border-[#E2DAF8] bg-[#F0ECFF] px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0D0820] sm:text-5xl">
              Pronto para começar?
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-[#6B5FA8]">
              Crie sua conta grátis agora e comece a receber agendamentos em
              minutos.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-[#4219B0] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-[#4219B0]/25 transition-all hover:bg-[#3515A0] hover:shadow-xl hover:shadow-[#4219B0]/30 hover:-translate-y-0.5"
            >
              Criar conta grátis <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
