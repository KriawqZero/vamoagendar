import { createClient } from "@/utils/supabase/server";
import { WorkingHours } from "@/types/models";

function mapWorkingHoursDates(row: any): WorkingHours {
  return row as WorkingHours;
}

export const workingHoursRepository = {
  async findByUserId(userId: string): Promise<WorkingHours[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("WorkingHours")
      .select("*")
      .eq("userId", userId)
      .order("dayOfWeek", { ascending: true })
      .order("startTime", { ascending: true });
    return (data || []).map(mapWorkingHoursDates);
  },

  async findByUserIdAndDay(userId: string, dayOfWeek: number): Promise<WorkingHours[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("WorkingHours")
      .select("*")
      .eq("userId", userId)
      .eq("dayOfWeek", dayOfWeek)
      .order("startTime", { ascending: true });
    return (data || []).map(mapWorkingHoursDates);
  },

  async create(data: any): Promise<WorkingHours> {
    const supabase = await createClient();
    const { data: inserted, error } = await supabase.from("WorkingHours").insert(data).select().single();
    if (error) throw new Error(error.message);
    return mapWorkingHoursDates(inserted);
  },

  async deleteByUserId(userId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("WorkingHours").delete().eq("userId", userId);
    if (error) throw new Error(error.message);
  },

  async replaceAll(userId: string, blocks: { dayOfWeek: number; startTime: string; endTime: string }[]): Promise<void> {
    const supabase = await createClient();
    
    // First delete all
    const { error: deleteError } = await supabase.from("WorkingHours").delete().eq("userId", userId);
    if (deleteError) throw new Error(deleteError.message);
    
    if (blocks.length > 0) {
      const { error: insertError } = await supabase.from("WorkingHours").insert(
        blocks.map(block => ({ userId, ...block }))
      );
      if (insertError) throw new Error(insertError.message);
    }
  },
};
