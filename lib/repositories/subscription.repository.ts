import { createClient } from "@/utils/supabase/server";
import { Subscription, SubscriptionStatus } from "@/types/models";

function mapSubscriptionDates(row: any): Subscription {
  if (!row) return row;
  return {
    ...row,
    currentPeriodStart: row.currentPeriodStart ? new Date(row.currentPeriodStart) : null,
    currentPeriodEnd: row.currentPeriodEnd ? new Date(row.currentPeriodEnd) : null,
    canceledAt: row.canceledAt ? new Date(row.canceledAt) : null,
    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
    updatedAt: row.updatedAt ? new Date(row.updatedAt) : new Date(),
  };
}

export const subscriptionRepository = {
  async findByUserId(userId: string): Promise<Subscription | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("Subscription").select("*").eq("userId", userId).maybeSingle();
    return data ? mapSubscriptionDates(data) : null;
  },

  async findByMpSubscriptionId(mpSubscriptionId: string): Promise<Subscription | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("Subscription").select("*").eq("mpSubscriptionId", mpSubscriptionId).maybeSingle();
    return data ? mapSubscriptionDates(data) : null;
  },

  async create(data: any): Promise<Subscription> {
    const supabase = await createClient();
    const { data: inserted, error } = await supabase.from("Subscription").insert(data).select().single();
    if (error) throw new Error(error.message);
    return mapSubscriptionDates(inserted);
  },

  async update(id: string, data: any): Promise<Subscription> {
    const supabase = await createClient();
    const { data: updated, error } = await supabase.from("Subscription").update(data).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return mapSubscriptionDates(updated);
  },

  async updateByUserId(userId: string, data: any): Promise<Subscription> {
    const supabase = await createClient();
    const { data: updated, error } = await supabase.from("Subscription").update(data).eq("userId", userId).select().single();
    if (error) throw new Error(error.message);
    return mapSubscriptionDates(updated);
  },

  async updateStatus(id: string, status: SubscriptionStatus): Promise<Subscription> {
    const supabase = await createClient();
    const { data: updated, error } = await supabase.from("Subscription").update({ status }).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return mapSubscriptionDates(updated);
  },
};
