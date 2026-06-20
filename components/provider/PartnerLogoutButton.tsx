"use client";

import { useRouter } from "next/navigation";

export function PartnerLogoutButton({ className = "partner-logout-btn" }: { className?: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/booking/otp?redirect=/partner/dashboard");
    router.refresh();
  }

  return (
    <button type="button" className={className} onClick={logout}>
      Logout
    </button>
  );
}
