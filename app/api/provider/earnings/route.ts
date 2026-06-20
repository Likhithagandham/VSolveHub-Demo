import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getProviderByUserId, getProviderEarnings, getCaptainDashboardStats } from "@/lib/provider/queries";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await getProviderByUserId(session.id);
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const data = await getProviderEarnings(provider.id);
  const stats = await getCaptainDashboardStats(provider.id);

  return NextResponse.json({
    ...data,
    stats: {
      completedJobs: stats.completedJobs,
      rating: stats.rating,
    },
  });
}
