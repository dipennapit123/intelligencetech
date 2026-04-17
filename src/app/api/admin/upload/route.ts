import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request);
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
  const form = await request.formData().catch(() => null);
  if (!form) {
    return withCors(
      request,
      NextResponse.json({ error: "Expected multipart form data" }, { status: 400 }),
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return withCors(request, NextResponse.json({ error: "Missing file" }, { status: 400 }));
  }

  const bucket = (form.get("bucket") as string) || "blog-images";
  const allowedBuckets = ["blog-images", "product-images"];
  if (!allowedBuckets.includes(bucket)) {
    return withCors(request, NextResponse.json({ error: "Invalid bucket" }, { status: 400 }));
  }

  const prefix = bucket === "product-images" ? "products" : "blog";
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${prefix}/${Date.now()}_${safeName}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    return withCors(
      request,
      NextResponse.json({ error: uploadError.message }, { status: 500 }),
    );
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return withCors(request, NextResponse.json({ url: data.publicUrl, path }));
}
