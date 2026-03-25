import { createClient } from "@/utils/supabase/server";
import { Holiday } from "@/types/models";

function mapHolidayDates(row: any): Holiday {
  if (!row) return row;
  return {
    ...row,
    date: row.date ? new Date(row.date) : new Date(),
  };
}

export const holidayRepository = {
  async findByUserId(userId: string): Promise<Holiday[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("Holiday").select("*").eq("userId", userId).order("date", { ascending: true });
    return (data || []).map(mapHolidayDates);
  },

  async findByUserIdAndDate(userId: string, date: Date): Promise<Holiday | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("Holiday")
      .select("*")
      .eq("userId", userId)
      .eq("date", date.toISOString().split("T")[0])
      .maybeSingle();
    return data ? mapHolidayDates(data) : null;
  },

  async create(data: any): Promise<Holiday> {
    const supabase = await createClient();
    const { data: inserted, error } = await supabase.from("Holiday").insert(data).select().single();
    if (error) throw new Error(error.message);
    return mapHolidayDates(inserted);
  },

  async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("Holiday").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
