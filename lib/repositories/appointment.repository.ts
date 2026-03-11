import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { startOfDay, endOfDay } from "date-fns";

export const appointmentRepository = {
  findByUserId(userId: string) {
    return prisma.appointment.findMany({
      where: { userId },
      include: { service: true },
      orderBy: { startTime: "asc" },
    });
  },

  findByUserIdAndDate(userId: string, date: Date) {
    return prisma.appointment.findMany({
      where: {
        userId,
        startTime: { gte: startOfDay(date), lte: endOfDay(date) },
        status: { not: "CANCELLED" },
      },
      include: { service: true },
      orderBy: { startTime: "asc" },
    });
  },

  findUpcoming(userId: string, from: Date = new Date()) {
    return prisma.appointment.findMany({
      where: {
        userId,
        startTime: { gte: from },
        status: "CONFIRMED",
      },
      include: { service: true },
      orderBy: { startTime: "asc" },
    });
  },

  findTodayAndUpcoming(userId: string) {
    const now = new Date();
    const todayStart = startOfDay(now);
    return prisma.appointment.findMany({
      where: {
        userId,
        startTime: { gte: todayStart },
        status: { not: "CANCELLED" },
      },
      include: { service: true },
      orderBy: { startTime: "asc" },
    });
  },

  findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
      include: { service: true },
    });
  },

  create(data: Prisma.AppointmentUncheckedCreateInput) {
    return prisma.appointment.create({ data, include: { service: true } });
  },

  updateStatus(id: string, status: "CONFIRMED" | "CANCELLED" | "COMPLETED") {
    return prisma.appointment.update({ where: { id }, data: { status } });
  },

  hasOverlap(userId: string, startTime: Date, endTime: Date, excludeId?: string) {
    return prisma.appointment
      .findFirst({
        where: {
          userId,
          status: { not: "CANCELLED" },
          id: excludeId ? { not: excludeId } : undefined,
          OR: [
            { startTime: { lt: endTime }, endTime: { gt: startTime } },
          ],
        },
      })
      .then(Boolean);
  },
};
