import { nanoid } from "nanoid";

export function generateBookingCode(): string {
  return nanoid(8).toLowerCase();
}

export function isValidCustomSlug(slug: string): boolean {
  if (slug.length < 3 || slug.length > 32) return false;
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug)) return false;
  if (/--/.test(slug)) return false;
  return true;
}

export const RESERVED_SLUGS = new Set([
  "login",
  "register",
  "dashboard",
  "planos",
  "api",
  "a",
  "book",
  "_next",
  "favicon.ico",
  "sitemap.xml",
  "robots.txt",
  "admin",
  "app",
  "auth",
  "static",
  "public",
  "assets",
]);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}
