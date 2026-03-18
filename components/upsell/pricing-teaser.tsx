import { Check, X } from "lucide-react";

const features = [
  { name: "Serviços", free: "Até 2", plus: "Ilimitados", pro: "Ilimitados" },
  { name: "Link personalizado", free: false, plus: true, pro: true },
  { name: "Cor personalizada", free: false, plus: true, pro: true },
  { name: "Logo personalizado", free: false, plus: false, pro: true },
  { name: "Lembretes WhatsApp", free: false, plus: false, pro: true },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-zinc-300">{value}</span>;
  }
  return value ? (
    <Check size={16} className="text-emerald-400" />
  ) : (
    <X size={16} className="text-zinc-600" />
  );
}

export function PricingTeaser() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <h3 className="text-sm font-semibold text-zinc-300">Gratuito</h3>
        <p className="mt-1 text-2xl font-bold text-zinc-100">R$ 0</p>
        <p className="text-xs text-zinc-500">Para começar</p>
        <ul className="mt-4 space-y-2">
          {features.map((f) => (
            <li key={f.name} className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">{f.name}</span>
              <FeatureValue value={f.free} />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-300">Plus</h3>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">-50%</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="text-2xl font-bold text-zinc-100">R$ 9,90</p>
          <p className="text-sm text-zinc-600 line-through">R$ 19,90</p>
        </div>
        <p className="text-xs text-zinc-400">por mês • R$ 99,90/ano</p>
        <ul className="mt-4 space-y-2">
          {features.map((f) => (
            <li key={f.name} className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">{f.name}</span>
              <FeatureValue value={f.plus} />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border-2 border-violet-500/50 bg-violet-500/5 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-violet-400">Pro</h3>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">-50%</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="text-2xl font-bold text-zinc-100">R$ 14,90</p>
          <p className="text-sm text-zinc-600 line-through">R$ 29,90</p>
        </div>
        <p className="text-xs text-zinc-400">por mês • R$ 149,90/ano</p>
        <ul className="mt-4 space-y-2">
          {features.map((f) => (
            <li key={f.name} className="flex items-center justify-between text-sm">
              <span className="text-zinc-300">{f.name}</span>
              <FeatureValue value={f.pro} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
