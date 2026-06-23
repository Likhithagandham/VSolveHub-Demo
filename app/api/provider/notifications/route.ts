import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getProviderNotifications } from "@/lib/notifications/provider";
import { getProviderByUserId } from "@/lib/provider/queries";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = await getProviderByUserId(session.id);
  if (!provider) {
    return NextResponse.json({ error: "Provider not found" }, { status: 404 });
  }

  const items = await getProviderNotifications(provider.id);
  const unreadCount = items.length;

  return NextResponse.json({ items, unreadCount });
}
