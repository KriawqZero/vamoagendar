export const prisma = new Proxy({}, {
  get() {
    throw new Error('Prisma was permanently removed. Consult the migration guide to use Supabase PostgREST.');
  }
});
