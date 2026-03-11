import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { workingHoursRepository } from "@/lib/repositories/working-hours.repository";
import { holidayRepository } from "@/lib/repositories/holiday.repository";
import { exceptionRepository } from "@/lib/repositories/exception.repository";
import { ScheduleEditor } from "@/components/dashboard/schedule-editor";
import { HolidaysManager } from "@/components/dashboard/holidays-manager";

export const metadata = {
  title: "Horários | VamoAgendar",
};

export default async function AvailabilityPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [workingHours, holidays, exceptions] = await Promise.all([
    workingHoursRepository.findByUserId(session.user.id),
    holidayRepository.findByUserId(session.user.id),
    exceptionRepository.findByUserId(session.user.id),
  ]);

  const blocks = workingHours.map((wh) => ({
    dayOfWeek: wh.dayOfWeek,
    startTime: wh.startTime,
    endTime: wh.endTime,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Horários</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Defina seus horários de atendimento semanais.
        </p>
      </div>

      <ScheduleEditor initialBlocks={blocks} />

      <hr className="border-zinc-800" />

      <HolidaysManager holidays={holidays} exceptions={exceptions} />
    </div>
  );
}
