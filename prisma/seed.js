"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
require("dotenv/config");
var adapter_pg_1 = require("@prisma/adapter-pg");
var auth_1 = require("../lib/auth");
var client_1 = require("../generated/prisma/client");
var connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL não definido.");
}
var prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({ connectionString: connectionString }),
});
var seedUsers = {
    pro: {
        name: "Ana Studio",
        email: "dev.pro@vamoagendar.local",
        password: "dev123456",
        bookingCode: "devpro01",
        customSlug: "ana-studio",
        businessName: "Ana Studio Beauty",
        plan: client_1.Plan.PRO,
        accentColor: "#0EA5E9",
    },
    free: {
        name: "Carlos Barber",
        email: "dev.free@vamoagendar.local",
        password: "dev123456",
        bookingCode: "devfree1",
        customSlug: null,
        businessName: "Barbearia do Carlos",
        plan: client_1.Plan.FREE,
        accentColor: "#7C3AED",
    },
};
var today = new Date();
var atTime = function (baseDate, hour, minute) {
    if (minute === void 0) { minute = 0; }
    var date = new Date(baseDate);
    date.setHours(hour, minute, 0, 0);
    return date;
};
function nextWeekday(from) {
    var d = new Date(from);
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) {
        d.setDate(d.getDate() + 1);
    }
    d.setHours(0, 0, 0, 0);
    return d;
}
var nextBusinessDay = nextWeekday(today);
var dayAfterNextBusinessDay = new Date(nextBusinessDay);
dayAfterNextBusinessDay.setDate(dayAfterNextBusinessDay.getDate() + 1);
dayAfterNextBusinessDay.setHours(0, 0, 0, 0);
var fixedHoliday = new Date("2030-12-25T00:00:00.000Z");
function ensureAuthUser(email, name, password) {
    return __awaiter(this, void 0, void 0, function () {
        var existing, hasCredentialAccount, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email },
                        include: { accounts: true },
                    })];
                case 1:
                    existing = _a.sent();
                    hasCredentialAccount = existing === null || existing === void 0 ? void 0 : existing.accounts.some(function (account) { return account.providerId === "credential"; });
                    if (!(!existing || !hasCredentialAccount)) return [3 /*break*/, 5];
                    if (!(existing && !hasCredentialAccount)) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.user.delete({ where: { id: existing.id } })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, auth_1.auth.api.signUpEmail({
                        body: {
                            name: name,
                            email: email,
                            password: password,
                        },
                    })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email },
                        select: { id: true },
                    })];
                case 6:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("Falha ao criar/encontrar usu\u00E1rio de auth: ".concat(email));
                    }
                    return [2 /*return*/, user.id];
            }
        });
    });
}
function ensureAuthUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var proId, freeId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ensureAuthUser(seedUsers.pro.email, seedUsers.pro.name, seedUsers.pro.password)];
                case 1:
                    proId = _a.sent();
                    return [4 /*yield*/, ensureAuthUser(seedUsers.free.email, seedUsers.free.name, seedUsers.free.password)];
                case 2:
                    freeId = _a.sent();
                    return [2 /*return*/, {
                            pro: { id: proId },
                            free: { id: freeId },
                        }];
            }
        });
    });
}
function upsertUserProfiles(users) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.update({
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
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.update({
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
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function resetSeedDomainData(users) {
    return __awaiter(this, void 0, void 0, function () {
        var userIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userIds = [users.pro.id, users.free.id];
                    return [4 /*yield*/, prisma.appointment.deleteMany({ where: { userId: { in: userIds } } })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.availabilityException.deleteMany({ where: { userId: { in: userIds } } })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.holiday.deleteMany({ where: { userId: { in: userIds } } })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.workingHours.deleteMany({ where: { userId: { in: userIds } } })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.service.deleteMany({ where: { userId: { in: userIds } } })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.subscription.deleteMany({ where: { userId: { in: userIds } } })];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function seedProUserData(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var services, workingDays, _i, workingDays_1, dayOfWeek;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        prisma.service.create({
                            data: {
                                id: "seed-pro-svc-corte",
                                userId: userId,
                                name: "Corte Feminino",
                                durationMinutes: 60,
                            },
                        }),
                        prisma.service.create({
                            data: {
                                id: "seed-pro-svc-escova",
                                userId: userId,
                                name: "Escova",
                                durationMinutes: 45,
                            },
                        }),
                        prisma.service.create({
                            data: {
                                id: "seed-pro-svc-coloracao",
                                userId: userId,
                                name: "Coloração",
                                durationMinutes: 120,
                            },
                        }),
                    ])];
                case 1:
                    services = _a.sent();
                    workingDays = [1, 2, 3, 4, 5];
                    _i = 0, workingDays_1 = workingDays;
                    _a.label = 2;
                case 2:
                    if (!(_i < workingDays_1.length)) return [3 /*break*/, 5];
                    dayOfWeek = workingDays_1[_i];
                    return [4 /*yield*/, prisma.workingHours.createMany({
                            data: [
                                { userId: userId, dayOfWeek: dayOfWeek, startTime: "09:00", endTime: "12:00" },
                                { userId: userId, dayOfWeek: dayOfWeek, startTime: "13:00", endTime: "18:00" },
                            ],
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, prisma.availabilityException.createMany({
                        data: [
                            {
                                id: "seed-pro-exc-unavailable",
                                userId: userId,
                                date: nextBusinessDay,
                                startTime: "14:00",
                                endTime: "15:00",
                                type: client_1.ExceptionType.UNAVAILABLE,
                            },
                            {
                                id: "seed-pro-exc-override",
                                userId: userId,
                                date: dayAfterNextBusinessDay,
                                startTime: "10:00",
                                endTime: "16:00",
                                type: client_1.ExceptionType.OVERRIDE,
                            },
                        ],
                    })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.holiday.create({
                            data: {
                                id: "seed-pro-holiday-natal",
                                userId: userId,
                                date: fixedHoliday,
                                name: "Natal (Seed Dev)",
                            },
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.appointment.createMany({
                            data: [
                                {
                                    id: "seed-pro-apt-confirmed",
                                    userId: userId,
                                    serviceId: services[0].id,
                                    clientName: "Cliente Exemplo 1",
                                    clientEmail: "cliente1@example.com",
                                    clientPhone: "+5511999990001",
                                    startTime: atTime(nextBusinessDay, 10, 0),
                                    endTime: atTime(nextBusinessDay, 11, 0),
                                    status: client_1.AppointmentStatus.CONFIRMED,
                                },
                                {
                                    id: "seed-pro-apt-completed",
                                    userId: userId,
                                    serviceId: services[1].id,
                                    clientName: "Cliente Exemplo 2",
                                    clientEmail: "cliente2@example.com",
                                    clientPhone: "+5511999990002",
                                    startTime: atTime(today, 9, 0),
                                    endTime: atTime(today, 9, 45),
                                    status: client_1.AppointmentStatus.COMPLETED,
                                },
                                {
                                    id: "seed-pro-apt-cancelled",
                                    userId: userId,
                                    serviceId: services[2].id,
                                    clientName: "Cliente Exemplo 3",
                                    startTime: atTime(nextBusinessDay, 15, 0),
                                    endTime: atTime(nextBusinessDay, 17, 0),
                                    status: client_1.AppointmentStatus.CANCELLED,
                                },
                            ],
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.subscription.create({
                            data: {
                                id: "seed-pro-subscription",
                                userId: userId,
                                plan: client_1.Plan.PRO,
                                status: client_1.SubscriptionStatus.ACTIVE,
                                mpSubscriptionId: "seed-mp-subscription-pro",
                                mpCustomerId: "seed-mp-customer-pro",
                                currentPeriodStart: today,
                                currentPeriodEnd: new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30),
                            },
                        })];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function seedFreeUserData(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var workingDays, _i, workingDays_2, dayOfWeek;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.service.createMany({
                        data: [
                            {
                                id: "seed-free-svc-corte",
                                userId: userId,
                                name: "Corte Masculino",
                                durationMinutes: 30,
                            },
                            {
                                id: "seed-free-svc-barba",
                                userId: userId,
                                name: "Barba",
                                durationMinutes: 20,
                            },
                        ],
                    })];
                case 1:
                    _a.sent();
                    workingDays = [1, 2, 3, 4, 5, 6];
                    _i = 0, workingDays_2 = workingDays;
                    _a.label = 2;
                case 2:
                    if (!(_i < workingDays_2.length)) return [3 /*break*/, 5];
                    dayOfWeek = workingDays_2[_i];
                    return [4 /*yield*/, prisma.workingHours.create({
                            data: {
                                userId: userId,
                                dayOfWeek: dayOfWeek,
                                startTime: "08:00",
                                endTime: "12:00",
                            },
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ensureAuthUsers()];
                case 1:
                    users = _a.sent();
                    return [4 /*yield*/, upsertUserProfiles(users)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, resetSeedDomainData(users)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, seedProUserData(users.pro.id)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, seedFreeUserData(users.free.id)];
                case 5:
                    _a.sent();
                    console.log("Seed de desenvolvimento concluída.");
                    console.log("Usuários seed:");
                    console.log("- PRO  : ".concat(seedUsers.pro.email, " | senha: ").concat(seedUsers.pro.password, " (id: ").concat(users.pro.id, ")"));
                    console.log("- FREE : ".concat(seedUsers.free.email, " | senha: ").concat(seedUsers.free.password, " (id: ").concat(users.free.id, ")"));
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (error) {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
