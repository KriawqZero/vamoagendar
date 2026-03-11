"use server";

import { auth } from "@/lib/auth";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { userRepository } from "@/lib/repositories/user.repository";
import { getPlanLimits } from "@/lib/utils/plan";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const serviceSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  durationMinutes: z.coerce.number().min(5, "Duração mínima: 5 minutos").max(480, "Duração máxima: 8 horas"),
});

export type ServiceState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[]>;
};

export async function createServiceAction(
  _prevState: ServiceState,
  formData: FormData
): Promise<ServiceState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const parsed = serviceSchema.safeParse({
    name: formData.get("name"),
    durationMinutes: formData.get("durationMinutes"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const user = await userRepository.findById(session.user.id);
  if (!user) return { error: "Usuário não encontrado." };

  const limits = getPlanLimits(user.plan);
  const count = await serviceRepository.countByUserId(user.id);

  if (count >= limits.maxServices) {
    return {
      error: `Limite de ${limits.maxServices} serviços atingido. Faça upgrade para o plano Pro.`,
    };
  }

  await serviceRepository.create({
    userId: user.id,
    name: parsed.data.name,
    durationMinutes: parsed.data.durationMinutes,
  });

  revalidatePath("/dashboard/services");
  return { success: true };
}

export async function updateServiceAction(
  _prevState: ServiceState,
  formData: FormData
): Promise<ServiceState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autorizado." };

  const id = formData.get("id") as string;
  const service = await serviceRepository.findById(id);
  if (!service || service.userId !== session.user.id) {
    return { error: "Serviço não encontrado." };
  }

  const parsed = serviceSchema.safeParse({
    name: formData.get("name"),
    durationMinutes: formData.get("durationMinutes"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  await serviceRepository.update(id, {
    name: parsed.data.name,
    durationMinutes: parsed.data.durationMinutes,
  });

  revalidatePath("/dashboard/services");
  return { success: true };
}

export async function toggleServiceAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  const service = await serviceRepository.findById(id);
  if (!service || service.userId !== session.user.id) return;

  await serviceRepository.update(id, { active: !service.active });
  revalidatePath("/dashboard/services");
}

export async function deleteServiceAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  const service = await serviceRepository.findById(id);
  if (!service || service.userId !== session.user.id) return;

  await serviceRepository.delete(id);
  revalidatePath("/dashboard/services");
}
