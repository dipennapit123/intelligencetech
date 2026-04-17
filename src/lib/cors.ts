import { NextRequest, NextResponse } from "next/server";

import { getCorsAllowedOrigins, hasEnv } from "@/lib/env";

function originFor(req: NextRequest) {
  return req.headers.get("origin") ?? "";
}

export function withCors(req: NextRequest, res: NextResponse) {
  // If env isn't configured (local dev without Supabase), do nothing.
  if (!hasEnv()) return res;

  const origin = originFor(req);
  if (!origin) return res;

  const allow = getCorsAllowedOrigins();
  if (!allow.has(origin)) return res;

  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Headers", "authorization, content-type");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  return res;
}

export function corsPreflight(req: NextRequest) {
  const res = new NextResponse(null, { status: 204 });
  return withCors(req, res);
}

