import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { BlogUpsertSchema } from "@/lib/validators";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return withCors(
      request,
      NextResponse.json({ error: admin.message }, { status: admin.status }),
    );
  }

  const { id } = await params;
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .select(
      "id,title,slug,content,meta_title,meta_description,featured_image,tags,category,published,created_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  if (!data) return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  return withCors(request, NextResponse.json({ blog: data }));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id } = await params;
  const payload = parsed.data;

  const { error } = await supabaseAdmin
    .from("blogs")
    .update({
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
    .eq("id", id);

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  revalidateTag("blog", "max");
  return withCors(request, NextResponse.json({ ok: true }));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return withCors(
      request,
      NextResponse.json({ error: admin.message }, { status: admin.status }),
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  const body: unknown = await request.json().catch(() => null);
  const published =
    body &&
    typeof body === "object" &&
    "published" in body &&
    typeof (body as { published?: unknown }).published === "boolean"
      ? (body as { published: boolean }).published
      : null;

  if (published === null) {
    return withCors(
      request,
      NextResponse.json(
        { error: "Invalid payload: expected { published: boolean }" },
        { status: 400 },
      ),
    );
  }

  const { id } = await params;
  const { error } = await supabaseAdmin.from("blogs").update({ published }).eq("id", id);
  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  revalidateTag("blog", "max");
  return withCors(request, NextResponse.json({ ok: true }));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return withCors(
      request,
      NextResponse.json({ error: admin.message }, { status: admin.status }),
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { id } = await params;
  const { error } = await supabaseAdmin.from("blogs").delete().eq("id", id);
  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  revalidateTag("blog", "max");
  return withCors(request, NextResponse.json({ ok: true }));
}
