import Link from "next/link";
import { Lock, Crown } from "lucide-react";

interface FeatureLockCardProps {
  featureName: string;
  benefitText: string;
  example?: string;
}

export function FeatureLockCard({ featureName, benefitText, example }: FeatureLockCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-2 text-zinc-500">
        <Lock size={16} />
        <p className="text-sm font-medium">{featureName} disponível nos planos Plus/Pro</p>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{benefitText}</p>
      {example && (
        <p className="mt-1 text-xs text-zinc-600">
          Exemplo: <span className="font-mono text-zinc-500">{example}</span>
        </p>
      )}
      <Link
        href="/dashboard/assinatura"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-violet-500 hover:text-violet-400"
      >
        <Crown size={14} />
        Fazer upgrade
      </Link>
    </div>
  );
}
