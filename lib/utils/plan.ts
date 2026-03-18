import { Plan } from "@/generated/prisma/client";

export const PLAN_LIMITS = {
  [Plan.FREE]: {
    maxServices: 2,
    canCustomSlug: false,
    canCustomize: false,
    canCustomizeLogo: false,
    whatsappReminders: false,
    googleCalendar: false,
    priceMonthly: 0,
    priceAnnual: 0,
    compareAtMonthly: null,
    compareAtAnnual: null,
    label: "Gratuito",
  },
  [Plan.PLUS]: {
    maxServices: Infinity,
    canCustomSlug: true,
    canCustomize: true,
    canCustomizeLogo: false,
    whatsappReminders: false,
    googleCalendar: false,
    priceMonthly: 9.9,
    priceAnnual: 99.9,
    compareAtMonthly: 19.9,
    compareAtAnnual: null,
    label: "Plus",
  },
  [Plan.PRO]: {
    maxServices: Infinity,
    canCustomSlug: true,
    canCustomize: true,
    canCustomizeLogo: true,
    whatsappReminders: true,
    googleCalendar: true,
    priceMonthly: 14.9,
    priceAnnual: 149.9,
    compareAtMonthly: 29.9,
    compareAtAnnual: null,
    label: "Pro",
  },
} as const;

export function getPlanLimits(plan: Plan) {
  return PLAN_LIMITS[plan];
}

export function getPlanLabel(plan: Plan): string {
  return PLAN_LIMITS[plan].label;
}

export function getPlanPriceMonthly(plan: Plan): number {
  return PLAN_LIMITS[plan].priceMonthly;
}

export function getPlanPriceAnnual(plan: Plan): number {
  return PLAN_LIMITS[plan].priceAnnual;
}

export function getPlanCompareAtMonthly(plan: Plan): number | null {
  return PLAN_LIMITS[plan].compareAtMonthly;
}

export function getPlanCompareAtAnnual(plan: Plan): number | null {
  return PLAN_LIMITS[plan].compareAtAnnual;
}
