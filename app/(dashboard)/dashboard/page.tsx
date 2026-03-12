import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { appointmentRepository } from "@/lib/repositories/appointment.repository";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { formatDateBR, formatWeekdayBR } from "@/lib/utils/date";
import { CalendarDays } from "lucide-react";
import { startOfDay, endOfDay, isToday as checkIsToday } from "date-fns";
import Link from "next/link";

export const metadata = {
  title: "Agenda | VamoAgendar",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/login");

  const appointments = await appointmentRepository.findTodayAndUpcoming(session.user.id);

  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const todayAppointments = appointments.filter(
    (a) => a.startTime >= todayStart && a.startTime <= todayEnd
  );

  const upcomingAppointments = appointments.filter(
    (a) => a.startTime > todayEnd
  );

  const nextAppointment = appointments.find(
    (a) => a.startTime >= now && a.status === "CONFIRMED"
  );

  let countdown = "";
  if (nextAppointment) {
    const diff = nextAppointment.startTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) {
      countdown = `em ${hours}h${minutes > 0 ? ` ${minutes}min` : ""}`;
    } else if (minutes > 0) {
      countdown = `em ${minutes}min`;
    } else {
      countdown = "agora";
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Agenda</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {formatWeekdayBR(now)}, {formatDateBR(now)}
        </p>
      </div>

      {/* Next appointment highlight */}
      {nextAppointment && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-400">
            Próximo atendimento {countdown}
          </p>
          <p className="mt-2 text-lg font-semibold text-zinc-100">
            {nextAppointment.clientName}
          </p>
          <p className="text-sm text-zinc-400">
            {nextAppointment.service.name} &middot;{" "}
            {new Date(nextAppointment.startTime).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {nextAppointment.clientPhone && (
            <p className="mt-1 text-xs text-zinc-500">
              {nextAppointment.clientPhone}
            </p>
          )}
        </div>
      )}

      {/* Today */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Hoje ({todayAppointments.length})
        </h2>
        {todayAppointments.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-800 py-12 text-center">
            <CalendarDays size={32} className="mb-3 text-zinc-600" />
            <p className="text-sm text-zinc-500">
              Nenhum agendamento para hoje.
            </p>
            <Link
              href="/dashboard/services"
              className="mt-3 text-sm font-medium text-violet-500 hover:text-violet-400"
            >
              Configurar serviços
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                clientName={apt.clientName}
                clientEmail={apt.clientEmail}
                clientPhone={apt.clientPhone}
                serviceName={apt.service.name}
                startTime={apt.startTime}
                endTime={apt.endTime}
                status={apt.status}
                isNext={apt.id === nextAppointment?.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming */}
      {upcomingAppointments.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Próximos dias ({upcomingAppointments.length})
          </h2>
          <div className="space-y-3">
            {upcomingAppointments.slice(0, 20).map((apt) => (
              <AppointmentCard
                key={apt.id}
                clientName={apt.clientName}
                clientEmail={apt.clientEmail}
                clientPhone={apt.clientPhone}
                serviceName={apt.service.name}
                startTime={apt.startTime}
                endTime={apt.endTime}
                status={apt.status}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
