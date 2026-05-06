import Link from "next/link";
import { Check, Crown, Sparkles, ArrowRight, Zap } from "lucide-react";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth-server";
import { MarketingNav, MarketingFooter } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "Planos | VamoAgendar",
  description: "Escolha o plano ideal para o seu negócio.",
};

const features = [
  { name: "Agendamento online", free: true, plus: true, pro: true },
  { name: "Link de agendamento", free: true, plus: true, pro: true },
  { name: "Gestão de agenda", free: true, plus: true, pro: true },
  { name: "Horários personalizáveis", free: true, plus: true, pro: true },
  { name: "Exceções e feriados", free: true, plus: true, pro: true },
  { name: "Serviços", free: "Até 2", plus: "Ilimitados", pro: "Ilimitados" },
  { name: "Link personalizado", free: false, plus: true, pro: true },
  { name: "Cor personalizada", free: false, plus: true, pro: true },
  { name: "Logo personalizado", free: false, plus: false, pro: true },
  { name: "Lembretes por WhatsApp (futuro)", free: false, plus: false, pro: true },
  { name: "Google Calendar (futuro)", free: false, plus: false, pro: true },
];

function FeatureValue({ value, dark = false }: { value: boolean | string; dark?: boolean }) {
  if (typeof value === "string") {
    return (
      <span className={`text-sm font-semibold ${dark ? "text-white" : "text-[#0D0820]"}`}>
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          dark ? "bg-white/20" : "bg-emerald-100"
        }`}
      >
        <Check size={13} className={dark ? "text-white" : "text-emerald-600"} />
      </span>
    );
  }
  return (
    <span
      className={`inline-block h-6 w-6 rounded-full border ${
        dark ? "border-white/20" : "border-[#E2DAF8]"
      }`}
    />
  );
}

export default async function PlanosPage() {
  const session = await getSession();
  const isAuthenticated = !!session?.user?.id;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <MarketingNav isAuthenticated={isAuthenticated} />

      <main className="flex-1">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-[#E2DAF8] px-4 py-20 sm:py-28">
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(102,51,204,0.10) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Arc decoration */}
          <svg
            className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px]"
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden
          >
            <circle cx="400" cy="0" r="160" stroke="#4219B0" strokeWidth="1" opacity="0.08" />
            <circle cx="400" cy="0" r="280" stroke="#3DBAED" strokeWidth="0.75" opacity="0.06" />
          </svg>

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#3DBAED]">
              Planos
            </p>
            <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-5xl font-bold leading-tight text-[#0D0820] sm:text-6xl">
              Simples,{" "}
              <span className="italic text-[#4219B0]">sem surpresas</span>
            </h1>
            <p className="text-xl leading-relaxed text-[#6B5FA8]">
              Comece grátis e faça upgrade quando precisar. Sem taxas escondidas.
            </p>
          </div>
        </section>

        {/* ── Plan cards ────────────────────────────────────────────────── */}
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* FREE */}
              <div className="flex flex-col rounded-3xl border border-[#E2DAF8] bg-white p-8 transition-all hover:shadow-lg hover:shadow-[#4219B0]/5">
                <div className="mb-6">
                  <div className="mb-5 inline-flex rounded-xl bg-[#F0ECFF] p-3">
                    <Zap size={22} className="text-[#4219B0]" />
                  </div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#9B90C8]">
                    Gratuito
                  </p>
                  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D0820]">
                    R$ 0
                  </h2>
                  <p className="mt-1 text-sm text-[#9B90C8]">para sempre</p>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-[#6B5FA8]">
                  Ideal para começar e testar o sistema sem compromisso.
                </p>

                <Link
                  href="/register"
                  className="mb-8 flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E2DAF8] px-6 py-3 text-sm font-semibold text-[#4219B0] transition-all hover:border-[#4219B0]/40 hover:bg-[#4219B0]/5"
                >
                  Começar grátis <ArrowRight size={16} />
                </Link>

                <div className="space-y-3.5">
                  {features.map((f) => (
                    <div key={f.name} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-[#6B5FA8]">{f.name}</span>
                      <FeatureValue value={f.free} />
                    </div>
                  ))}
                </div>
              </div>

              {/* PLUS */}
              <div className="relative flex flex-col rounded-3xl border border-[#E2DAF8] bg-white p-8 transition-all hover:shadow-lg hover:shadow-[#4219B0]/5">
                <div className="absolute -top-4 right-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                    <Sparkles size={12} /> 50% OFF
                  </span>
                </div>

                <div className="mb-6">
                  <div className="mb-5 inline-flex rounded-xl bg-[#F0ECFF] p-3">
                    <Sparkles size={22} className="text-[#4219B0]" />
                  </div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#9B90C8]">
                    Plus
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D0820]">
                      R$ 9,90
                    </h2>
                    <span className="text-sm text-[#C4B8E8] line-through">R$ 19,90</span>
                  </div>
                  <p className="mt-1 text-sm text-[#9B90C8]">por mês · R$ 99,90/ano</p>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-[#6B5FA8]">
                  Para quem quer personalizar a marca e ter um link memorável.
                </p>

                <Link
                  href="/register"
                  className="mb-8 flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E2DAF8] px-6 py-3 text-sm font-semibold text-[#4219B0] transition-all hover:border-[#4219B0]/40 hover:bg-[#4219B0]/5"
                >
                  Assinar Plus <ArrowRight size={16} />
                </Link>

                <div className="space-y-3.5">
                  {features.map((f) => (
                    <div key={f.name} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-[#6B5FA8]">{f.name}</span>
                      <FeatureValue value={f.plus} />
                    </div>
                  ))}
                </div>
              </div>

              {/* PRO — highlighted */}
              <div className="relative flex flex-col rounded-3xl border-2 border-[#4219B0] bg-[#4219B0] p-8 shadow-xl shadow-[#4219B0]/25">
                <div className="absolute -top-4 right-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3DBAED] px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                    <Crown size={12} /> Mais popular
                  </span>
                </div>

                {/* Subtle dot grid on dark card */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative mb-6">
                  <div className="mb-5 inline-flex rounded-xl bg-white/15 p-3">
                    <Crown size={22} className="text-white" />
                  </div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/50">
                    Pro
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                      R$ 14,90
                    </h2>
                    <span className="text-sm text-white/30 line-through">R$ 29,90</span>
                  </div>
                  <p className="mt-1 text-sm text-white/50">por mês · R$ 149,90/ano</p>
                </div>

                <p className="relative mb-6 text-sm leading-relaxed text-white/70">
                  Para profissionais que querem se destacar e crescer.
                </p>

                <Link
                  href="/register"
                  className="relative mb-8 flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#4219B0] transition-all hover:bg-white/90"
                >
                  Assinar Pro <ArrowRight size={16} />
                </Link>

                <div className="relative space-y-3.5">
                  {features.map((f) => (
                    <div key={f.name} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-white/70">{f.name}</span>
                      <FeatureValue value={f.pro} dark />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature comparison table ───────────────────────────────────── */}
        <section className="border-t border-[#E2DAF8] bg-[#F0ECFF] px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3DBAED]">
                Comparação
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0D0820]">
                Comparação completa
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E2DAF8] bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2DAF8]">
                    <th className="px-6 py-4 text-left font-semibold text-[#0D0820]">Recurso</th>
                    <th className="px-6 py-4 text-center font-semibold text-[#0D0820]">
                      Gratuito
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-[#0D0820]">Plus</th>
                    <th className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-[#4219B0] px-3 py-1 text-xs font-bold text-white">
                        <Crown size={11} /> Pro
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr
                      key={f.name}
                      className={`border-b border-[#E2DAF8] last:border-0 ${
                        i % 2 === 0 ? "bg-white" : "bg-[#FAFAFF]"
                      }`}
                    >
                      <td className="px-6 py-4 text-[#6B5FA8]">{f.name}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="flex justify-center">
                          <FeatureValue value={f.free} />
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="flex justify-center">
                          <FeatureValue value={f.plus} />
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="flex justify-center">
                          <FeatureValue value={f.pro} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="border-t border-[#E2DAF8] bg-white px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3DBAED]">
                Dúvidas
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0D0820]">
                Perguntas frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Posso cancelar a qualquer momento?",
                  a: "Sim. Sem multa, sem burocracia. Seu plano volta para o gratuito imediatamente.",
                },
                {
                  q: "Preciso de cartão de crédito para começar?",
                  a: "Não. O plano gratuito não requer nenhum dado de pagamento.",
                },
                {
                  q: "Como funciona o pagamento?",
                  a: "Pagamento via Mercado Pago. Aceita PIX, cartão de crédito e boleto.",
                },
                {
                  q: "Posso fazer upgrade depois?",
                  a: "Sim! Comece no plano gratuito e faça upgrade para Plus ou Pro a qualquer momento.",
                },
                {
                  q: "O que acontece se eu cancelar o Pro?",
                  a: "Seu plano volta para o gratuito. Você mantém até 2 serviços e o link de agendamento continua funcionando.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#E2DAF8] bg-[#FAFAFF] p-6"
                >
                  <p className="mb-2 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0D0820]">
                    {faq.q}
                  </p>
                  <p className="leading-relaxed text-[#6B5FA8]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-[#3515A0] bg-[#4219B0] px-4 py-20 sm:py-28">
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Arc */}
          <svg
            className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] opacity-10"
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden
          >
            <circle cx="400" cy="0" r="180" stroke="white" strokeWidth="1.5" />
            <circle cx="400" cy="0" r="320" stroke="white" strokeWidth="0.75" />
          </svg>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold italic text-white sm:text-5xl">
              Pronto para começar?
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-white/65">
              Crie sua conta grátis agora e comece a receber agendamentos em
              minutos.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-10 py-4 text-base font-semibold text-[#4219B0] shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5 hover:bg-white/95"
            >
              Criar conta grátis <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
