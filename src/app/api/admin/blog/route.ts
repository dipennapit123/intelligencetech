import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { BlogUpsertSchema } from "@/lib/validators";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request);
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return withCors(
      request,
      NextResponse.json({ error: admin.message }, { status: admin.status }),
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .select(
      "id,title,slug,meta_title,meta_description,featured_image,tags,category,published,created_at",
    )
    .order("created_at", { ascending: false });

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  return withCors(request, NextResponse.json({ blogs: data ?? [] }));
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return withCors(
      request,
      NextResponse.json({ error: admin.message }, { status: admin.status }),
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  const body = await request.json().catch(() => null);
  const parsed = BlogUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return withCors(
      request,
      NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 },
      ),
    );
  }

  const payload = parsed.data;

  const { data, error } = await supabaseAdmin
    .from("blogs")
    .insert({
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      meta_title: payload.meta_title,
      meta_description: payload.meta_description,
      featured_image: payload.featured_image ?? null,
      tags: payload.tags,
      category: payload.category ?? null,
      published: payload.published,
    })
    .select("id")
    .single();

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  revalidateTag("blog", "max");
  return withCors(request, NextResponse.json({ id: data.id }, { status: 201 }));
}

