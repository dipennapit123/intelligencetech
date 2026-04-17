# Supabase (used only by the main website API)

Your **Postgres database, Storage buckets, and Auth users** live in a Supabase **cloud project**. This folder only holds **SQL you run in the Supabase SQL Editor** to create tables and seed data.

## How it connects

1. **`intelligence-tech-web`** (this app) is the **only** codebase that connects to Supabase **as the backend**:
   - Server routes under `src/app/api/**` use `getSupabaseAdmin()` from `src/lib/supabaseAdmin.ts` (service role).
   - The public site and the admin dashboard **never** talk to Postgres directly from the browser for CMS data.

2. **`intelligence-tech-admin`** does **not** use Supabase as a database client for products/blogs/content. It signs users in with Supabase Auth (anon key), then calls the **main site** with `NEXT_PUBLIC_API_BASE_URL` (e.g. `http://localhost:3000`) and `Authorization: Bearer <session JWT>`.

So: **Supabase ↔ main web API**; **admin ↔ main web API**; not **admin ↔ Supabase tables** for CMS.

## Files

| File | Purpose |
|------|---------|
| `migrations/001_create_tables.sql` | Creates `products`, `blogs`, `site_content`, triggers, storage buckets, storage policies |
| `seed.sql` | Optional demo data (run after migration) |

## Setup

1. Create a project at [supabase.com](https://supabase.com).
2. **Settings → API**: copy URL, anon key, service role key.
3. **SQL Editor**: run `migrations/001_create_tables.sql`, then `seed.sql`.
4. **Dev admin (optional)**  
   After `.env.local` has real Supabase URL + **service role** key, from `intelligence-tech-web` run:
   ```bash
   DEV_ADMIN_PASSWORD='your-strong-password' npm run seed:admin
   ```
   This creates **email** `admin@gmail.com` and the password you provided in Supabase Auth (or no-ops if the user already exists).  
   Or add that user manually: **Authentication → Users → Add user** with the same email/password.

5. Fill **`intelligence-tech-web/.env.local`** (use the same keys from the dashboard; `INTELTECH_ADMIN_EMAILS` must match the admin Auth user, default **`admin@gmail.com`**):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
INTELTECH_ADMIN_EMAILS=admin@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

6. In **`intelligence-tech-admin/.env.local`** (same Supabase project for login only; API still points at the web app):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

7. Start the web app on port 3000, admin on 3001 if you use two terminals. Sign in with the admin email/password you created (after `seed:admin` or manual user creation).

**Production:** Change the password in Supabase Auth and rotate credentials; do not rely on default dev passwords.

## Local Supabase CLI (optional)

If you use the Supabase CLI, point it at this directory so migrations live with the web app:

```bash
cd intelligence-tech-web
# supabase link --project-ref YOUR_REF
# supabase db push   # if you adopt CLI workflows later
```

The source of truth for schema in this repo remains the SQL files above unless you add CLI config later.
