import { NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .select(
      "id,title,slug,content,meta_title,meta_description,featured_image,tags,category,published,created_at",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    blog: {
      id: data.id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      featured_image: data.featured_image,
      tags: data.tags,
      category: data.category,
      created_at: data.created_at,
    },
  });
}
