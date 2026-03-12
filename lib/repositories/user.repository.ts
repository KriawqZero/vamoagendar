import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const userRepository = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findByBookingCode(bookingCode: string) {
    return prisma.user.findUnique({ where: { bookingCode } });
  },

  findByCustomSlug(customSlug: string) {
    return prisma.user.findUnique({ where: { customSlug } });
  },

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  },

  bookingCodeExists(bookingCode: string) {
    return prisma.user.findUnique({ where: { bookingCode }, select: { id: true } }).then(Boolean);
  },

  customSlugExists(customSlug: string) {
    return prisma.user.findUnique({ where: { customSlug }, select: { id: true } }).then(Boolean);
  },
};
