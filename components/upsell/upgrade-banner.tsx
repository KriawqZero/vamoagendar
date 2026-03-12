"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, X } from "lucide-react";

export function UpgradeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
          <Crown size={20} className="text-violet-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-100">
            Desbloqueie todo o potencial do VamoAgendar
          </p>
          <p className="mt-0.5 text-xs text-zinc-400">
            Serviços ilimitados, link personalizado e muito mais por R$ 9,90/mês
          </p>
        </div>
        <Link
          href="/dashboard/assinatura"
          className="shrink-0 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Seja Pro
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
          aria-label="Dispensar"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
