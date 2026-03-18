import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { getSubscriptionInfo } from "@/lib/services/billing.service";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";

export const metadata = {
  title: "Assinatura | VamoAgendar",
};

interface AssinaturaPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AssinaturaPage({ searchParams }: AssinaturaPageProps) {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login");

  const info = await getSubscriptionInfo(session.user.id);
  if (!info) redirect("/login");

  const { status } = await searchParams;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Assinatura</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Gerencie seu plano e assinatura.
        </p>
      </div>

      <SubscriptionCard
        plan={info.plan}
        subscription={
          info.subscription
            ? {
                status: info.subscription.status,
                currentPeriodStart: info.subscription.currentPeriodStart?.toISOString() ?? null,
                currentPeriodEnd: info.subscription.currentPeriodEnd?.toISOString() ?? null,
                canceledAt: info.subscription.canceledAt?.toISOString() ?? null,
              }
            : null
        }
        statusParam={status}
      />
    </div>
  );
}
