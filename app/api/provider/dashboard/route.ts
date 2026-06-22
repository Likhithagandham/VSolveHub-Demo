import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getCaptainDashboard } from "@/lib/provider/captain/dashboard";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dashboard = await getCaptainDashboard(session.id);
  if (!dashboard) {
    return NextResponse.json({ error: "Captain profile required" }, { status: 404 });
  }

  return NextResponse.json(dashboard);
}
