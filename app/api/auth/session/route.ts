import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession, deleteSession, SESSION_COOKIE } from "@/lib/auth/session";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: { phone: session.phone, role: session.role } });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) deleteSession(token);
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}
