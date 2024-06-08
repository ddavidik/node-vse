import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL!,
  },
});
