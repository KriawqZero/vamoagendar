import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const workingHoursRepository = {
  findByUserId(userId: string) {
    return prisma.workingHours.findMany({
      where: { userId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
  },

  findByUserIdAndDay(userId: string, dayOfWeek: number) {
    return prisma.workingHours.findMany({
      where: { userId, dayOfWeek },
      orderBy: { startTime: "asc" },
    });
  },

  create(data: Prisma.WorkingHoursUncheckedCreateInput) {
    return prisma.workingHours.create({ data });
  },

  deleteByUserId(userId: string) {
    return prisma.workingHours.deleteMany({ where: { userId } });
  },

  async replaceAll(userId: string, blocks: { dayOfWeek: number; startTime: string; endTime: string }[]) {
    return prisma.$transaction([
      prisma.workingHours.deleteMany({ where: { userId } }),
      ...blocks.map((block) =>
        prisma.workingHours.create({
          data: { userId, ...block },
        })
      ),
    ]);
  },
};
