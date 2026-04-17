import { z } from "zod";

const EnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  INTELTECH_ADMIN_EMAILS: z.string().min(1),

  /** Optional: comma-separated origins allowed to call this API cross-site (e.g. admin dashboard domain). */
  CORS_ALLOWED_ORIGINS: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;

  const parsed = EnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    INTELTECH_ADMIN_EMAILS: process.env.INTELTECH_ADMIN_EMAILS,
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
  });

  if (!parsed.success) {
    const msg =
      "Missing required environment variables. Copy `.env.local.example` to `.env.local` and set Supabase keys.";
    // Throwing here is OK because we call getEnv() only inside route handlers.
    throw new Error(`${msg}\n\n${parsed.error.message}`);
  }

  cached = parsed.data;
  return cached;
}

export function hasEnv() {
  try {
    getEnv();
    return true;
  } catch {
    return false;
  }
}

export function getAdminEmailAllowlist() {
  const env = getEnv();
  return new Set(
    env.INTELTECH_ADMIN_EMAILS.split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function getCorsAllowedOrigins() {
  const env = getEnv();
  return new Set(
    (env.CORS_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

