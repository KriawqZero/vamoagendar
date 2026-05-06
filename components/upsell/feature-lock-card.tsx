import Link from "next/link";
import { Lock, Crown } from "lucide-react";

interface FeatureLockCardProps {
  featureName: string;
  benefitText: string;
  example?: string;
}

export function FeatureLockCard({ featureName, benefitText, example }: FeatureLockCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Lock size={16} />
        <p className="text-sm font-medium">{featureName} disponível nos planos Plus/Pro</p>
      </div>
      <p className="mt-2 text-sm text-gray-500">{benefitText}</p>
      {example && (
        <p className="mt-1 text-xs text-gray-400">
          Exemplo: <span className="font-mono text-gray-500">{example}</span>
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
