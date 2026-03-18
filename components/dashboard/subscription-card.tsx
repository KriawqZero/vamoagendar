"use client";

import { useState } from "react";
import { upgradeAction, cancelSubscriptionAction } from "@/lib/actions/billing.actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Check, Crown, AlertTriangle, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  PLUS_ANNUAL_PLAN_ID,
  PLUS_MONTHLY_PLAN_ID,
  PRO_ANNUAL_PLAN_ID,
  PRO_MONTHLY_PLAN_ID,
} from "@/lib/billing/plan-catalog";

interface SubscriptionCardProps {
  plan: string;
  subscription: {
    status: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    canceledAt: string | null;
  } | null;
  statusParam?: string;
}

const statusLabels: Record<string, string> = {
  ACTIVE: "Ativa",
  PAST_DUE: "Pagamento pendente",
  CANCELED: "Cancelada",
  INACTIVE: "Inativa",
  TRIALING: "Período de teste",
};

const statusVariants: Record<string, "success" | "warning" | "danger" | "default"> = {
  ACTIVE: "success",
  PAST_DUE: "warning",
  CANCELED: "danger",
  INACTIVE: "default",
  TRIALING: "default",
};

export function SubscriptionCard({ plan, subscription, statusParam }: SubscriptionCardProps) {
  const [upgrading, setUpgrading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPro = plan === "PRO";
  const isPlus = plan === "PLUS";
  const isPaid = isPro || isPlus;
  const planLabel = isPro ? "Pro" : isPlus ? "Plus" : "Gratuito";

  const handleUpgrade = async (planId: string) => {
    setUpgrading(true);
    setError(null);
    const result = await upgradeAction(planId);
    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
    } else if (result.error) {
      setError(result.error);
      setUpgrading(false);
    }
  };

  const handleCancel = async () => {
    setCanceling(true);
    setError(null);
    const result = await cancelSubscriptionAction();
    if (result.error) {
      setError(result.error);
    }
    setCanceling(false);
    setShowCancelModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Status param feedback */}
      {statusParam === "success" && (
        <div className="rounded-xl bg-emerald-900/20 p-4 text-sm text-emerald-400">
          Pagamento processado! Seu plano será atualizado em instantes.
        </div>
      )}
      {statusParam === "canceled" && (
        <div className="rounded-xl bg-amber-900/20 p-4 text-sm text-amber-400">
          Pagamento cancelado. Você continua no plano gratuito.
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-900/20 p-3 text-sm text-red-400">{error}</div>
      )}

      {/* Current plan card */}
      <div className={`rounded-2xl border p-6 ${isPaid ? "border-violet-500/30 bg-violet-500/5" : "border-zinc-800 bg-zinc-900"}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              {isPaid && <Crown size={18} className="text-violet-400" />}
              <h2 className="text-lg font-semibold text-zinc-100">
                Plano {planLabel}
              </h2>
            </div>
            {isPlus ? (
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-sm text-zinc-400">R$ 9,90/mês</p>
                <span className="text-xs text-zinc-600 line-through">R$ 19,90</span>
                <span className="text-xs text-emerald-400">(-50%)</span>
                <span className="text-xs text-zinc-500">• R$ 99,90/ano</span>
              </div>
            ) : isPro ? (
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-sm text-zinc-400">R$ 14,90/mês</p>
                <span className="text-xs text-zinc-600 line-through">R$ 29,90</span>
                <span className="text-xs text-emerald-400">(-50%)</span>
                <span className="text-xs text-zinc-500">• R$ 149,90/ano</span>
              </div>
            ) : (
              <p className="mt-1 text-sm text-zinc-500">Até 2 serviços, link automático</p>
            )}
          </div>
          {subscription && (
            <Badge variant={statusVariants[subscription.status] || "default"}>
              {statusLabels[subscription.status] || subscription.status}
            </Badge>
          )}
        </div>

        {subscription?.currentPeriodEnd && subscription.status === "ACTIVE" && (
          <p className="mt-3 text-xs text-zinc-500">
            Próxima cobrança: {new Date(subscription.currentPeriodEnd).toLocaleDateString("pt-BR")}
          </p>
        )}

        {subscription?.canceledAt && (
          <p className="mt-3 text-xs text-zinc-500">
            Cancelada em: {new Date(subscription.canceledAt).toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>

      {/* Upgrade card (FREE users) */}
      {!isPaid && (
        <div className="rounded-2xl border-2 border-violet-500/30 bg-violet-500/5 p-6">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-violet-400" />
            <h3 className="text-lg font-semibold text-zinc-100">Faça upgrade para Plus ou Pro</h3>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
            <Sparkles size={12} />
            Oferta especial - 50% OFF
          </div>
          <div className="mt-2 space-y-1 text-sm text-zinc-400">
            <p>
              <span className="font-semibold text-emerald-400">Plus: R$ 9,90/mês</span>{" "}
              <span className="text-zinc-600 line-through">R$ 19,90</span>{" "}
              <span className="text-xs text-zinc-500">• R$ 99,90/ano</span>
            </p>
            <p>
              <span className="font-semibold text-emerald-400">Pro: R$ 14,90/mês</span>{" "}
              <span className="text-zinc-600 line-through">R$ 29,90</span>{" "}
              <span className="text-xs text-zinc-500">• R$ 149,90/ano</span>
            </p>
          </div>
          
          <p className="mt-2 text-xs text-zinc-500">
            Menos de R$ 0,33 por dia, o preço de uma bala
          </p>

          <ul className="mt-4 space-y-2">
            {[
              "Serviços ilimitados — crie quantos precisar",
              "Link personalizado — /a/sua-marca (Plus) ou /sua-marca (Pro)",
              "Cor da sua marca — identidade profissional (Plus/Pro)",
              "Logo personalizado (Pro)",
              "Lembretes automáticos por WhatsApp (Pro, em breve)",
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-zinc-300">
                <Check size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-zinc-900/50 p-3">
            <p className="text-xs text-zinc-500">
              <span className="font-medium text-zinc-400">Profissionais que usam o Pro</span> relatam mais confiança dos clientes e agenda mais cheia
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setShowUpgradeModal(true)} loading={upgrading} className="flex-1">
              <Crown size={16} className="mr-1.5" />
              Escolher plano
            </Button>
            <Link
              href="/planos"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
            >
              Ver detalhes
            </Link>
          </div>
          <p className="mt-3 text-center text-xs text-zinc-600">
            <Link href="/faturamento" className="hover:text-zinc-500">
              Como funciona o faturamento?
            </Link>
          </p>
        </div>
      )}

      {/* Plan limits */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Limites do seu plano
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Serviços</span>
            <span className="text-zinc-200">{isPaid ? "Ilimitados" : "Até 2"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Link personalizado</span>
            <span className={isPaid ? "text-emerald-400" : "text-zinc-600"}>{isPaid ? "Sim" : "Não"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Logo personalizado</span>
            <span className={isPro ? "text-emerald-400" : "text-zinc-600"}>{isPro ? "Sim" : "Não"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Cor de destaque</span>
            <span className={isPaid ? "text-emerald-400" : "text-zinc-600"}>{isPaid ? "Sim" : "Não"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Lembretes WhatsApp</span>
            <span className={isPro ? "text-emerald-400" : "text-zinc-600"}>{isPro ? "Sim" : "Não"}</span>
          </div>
        </div>
      </div>

      {/* Cancel section (PRO users) */}
      {isPaid && subscription?.status === "ACTIVE" && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-zinc-500" />
            <h3 className="text-sm font-semibold text-zinc-400">Cancelar assinatura</h3>
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            Ao cancelar, seu plano voltará para o gratuito. Você perderá acesso aos recursos Pro.{" "}
            <Link href="/faturamento#cancelamento" className="text-zinc-500 hover:text-zinc-400">
              Saiba mais sobre cancelamento
            </Link>
          </p>
          <button
            onClick={() => setShowCancelModal(true)}
            className="mt-3 text-sm font-medium text-red-400 hover:text-red-300"
          >
            Cancelar assinatura
          </button>
        </div>
      )}

      {/* Cancel confirmation modal */}
      <Modal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancelar assinatura"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Tem certeza que deseja cancelar? Seu plano voltará para o gratuito e você perderá:
          </p>
          <ul className="space-y-1 text-sm text-zinc-500">
            <li>• Serviços ilimitados</li>
            <li>• Link personalizado</li>
            <li>• Customização de logo e cor</li>
            <li>• Lembretes por WhatsApp</li>
          </ul>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleCancel}
              loading={canceling}
              className="flex-1"
            >
              Confirmar cancelamento
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowCancelModal(false)}
              className="flex-1"
            >
              Manter plano
            </Button>
          </div>
        </div>
      </Modal>

      {/* Upgrade modal */}
      <Modal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Escolher plano"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Escolha o plano e o ciclo de pagamento.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              onClick={() => handleUpgrade(PLUS_MONTHLY_PLAN_ID)}
              loading={upgrading}
              className="w-full"
            >
              Assinar Plus — R$ 9,90/mês
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleUpgrade(PLUS_ANNUAL_PLAN_ID)}
              loading={upgrading}
              className="w-full"
            >
              Plus anual — R$ 99,90/ano
            </Button>
            <Button
              onClick={() => handleUpgrade(PRO_MONTHLY_PLAN_ID)}
              loading={upgrading}
              className="w-full"
            >
              Assinar Pro — R$ 14,90/mês
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleUpgrade(PRO_ANNUAL_PLAN_ID)}
              loading={upgrading}
              className="w-full"
            >
              Pro anual — R$ 149,90/ano
            </Button>
          </div>
          <p className="text-xs text-zinc-600">
            Após a confirmação do pagamento, seu plano será atualizado automaticamente.
          </p>
        </div>
      </Modal>
    </div>
  );
}
