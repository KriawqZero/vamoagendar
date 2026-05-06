/**
 * Seed de desenvolvimento (idempotente)
 *
 * Como rodar:
 * - pnpm exec tsx prisma/seed.ts
 *
 * Usuários criados/atualizados por esta seed:
 * - PRO  -> email: dev.pro@vamoagendar.local | senha: dev123456
 * - FREE -> email: dev.free@vamoagendar.local | senha: dev123456
 *
 * Importante:
 * - Esta seed cria usuários com login real via Better Auth quando necessário.
 * - Se o usuário existir sem conta de credencial (legacy), ele é recriado.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "../lib/auth";
import {
  AppointmentStatus,
  ExceptionType,
  Plan,
  PrismaClient,
  SubscriptionStatus,
} from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não definido.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const seedUsers = {
  pro: {
    name: "Ana Studio",
    email: "dev.pro@vamoagendar.local",
    password: "dev123456",
    bookingCode: "devpro01",
    customSlug: "ana-studio",
    businessName: "Ana Studio Beauty",
    plan: Plan.PRO,
    accentColor: "#0EA5E9",
  },
  free: {
    name: "Carlos Barber",
    email: "dev.free@vamoagendar.local",
    password: "dev123456",
    bookingCode: "devfree1",
    customSlug: null,
    businessName: "Barbearia do Carlos",
    plan: Plan.FREE,
    accentColor: "#7C3AED",
  },
} as const;

type SeedRuntimeUsers = {
  pro: { id: string };
  free: { id: string };
};

const today = new Date();
const atTime = (baseDate: Date, hour: number, minute = 0) => {
  const date = new Date(baseDate);
  date.setHours(hour, minute, 0, 0);
  return date;
};

function nextWeekday(from: Date): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  d.setHours(0, 0, 0, 0);
  return d;
}

const nextBusinessDay = nextWeekday(today);
const dayAfterNextBusinessDay = new Date(nextBusinessDay);
dayAfterNextBusinessDay.setDate(dayAfterNextBusinessDay.getDate() + 1);
dayAfterNextBusinessDay.setHours(0, 0, 0, 0);

const fixedHoliday = new Date("2030-12-25T00:00:00.000Z");

async function ensureAuthUser(email: string, name: string, password: string): Promise<string> {
  const existing = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });

  const hasCredentialAccount = existing?.accounts.some((account) => account.providerId === "credential");

  if (!existing || !hasCredentialAccount) {
    if (existing && !hasCredentialAccount) {
      await prisma.user.delete({ where: { id: existing.id } });
    }

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    throw new Error(`Falha ao criar/encontrar usuário de auth: ${email}`);
  }

  return user.id;
}

async function ensureAuthUsers(): Promise<SeedRuntimeUsers> {
  const proId = await ensureAuthUser(seedUsers.pro.email, seedUsers.pro.name, seedUsers.pro.password);
  const freeId = await ensureAuthUser(seedUsers.free.email, seedUsers.free.name, seedUsers.free.password);

  return {
    pro: { id: proId },
    free: { id: freeId },
  };
}

async function upsertUserProfiles(users: SeedRuntimeUsers) {
  await prisma.user.update({
    where: { id: users.pro.id },
    data: {
      name: seedUsers.pro.name,
      bookingCode: seedUsers.pro.bookingCode,
      customSlug: seedUsers.pro.customSlug,
      businessName: seedUsers.pro.businessName,
      plan: seedUsers.pro.plan,
      accentColor: seedUsers.pro.accentColor,
      emailVerified: true,
    },
  });

  await prisma.user.update({
    where: { id: users.free.id },
    data: {
      name: seedUsers.free.name,
      bookingCode: seedUsers.free.bookingCode,
      customSlug: seedUsers.free.customSlug,
      businessName: seedUsers.free.businessName,
      plan: seedUsers.free.plan,
      accentColor: seedUsers.free.accentColor,
      emailVerified: true,
    },
  });
}

async function resetSeedDomainData(users: SeedRuntimeUsers) {
  const userIds = [users.pro.id, users.free.id];
  await prisma.appointment.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.availabilityException.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.holiday.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.workingHours.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.service.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.subscription.deleteMany({ where: { userId: { in: userIds } } });
}

async function seedProUserData(userId: string) {
  const services = await Promise.all([
    prisma.service.create({
      data: {
        id: "seed-pro-svc-corte",
        userId,
        name: "Corte Feminino",
        durationMinutes: 60,
      },
    }),
    prisma.service.create({
      data: {
        id: "seed-pro-svc-escova",
        userId,
        name: "Escova",
        durationMinutes: 45,
      },
    }),
    prisma.service.create({
      data: {
        id: "seed-pro-svc-coloracao",
        userId,
        name: "Coloração",
        durationMinutes: 120,
      },
    }),
  ]);

  const workingDays = [1, 2, 3, 4, 5];
  for (const dayOfWeek of workingDays) {
    await prisma.workingHours.createMany({
      data: [
        { userId, dayOfWeek, startTime: "09:00", endTime: "12:00" },
        { userId, dayOfWeek, startTime: "13:00", endTime: "18:00" },
      ],
    });
  }

  await prisma.availabilityException.createMany({
    data: [
      {
        id: "seed-pro-exc-unavailable",
        userId,
        date: nextBusinessDay,
        startTime: "14:00",
        endTime: "15:00",
        type: ExceptionType.UNAVAILABLE,
      },
      {
        id: "seed-pro-exc-override",
        userId,
        date: dayAfterNextBusinessDay,
        startTime: "10:00",
        endTime: "16:00",
        type: ExceptionType.OVERRIDE,
      },
    ],
  });

  await prisma.holiday.create({
    data: {
      id: "seed-pro-holiday-natal",
      userId,
      date: fixedHoliday,
      name: "Natal (Seed Dev)",
    },
  });

  await prisma.appointment.createMany({
    data: [
      {
        id: "seed-pro-apt-confirmed",
        userId,
        serviceId: services[0].id,
        clientName: "Cliente Exemplo 1",
        clientEmail: "cliente1@example.com",
        clientPhone: "+5511999990001",
        startTime: atTime(nextBusinessDay, 10, 0),
        endTime: atTime(nextBusinessDay, 11, 0),
        status: AppointmentStatus.CONFIRMED,
      },
      {
        id: "seed-pro-apt-completed",
        userId,
        serviceId: services[1].id,
        clientName: "Cliente Exemplo 2",
        clientEmail: "cliente2@example.com",
        clientPhone: "+5511999990002",
        startTime: atTime(today, 9, 0),
        endTime: atTime(today, 9, 45),
        status: AppointmentStatus.COMPLETED,
      },
      {
        id: "seed-pro-apt-cancelled",
        userId,
        serviceId: services[2].id,
        clientName: "Cliente Exemplo 3",
        startTime: atTime(nextBusinessDay, 15, 0),
        endTime: atTime(nextBusinessDay, 17, 0),
        status: AppointmentStatus.CANCELLED,
      },
    ],
  });

  await prisma.subscription.create({
    data: {
      id: "seed-pro-subscription",
      userId,
      plan: Plan.PRO,
      status: SubscriptionStatus.ACTIVE,
      mpSubscriptionId: "seed-mp-subscription-pro",
      mpCustomerId: "seed-mp-customer-pro",
      currentPeriodStart: today,
      currentPeriodEnd: new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30),
    },
  });
}

async function seedFreeUserData(userId: string) {
  await prisma.service.createMany({
    data: [
      {
        id: "seed-free-svc-corte",
        userId,
        name: "Corte Masculino",
        durationMinutes: 30,
      },
      {
        id: "seed-free-svc-barba",
        userId,
        name: "Barba",
        durationMinutes: 20,
      },
    ],
  });

  const workingDays = [1, 2, 3, 4, 5, 6];
  for (const dayOfWeek of workingDays) {
    await prisma.workingHours.create({
      data: {
        userId,
        dayOfWeek,
        startTime: "08:00",
        endTime: "12:00",
      },
    });
  }
}

async function main() {
  const users = await ensureAuthUsers();
  await upsertUserProfiles(users);
  await resetSeedDomainData(users);
  await seedProUserData(users.pro.id);
  await seedFreeUserData(users.free.id);

  console.log("Seed de desenvolvimento concluída.");
  console.log("Usuários seed:");
  console.log(`- PRO  : ${seedUsers.pro.email} | senha: ${seedUsers.pro.password} (id: ${users.pro.id})`);
  console.log(`- FREE : ${seedUsers.free.email} | senha: ${seedUsers.free.password} (id: ${users.free.id})`);
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
