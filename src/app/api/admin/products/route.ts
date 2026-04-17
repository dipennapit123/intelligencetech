import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { ProductUpsertSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id,name,slug,description,category,status,logo_url,icon,featured,featured_order,page_content,created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data ?? [] });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const body = await request.json().catch(() => null);
  const parsed = ProductUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const p = parsed.data;
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
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
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTag("products", "max");
  return NextResponse.json({ id: data.id }, { status: 201 });
}
