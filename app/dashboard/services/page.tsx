import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { userRepository } from "@/lib/repositories/user.repository";
import { getPlanLimits } from "@/lib/utils/plan";
import { ServiceList } from "@/components/dashboard/service-list";

export const metadata = {
  title: "Serviços | VamoAgendar",
};

export default async function ServicesPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login");

  const [services, user] = await Promise.all([
    serviceRepository.findByUserId(session.user.id),
    userRepository.findById(session.user.id),
  ]);

  if (!user) redirect("/login");

  const limits = getPlanLimits(user.plan);
  const canCreate = services.length < limits.maxServices;

  return (
    <ServiceList
      services={services}
      canCreate={canCreate}
      planLimit={limits.maxServices}
    />
  );
}
