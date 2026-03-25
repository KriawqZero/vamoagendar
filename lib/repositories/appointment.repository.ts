import { createClient } from "@/utils/supabase/server";
import { Appointment } from "@/types/models";
import { startOfDay, endOfDay } from "date-fns";

function mapAppointmentDates(row: any): Appointment {
  if (!row) return row;
  return {
    ...row,
    startTime: row.startTime ? new Date(row.startTime) : new Date(),
    endTime: row.endTime ? new Date(row.endTime) : new Date(),
    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
    service: row.Service ? {
      ...row.Service,
      createdAt: row.Service.createdAt ? new Date(row.Service.createdAt) : new Date(),
    } : undefined
  };
}

export const appointmentRepository = {
  async findByUserId(userId: string): Promise<Appointment[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("Appointment").select("*, Service(*)").eq("userId", userId).order("startTime", { ascending: true });
    return (data || []).map(mapAppointmentDates);
  },

  async findByUserIdAndDate(userId: string, date: Date): Promise<Appointment[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("Appointment")
      .select("*, Service(*)")
      .eq("userId", userId)
      .gte("startTime", startOfDay(date).toISOString())
      .lte("startTime", endOfDay(date).toISOString())
      .neq("status", "CANCELLED")
      .order("startTime", { ascending: true });
    return (data || []).map(mapAppointmentDates);
  },

  async findUpcoming(userId: string, from: Date = new Date()): Promise<Appointment[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("Appointment")
      .select("*, Service(*)")
      .eq("userId", userId)
      .gte("startTime", from.toISOString())
      .eq("status", "CONFIRMED")
      .order("startTime", { ascending: true });
    return (data || []).map(mapAppointmentDates);
  },

  async findTodayAndUpcoming(userId: string): Promise<Appointment[]> {
    const now = new Date();
    const todayStart = startOfDay(now);
    const supabase = await createClient();
    const { data } = await supabase.from("Appointment")
      .select("*, Service(*)")
      .eq("userId", userId)
      .gte("startTime", todayStart.toISOString())
      .neq("status", "CANCELLED")
      .order("startTime", { ascending: true });
    return (data || []).map(mapAppointmentDates);
  },

  async findById(id: string): Promise<Appointment | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("Appointment")
      .select("*, Service(*)")
      .eq("id", id)
      .maybeSingle();
    return data ? mapAppointmentDates(data) : null;
  },

  async create(data: any): Promise<Appointment> {
    const supabase = await createClient();
    const { data: inserted, error } = await supabase.from("Appointment").insert(data).select("*, Service(*)").single();
    if (error) throw new Error(error.message);
    return mapAppointmentDates(inserted);
  },

  async updateStatus(id: string, status: "CONFIRMED" | "CANCELLED" | "COMPLETED"): Promise<Appointment> {
    const supabase = await createClient();
    const { data: updated, error } = await supabase.from("Appointment").update({ status }).eq("id", id).select("*, Service(*)").single();
    if (error) throw new Error(error.message);
    return mapAppointmentDates(updated);
  },

  async hasOverlap(userId: string, startTime: Date, endTime: Date, excludeId?: string): Promise<boolean> {
    const supabase = await createClient();
    let query = supabase.from("Appointment")
      .select("id")
      .eq("userId", userId)
      .neq("status", "CANCELLED")
      .lt("startTime", endTime.toISOString())
      .gt("endTime", startTime.toISOString());
      
    if (excludeId) {
      query = query.neq("id", excludeId);
    }
    
    const { data } = await query.limit(1).maybeSingle();
    return !!data;
  },
};
