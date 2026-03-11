import Link from "next/link";
import { CalendarDays, Clock, Link2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Nav */}
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-sm font-bold text-zinc-100">VamoAgendar</span>
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
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            <Zap size={12} className="text-violet-400" />
            Agendamento simples para profissionais
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
            Seus clientes agendam.
            <br />
            <span className="text-violet-400">Você trabalha.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-zinc-500">
            Pare de responder mensagens perguntando horários. Coloque seu link no Instagram e deixe os clientes agendarem sozinhos.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="w-full rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white hover:bg-violet-700 sm:w-auto"
            >
              Começar grátis
            </Link>
            <Link
              href="/login"
              className="w-full rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 sm:w-auto"
            >
              Já tenho conta
            </Link>
          </div>

          {/* Example link */}
          <div className="mt-10 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm">
            <Link2 size={14} className="text-zinc-600" />
            <span className="text-zinc-500">vamoagendar.com/book/</span>
            <span className="font-medium text-violet-400">barbearia-neto</span>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-20 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: Link2,
              title: "Um link só",
              description: "Coloque na bio do Instagram. Seus clientes agendam direto.",
            },
            {
              icon: CalendarDays,
              title: "Agenda inteligente",
              description: "Horários gerados automaticamente. Sem conflitos, sem surpresas.",
            },
            {
              icon: Clock,
              title: "Controle total",
              description: "Defina serviços, horários, exceções e feriados facilmente.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-left"
            >
              <feature.icon size={20} className="mb-3 text-violet-400" />
              <h3 className="text-sm font-semibold text-zinc-200">{feature.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-700">
        VamoAgendar &middot; Agendamento simples para profissionais.
      </footer>
    </div>
  );
}
