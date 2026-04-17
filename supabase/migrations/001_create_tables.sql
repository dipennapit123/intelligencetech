-- Intelligence Tech — Database Migration
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- ══════════════════════════════════════════════════════════════
-- 1. PRODUCTS
-- ══════════════════════════════════════════════════════════════
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text not null default '',
  category    text not null default 'Platform',
  status      text not null default 'active'
                check (status in ('active', 'beta', 'coming_soon')),
  logo_url    text,
  icon        text default 'apps',
  featured    boolean not null default false,
  featured_order int default 0,
  page_content jsonb default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_products_slug on public.products (slug);
create index if not exists idx_products_featured on public.products (featured, featured_order);

-- ══════════════════════════════════════════════════════════════
-- 2. BLOGS
-- ══════════════════════════════════════════════════════════════
create table if not exists public.blogs (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  content          text not null default '',
  meta_title       text not null default '',
  meta_description text not null default '',
  featured_image   text,
  tags             text[] not null default '{}',
  category         text,
  published        boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_blogs_slug on public.blogs (slug);
create index if not exists idx_blogs_published on public.blogs (published, created_at desc);

-- ══════════════════════════════════════════════════════════════
-- 3. SITE_CONTENT (key-value CMS)
-- ══════════════════════════════════════════════════════════════
create table if not exists public.site_content (
  id         uuid primary key default gen_random_uuid(),
  key        text not null unique,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ══════════════════════════════════════════════════════════════
-- 4. AUTO-UPDATE updated_at TRIGGER
-- ══════════════════════════════════════════════════════════════
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger trg_blogs_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();

create trigger trg_site_content_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- ══════════════════════════════════════════════════════════════
-- 5. STORAGE BUCKETS
-- ══════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Allow public reads on both buckets
create policy "Public read blog-images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "Public read product-images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Allow authenticated uploads
create policy "Auth upload blog-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

create policy "Auth upload product-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- Service role can do anything (used by admin API)
create policy "Service role full blog-images"
  on storage.objects for all
  using (bucket_id = 'blog-images')
  with check (bucket_id = 'blog-images');

create policy "Service role full product-images"
  on storage.objects for all
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');
