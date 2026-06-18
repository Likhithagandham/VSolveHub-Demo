import { cookies } from "next/headers";

const SESSION_COOKIE = "vsh_session";
const MOCK_OTP = "123456";

// In-memory mock stores (dev only)
const otpStore = new Map<string, string>();
const sessions = new Map<string, { phone: string; role: "customer" | "provider" }>();

export function sendMockOtp(phone: string): { success: boolean; otp?: string } {
  otpStore.set(phone, MOCK_OTP);
  return { success: true, otp: process.env.NODE_ENV === "development" ? MOCK_OTP : undefined };
}

export function verifyMockOtp(phone: string, otp: string): boolean {
  return otpStore.get(phone) === otp || otp === MOCK_OTP;
}

export function createSession(phone: string, role: "customer" | "provider" = "customer"): string {
  const token = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  sessions.set(token, { phone, role });
  return token;
}

export function getSession(token: string) {
  return sessions.get(token) ?? null;
}

export function deleteSession(token: string) {
  sessions.delete(token);
}

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return getSession(token);
}

export { SESSION_COOKIE };

// Mock online status for providers
const onlineStatus = new Map<string, boolean>();

export function getProviderOnline(providerId: string): boolean {
  return onlineStatus.get(providerId) ?? false;
}

export function toggleProviderOnline(providerId: string): boolean {
  const next = !getProviderOnline(providerId);
  onlineStatus.set(providerId, next);
  return next;
}
