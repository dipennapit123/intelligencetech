import { NextRequest } from "next/server";

import { getAdminEmailAllowlist } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice("bearer ".length)
    : null;

  if (!token) return { ok: false as const, status: 401, message: "Missing token" };

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) {
    return { ok: false as const, status: 401, message: "Invalid token" };
  }

  const email = (data.user.email ?? "").toLowerCase();
  if (!email) return { ok: false as const, status: 403, message: "Email required" };

  const allowlist = getAdminEmailAllowlist();
  if (!allowlist.has(email)) {
    return { ok: false as const, status: 403, message: "Not an admin" };
  }

  return { ok: true as const, user: data.user };
}

