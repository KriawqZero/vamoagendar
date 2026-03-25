import { createClient } from "@/utils/supabase/server";
import { User, Plan } from "@/types/models";

function mapUserDates(row: any): User {
  if (!row) return row;
  return {
    ...row,
    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
    updatedAt: row.updatedAt ? new Date(row.updatedAt) : new Date(),
    slugChangedAt: row.slugChangedAt ? new Date(row.slugChangedAt) : null,
  };
}

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("User").select("*").eq("id", id).maybeSingle();
    return data ? mapUserDates(data) : null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("User").select("*").eq("email", email).maybeSingle();
    return data ? mapUserDates(data) : null;
  },

  async findByBookingCode(bookingCode: string): Promise<User | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("User").select("*").eq("bookingCode", bookingCode).maybeSingle();
    return data ? mapUserDates(data) : null;
  },

  async findByCustomSlug(customSlug: string): Promise<User | null> {
    const supabase = await createClient();
    const { data } = await supabase.from("User").select("*").eq("customSlug", customSlug).maybeSingle();
    return data ? mapUserDates(data) : null;
  },

  async create(data: any): Promise<User> {
    const supabase = await createClient();
    const { data: newUser, error } = await supabase.from("User").insert(data).select().single();
    if (error) throw new Error(error.message);
    return mapUserDates(newUser);
  },

  async update(id: string, data: any): Promise<User> {
    const supabase = await createClient();
    const { data: updated, error } = await supabase.from("User").update(data).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return mapUserDates(updated);
  },

  async existsByBookingCode(bookingCode: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase.from("User").select("id").eq("bookingCode", bookingCode).maybeSingle();
    return !!data;
  },

  async existsByCustomSlug(customSlug: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase.from("User").select("id").eq("customSlug", customSlug).maybeSingle();
    return !!data;
  },
};
