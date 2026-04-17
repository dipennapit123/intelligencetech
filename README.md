# Intelligence Tech · Web (Main site + API)

This repository contains the **public SaaS website** (Next.js App Router) and the **centralized backend API** under `src/app/api/*`.

## Architecture

- **Public site**: landing, products, blog (SEO-focused)
- **API layer**: blog/product endpoints + admin-only write operations
- **Supabase**: DB/Auth/Storage (accessed only by the API using the service role key)
- **Admin dashboard (separate repo)** calls this API and never connects to the DB directly

## Local setup

1. Create a Supabase project.
2. Run SQL in **`supabase/migrations/001_create_tables.sql`**, then optionally **`supabase/seed.sql`**, in the Supabase SQL editor. Full details: **[supabase/README.md](supabase/README.md)**.
3. Copy `.env.local.example` → `.env.local` and add your Supabase keys. Default admin allowlist email is **admin@gmail.com**; create that user with **`npm run seed:admin`** (password **admin123**) or add the user manually in Supabase Auth.
4. Install + run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Endpoints

- **Public**
  - `POST /api/contact` (JSON body: `firstName`, `lastName`, `email`, `message`; optional honeypot `website` must be empty — requires `RESEND_API_KEY` in `.env.local`)
  - `GET /api/blog` (published only)
  - `GET /api/blog/[slug]` (published only)
  - `GET /api/products` (optional `?featured=true`)
  - `GET /api/products/[slug]`
  - `GET /api/site-content` (optional `?key=hero`)

- **Admin (requires `Authorization: Bearer <supabase_access_token>`)**
  - `GET /api/admin/blog`
  - `POST /api/admin/blog`
  - `GET /api/admin/blog/[id]`
  - `PUT /api/admin/blog/[id]`
  - `PATCH /api/admin/blog/[id]` with `{ "published": true|false }`
  - `DELETE /api/admin/blog/[id]`
  - `GET /api/admin/products`
  - `POST /api/admin/products`
  - `PUT /api/admin/products/[id]`
  - `DELETE /api/admin/products/[id]`
  - `GET /api/admin/site-content`
  - `GET /api/admin/site-content/[key]`
  - `PUT /api/admin/site-content/[key]`
  - `POST /api/admin/upload` (multipart; optional `bucket` field)

## Security model

Admin write requests are authorized by:

1. Verifying the Supabase access token (`supabase.auth.getUser(token)`), and
2. Enforcing an email allowlist via `INTELTECH_ADMIN_EMAILS`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
