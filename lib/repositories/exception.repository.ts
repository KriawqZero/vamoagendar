import { createClient } from "@/utils/supabase/server";
import { AvailabilityException } from "@/types/models";

function mapExceptionDates(row: any): AvailabilityException {
  if (!row) return row;
  return {
    ...row,
    date: row.date ? new Date(row.date) : new Date(),
  };
}

export const exceptionRepository = {
  async findByUserId(userId: string): Promise<AvailabilityException[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("AvailabilityException").select("*").eq("userId", userId).order("date", { ascending: true });
    return (data || []).map(mapExceptionDates);
  },

  async findByUserIdAndDate(userId: string, date: Date): Promise<AvailabilityException[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("AvailabilityException")
      .select("*")
      .eq("userId", userId)
      .eq("date", date.toISOString().split("T")[0]);
    return (data || []).map(mapExceptionDates);
  },

  async create(data: any): Promise<AvailabilityException> {
    const supabase = await createClient();
    const { data: inserted, error } = await supabase.from("AvailabilityException").insert(data).select().single();
    if (error) throw new Error(error.message);
    return mapExceptionDates(inserted);
  },

  async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("AvailabilityException").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
