import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const serviceRepository = {
  findByUserId(userId: string) {
    return prisma.service.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  },

  findActiveByUserId(userId: string) {
    return prisma.service.findMany({
      where: { userId, active: true },
      orderBy: { createdAt: "asc" },
    });
  },

  findById(id: string) {
    return prisma.service.findUnique({ where: { id } });
  },

  countByUserId(userId: string) {
    return prisma.service.count({ where: { userId } });
  },

  create(data: Prisma.ServiceUncheckedCreateInput) {
    return prisma.service.create({ data });
  },

  update(id: string, data: Prisma.ServiceUncheckedUpdateInput) {
    return prisma.service.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.service.delete({ where: { id } });
  },
};
