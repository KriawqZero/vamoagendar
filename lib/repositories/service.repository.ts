import { createClient } from "@/utils/supabase/server";
import { Service } from "@/types/models";

function mapServiceDates(row: any): Service {
  if (!row) return row;
  return {
    ...row,
    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
  };
}

export const serviceRepository = {
  async findByUserId(userId: string): Promise<Service[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("Service").select("*").eq("userId", userId).order("createdAt", { ascending: true });
    return (data || []).map(mapServiceDates);
  },

  async findActiveByUserId(userId: string): Promise<Service[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("Service").select("*").eq("userId", userId).eq("active", true).order("createdAt", { ascending: true });
    return (data || []).map(mapServiceDates);
  },

  async findById(id: string): Promise<Service | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("Service").select("*").eq("id", id).maybeSingle();
    return data ? mapServiceDates(data) : null;
  },

  async countByUserId(userId: string): Promise<number> {
    const supabase = await createClient();
    const { count } = await supabase.from("Service").select("*", { count: "exact", head: true }).eq("userId", userId);
    return count || 0;
  },

  async create(data: any): Promise<Service> {
    const supabase = await createClient();
    const { data: inserted, error } = await supabase.from("Service").insert(data).select().single();
    if (error) throw new Error(error.message);
    return mapServiceDates(inserted);
  },

  async update(id: string, data: any): Promise<Service> {
    const supabase = await createClient();
    const { data: updated, error } = await supabase.from("Service").update(data).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return mapServiceDates(updated);
  },

  async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("Service").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
