import { Plan } from "@/generated/prisma/client";

export const PLAN_LIMITS = {
  [Plan.FREE]: {
    maxServices: 2,
    canCustomSlug: false,
    canCustomize: false,
    canCustomizeLogo: false,
    whatsappReminders: false,
    price: 0,
    label: "Gratuito",
  },
  [Plan.PRO]: {
    maxServices: Infinity,
    canCustomSlug: true,
    canCustomize: true,
    canCustomizeLogo: true,
    whatsappReminders: true,
    price: 9.9,
    label: "Pro",
  },
} as const;

export function getPlanLimits(plan: Plan) {
  return PLAN_LIMITS[plan];
}

export function getPlanLabel(plan: Plan): string {
  return PLAN_LIMITS[plan].label;
}

export function getPlanPrice(plan: Plan): number {
  return PLAN_LIMITS[plan].price;
}
