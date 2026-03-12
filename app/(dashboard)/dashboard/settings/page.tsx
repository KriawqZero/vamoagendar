import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { userRepository } from "@/lib/repositories/user.repository";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const metadata = {
  title: "Configurações | VamoAgendar",
};

export default async function SettingsPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login");

  const user = await userRepository.findById(session.user.id);
  if (!user) redirect("/login");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Configurações</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Gerencie seu perfil e preferências.
        </p>
      </div>

      <SettingsForm
        user={{
          name: user.name,
          businessName: user.businessName,
          logoUrl: user.logoUrl,
          accentColor: user.accentColor,
          bookingCode: user.bookingCode,
          customSlug: user.customSlug,
          slugChangedAt: user.slugChangedAt?.toISOString() ?? null,
          plan: user.plan,
          email: user.email,
        }}
      />
    </div>
  );
}
