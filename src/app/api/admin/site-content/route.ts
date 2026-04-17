import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

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
    .from("site_content")
    .select("id,key,value,updated_at")
    .order("key");

  if (error) return withCors(request, NextResponse.json({ error: error.message }, { status: 500 }));
  return withCors(request, NextResponse.json({ entries: data ?? [] }));
}
