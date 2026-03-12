import Link from "next/link";
import { AlertCircle } from "lucide-react";

export function CompleteProfileBanner() {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
        <div className="flex-1">
          <h3 className="font-semibold text-amber-100">Complete seu perfil</h3>
          <p className="mt-1 text-sm text-amber-200/80">
            Adicione o nome do seu negócio nas configurações para começar a receber agendamentos.
          </p>
          <Link
            href="/dashboard/settings"
            className="mt-3 inline-block rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-400"
          >
            Ir para configurações
          </Link>
        </div>
      </div>
    </div>
  );
}
