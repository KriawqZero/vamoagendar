import Link from "next/link";
import { Crown } from "lucide-react";

export function SidebarUpgradeCard() {
  return (
    <Link
      href="/dashboard/assinatura"
      className="mb-3 block rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-3 transition-colors hover:border-violet-500/50"
    >
      <div className="flex items-center gap-2">
        <Crown size={16} className="text-violet-400" />
        <p className="text-sm font-semibold text-zinc-100">Upgrade</p>
      </div>
      <p className="mt-1 text-xs text-zinc-400">
        Plus por <span className="font-semibold text-emerald-400">R$ 9,90/mês</span> ou Pro por <span className="font-semibold text-emerald-400">R$ 14,90/mês</span>
      </p>
    </Link>
  );
}
