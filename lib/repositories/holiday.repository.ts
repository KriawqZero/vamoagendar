import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const holidayRepository = {
  findByUserId(userId: string) {
    return prisma.holiday.findMany({
      where: { userId },
      orderBy: { date: "asc" },
    });
  },

  findByUserIdAndDate(userId: string, date: Date) {
    return prisma.holiday.findFirst({
      where: { userId, date },
    });
  },

  create(data: Prisma.HolidayUncheckedCreateInput) {
    return prisma.holiday.create({ data });
  },

  delete(id: string) {
    return prisma.holiday.delete({ where: { id } });
  },
};
