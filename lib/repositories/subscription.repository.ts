import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const subscriptionRepository = {
  findByUserId(userId: string) {
    return prisma.subscription.findUnique({ where: { userId } });
  },

  findByMpSubscriptionId(mpSubscriptionId: string) {
    return prisma.subscription.findUnique({ where: { mpSubscriptionId } });
  },

  create(data: Prisma.SubscriptionCreateInput) {
    return prisma.subscription.create({ data });
  },

  update(id: string, data: Prisma.SubscriptionUpdateInput) {
    return prisma.subscription.update({ where: { id }, data });
  },

  updateByUserId(userId: string, data: Prisma.SubscriptionUpdateInput) {
    return prisma.subscription.update({ where: { userId }, data });
  },

  updateStatus(id: string, status: Prisma.SubscriptionUpdateInput["status"]) {
    return prisma.subscription.update({ where: { id }, data: { status } });
  },
};
