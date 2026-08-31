// app/api/cache-status/route.js

import { getCacheStatus } from "@/lib/cache";

export async function GET() {
  const status = getCacheStatus();
  return Response.json({
    totalEntries: status.length,
    entries: status,
  });
}