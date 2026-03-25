import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";

const BUCKET = "logos";

/**
 * Upload a logo file to Supabase Storage
 */
export async function uploadLogo(
  userId: string,
  file: Buffer,
  contentType: string
): Promise<string> {
  const timestamp = Date.now();
  const randomId = nanoid(8);
  const ext = contentType.split("/")[1] || "png";
  const key = `${userId}/${timestamp}-${randomId}.${ext}`;

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(key, file, { contentType, upsert: true });

  if (error) throw new Error(error.message);
  return key;
}

/**
 * Delete a logo file from Supabase Storage
 */
export async function deleteLogo(key: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.storage.from(BUCKET).remove([key]);
  if (error) throw new Error(error.message);
}

/**
 * Get the public URL for a logo
 */
export function getLogoUrl(key: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`;
}

/**
 * Extract the key from a full Supabase URL
 */
export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const bucketIndex = pathParts.indexOf(BUCKET);
    if (bucketIndex === -1) return null;
    return pathParts.slice(bucketIndex + 1).join("/");
  } catch {
    return null;
  }
}
