"use server";

import { createBooking } from "@/lib/services/booking.service";
import { getAvailableSlots } from "@/lib/services/slot.service";
import { sendBookingConfirmation } from "@/lib/services/notification.service";
import { userRepository } from "@/lib/repositories/user.repository";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { appointmentRepository } from "@/lib/repositories/appointment.repository";
import { formatDateBR, formatTimeBR } from "@/lib/utils/date";
import { z } from "zod";

const bookingSchema = z.object({
  userId: z.string().min(1),
  serviceId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  clientName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  clientEmail: z.string().email("Email inválido").optional().or(z.literal("")),
  clientPhone: z.string().optional().or(z.literal("")),
});

export type BookingState = {
  error?: string;
  success?: boolean;
  appointmentId?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitBookingAction(
  _prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  const raw = {
    userId: formData.get("userId") as string,
    serviceId: formData.get("serviceId") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    clientName: formData.get("clientName") as string,
    clientEmail: formData.get("clientEmail") as string,
    clientPhone: formData.get("clientPhone") as string,
  };

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { userId, serviceId, date, time, clientName, clientEmail, clientPhone } = parsed.data;

  const result = await createBooking({
    userId,
    serviceId,
    date: new Date(date),
    time,
    clientName,
    clientEmail: clientEmail || undefined,
    clientPhone: clientPhone || undefined,
  });

  if (!result.success) {
    return { error: result.error };
  }

  // Send notification in background
  try {
    const [user, service] = await Promise.all([
      userRepository.findById(userId),
      serviceRepository.findById(serviceId),
    ]);

    if (user && service) {
      const appointment = await appointmentRepository.findById(result.appointmentId!);
      if (appointment) {
        await sendBookingConfirmation({
          clientName,
          clientEmail: clientEmail || null,
          clientPhone: clientPhone || null,
          serviceName: service.name,
          date: formatDateBR(appointment.startTime),
          time: formatTimeBR(appointment.startTime),
          professionalName: user.businessName || user.name,
        });
      }
    }
  } catch (err) {
    console.error("Notification error:", err);
  }

  return { success: true, appointmentId: result.appointmentId };
}

export async function fetchSlotsAction(
  userId: string,
  serviceId: string,
  date: string
): Promise<string[]> {
  return getAvailableSlots(userId, serviceId, new Date(date));
}
