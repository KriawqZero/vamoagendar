import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const userRepository = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findBySlug(slug: string) {
    return prisma.user.findUnique({ where: { slug } });
  },

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  },

  slugExists(slug: string) {
    return prisma.user.findUnique({ where: { slug }, select: { id: true } }).then(Boolean);
  },
};
