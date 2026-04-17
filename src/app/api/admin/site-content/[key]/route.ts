import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { SiteContentUpsertSchema } from "@/lib/validators";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return withCors(
      request,
      NextResponse.json({ error: admin.message }, { status: admin.status }),
    );
  }

  const { key } = await params;
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("site_content")
    .select("id,key,value,updated_at")
    .eq("key", key)
    .maybeSingle();

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  if (!data) return withCors(request, NextResponse.json({ error: "Not found" }, { status: 404 }));
  return withCors(request, NextResponse.json(data));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const admin = await requireAdmin(request);
  if (!admin.ok) {
    return withCors(
      request,
      NextResponse.json({ error: admin.message }, { status: admin.status }),
    );
  }

  const { key } = await params;
  const body = await request.json().catch(() => null);
  const parsed = SiteContentUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return withCors(
      request,
      NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 },
      ),
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert({ key, value: parsed.data.value }, { onConflict: "key" });

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));

  revalidateTag("site-content", "max");

  return withCors(request, NextResponse.json({ ok: true }));
}
