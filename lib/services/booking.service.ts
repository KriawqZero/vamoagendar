import { appointmentRepository } from "@/lib/repositories/appointment.repository";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { getAvailableSlots } from "@/lib/services/slot.service";
import { combineDateAndTime } from "@/lib/utils/date";
import { addMinutes } from "date-fns";

interface BookingInput {
  userId: string;
  serviceId: string;
  date: Date;
  time: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
}

interface BookingResult {
  success: boolean;
  error?: string;
  appointmentId?: string;
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const { userId, serviceId, date, time, clientName, clientEmail, clientPhone } = input;

  // Validate service
  const service = await serviceRepository.findById(serviceId);
  if (!service || service.userId !== userId || !service.active) {
    return { success: false, error: "Serviço não encontrado ou indisponível." };
  }

  // Validate slot is available
  const availableSlots = await getAvailableSlots(userId, serviceId, date);
  if (!availableSlots.includes(time)) {
    return { success: false, error: "Horário não disponível. Por favor, escolha outro." };
  }

  // Calculate start and end times
  const startTime = combineDateAndTime(date, time);
  const endTime = addMinutes(startTime, service.durationMinutes);

  // Double-check for overlaps
  const hasOverlap = await appointmentRepository.hasOverlap(userId, startTime, endTime);
  if (hasOverlap) {
    return { success: false, error: "Horário já reservado. Por favor, escolha outro." };
  }

  // Prevent booking in the past
  if (startTime < new Date()) {
    return { success: false, error: "Não é possível agendar no passado." };
  }

  // Create appointment
  const appointment = await appointmentRepository.create({
    userId,
    serviceId,
    clientName,
    clientEmail: clientEmail || null,
    clientPhone: clientPhone || null,
    startTime,
    endTime,
  });

  return { success: true, appointmentId: appointment.id };
}
