"use server";

import { auth } from "@/lib/auth";
import { holidayRepository } from "@/lib/repositories/holiday.repository";
import { exceptionRepository } from "@/lib/repositories/exception.repository";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const holidaySchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  name: z.string().min(1, "Nome é obrigatório"),
});

const exceptionSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  type: z.enum(["UNAVAILABLE", "OVERRIDE"]),
});

export type HolidayState = {
  error?: string;
  success?: boolean;
};

export async function createHolidayAction(
  _prevState: HolidayState,
  formData: FormData
): Promise<HolidayState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const parsed = holidaySchema.safeParse({
    date: formData.get("date"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return { error: "Dados inválidos." };
  }

  await holidayRepository.create({
    userId: session.user.id,
    date: new Date(parsed.data.date),
    name: parsed.data.name,
  });

  revalidatePath("/dashboard/availability");
  return { success: true };
}

export async function deleteHolidayAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) return;
  await holidayRepository.delete(id);
  revalidatePath("/dashboard/availability");
}

export async function createExceptionAction(
  _prevState: HolidayState,
  formData: FormData
): Promise<HolidayState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const parsed = exceptionSchema.safeParse({
    date: formData.get("date"),
    startTime: formData.get("startTime") || undefined,
    endTime: formData.get("endTime") || undefined,
    type: formData.get("type"),
  });

  if (!parsed.success) {
    return { error: "Dados inválidos." };
  }

  await exceptionRepository.create({
    userId: session.user.id,
    date: new Date(parsed.data.date),
    startTime: parsed.data.startTime || null,
    endTime: parsed.data.endTime || null,
    type: parsed.data.type,
  });

  revalidatePath("/dashboard/availability");
  return { success: true };
}

export async function deleteExceptionAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) return;
  await exceptionRepository.delete(id);
  revalidatePath("/dashboard/availability");
}
