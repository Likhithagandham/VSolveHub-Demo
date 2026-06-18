import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  sendMockOtp,
  verifyMockOtp,
  createSession,
  SESSION_COOKIE,
} from "@/lib/auth/session";
import { otpSendSchema, otpVerifySchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = body.action as string;

  if (action === "send") {
    const parsed = otpSendSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const result = sendMockOtp(parsed.data.phone);
    return NextResponse.json({ success: true, message: "OTP sent", devOtp: result.otp });
  }

  if (action === "verify") {
    const parsed = otpVerifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const valid = verifyMockOtp(parsed.data.phone, parsed.data.otp);
    if (!valid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }
    const role = body.role === "provider" ? "provider" : "customer";
    const token = createSession(parsed.data.phone, role);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, { httpOnly: true, path: "/", maxAge: 86400 });
    return NextResponse.json({ success: true, role });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
