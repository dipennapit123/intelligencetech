import { NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");

  let query = supabaseAdmin
    .from("products")
    .select("id,name,slug,description,category,status,logo_url,icon,featured,featured_order,page_content,created_at")
    .order("created_at", { ascending: false });

  if (featured === "true") {
    query = query.eq("featured", true).order("featured_order", { ascending: true });
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data ?? [] });
}
