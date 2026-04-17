import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { ProductUpsertSchema } from "@/lib/validators";

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
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  if (!data) return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  return withCors(request, NextResponse.json({ product: data }));
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
  const parsed = ProductUpsertSchema.safeParse(body);
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
  const p = parsed.data;
  const { error } = await supabaseAdmin
    .from("products")
    .update({
      name: p.name,
      slug: p.slug,
      description: p.description,
      category: p.category,
      status: p.status,
      logo_url: p.logo_url ?? null,
      icon: p.icon ?? "apps",
      featured: p.featured ?? false,
      featured_order: p.featured_order ?? 0,
      page_content: p.page_content ?? {},
    })
    .eq("id", id);

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  revalidateTag("products", "max");
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
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  revalidateTag("products", "max");
  return withCors(request, NextResponse.json({ ok: true }));
}
