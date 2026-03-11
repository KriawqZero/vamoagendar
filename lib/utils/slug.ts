import { nanoid } from "nanoid";

export function generateSlug(): string {
  return nanoid(8).toLowerCase();
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) && slug.length >= 3 && slug.length <= 64;
}
