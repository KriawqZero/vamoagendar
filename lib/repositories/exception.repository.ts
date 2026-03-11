import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const exceptionRepository = {
  findByUserId(userId: string) {
    return prisma.availabilityException.findMany({
      where: { userId },
      orderBy: { date: "asc" },
    });
  },

  findByUserIdAndDate(userId: string, date: Date) {
    return prisma.availabilityException.findMany({
      where: { userId, date },
    });
  },

  create(data: Prisma.AvailabilityExceptionUncheckedCreateInput) {
    return prisma.availabilityException.create({ data });
  },

  delete(id: string) {
    return prisma.availabilityException.delete({ where: { id } });
  },
};
