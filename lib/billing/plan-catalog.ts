export const PLUS_MONTHLY_PLAN_ID = "vamoagendar-plus-monthly";
export const PLUS_ANNUAL_PLAN_ID = "vamoagendar-plus-annual";
export const PRO_MONTHLY_PLAN_ID = "vamoagendar-pro-monthly";
export const PRO_ANNUAL_PLAN_ID = "vamoagendar-pro-annual";

export type BillingCycle = "monthly" | "annual";

export type PaidPlanCode = "PLUS" | "PRO";

export function resolvePlanFromPlanId(planId: string): { plan: PaidPlanCode; cycle: BillingCycle } | null {
  switch (planId) {
    case PLUS_MONTHLY_PLAN_ID:
      return { plan: "PLUS", cycle: "monthly" };
    case PLUS_ANNUAL_PLAN_ID:
      return { plan: "PLUS", cycle: "annual" };
    case PRO_MONTHLY_PLAN_ID:
      return { plan: "PRO", cycle: "monthly" };
    case PRO_ANNUAL_PLAN_ID:
      return { plan: "PRO", cycle: "annual" };
    default:
      return null;
  }
}

