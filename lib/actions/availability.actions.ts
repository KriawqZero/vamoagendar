"use server";

import { auth } from "@/lib/auth";
import { workingHoursRepository } from "@/lib/repositories/working-hours.repository";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const timeBlockSchema = z.object({
  dayOfWeek: z.coerce.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido"),
});

const scheduleSchema = z.array(timeBlockSchema);

export type AvailabilityState = {
  error?: string;
  success?: boolean;
};

export async function saveScheduleAction(
  _prevState: AvailabilityState,
  formData: FormData
): Promise<AvailabilityState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const raw = formData.get("schedule") as string;
  let blocks: { dayOfWeek: number; startTime: string; endTime: string }[];

  try {
    blocks = JSON.parse(raw);
  } catch {
    return { error: "Dados inválidos." };
  }

  const parsed = scheduleSchema.safeParse(blocks);
  if (!parsed.success) {
    return { error: "Dados de horário inválidos." };
  }

  // Validate each block: startTime < endTime
  for (const block of parsed.data) {
    if (block.startTime >= block.endTime) {
      return { error: "Horário de início deve ser antes do fim." };
    }
  }

  await workingHoursRepository.replaceAll(session.user.id, parsed.data);

  revalidatePath("/dashboard/availability");
  return { success: true };
}
