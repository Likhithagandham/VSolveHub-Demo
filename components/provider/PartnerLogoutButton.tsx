"use client";

import { useRouter } from "next/navigation";
import { partnerLoginPath } from "@/lib/provider/login";

export function PartnerLogoutButton({
  className = "partner-logout-btn",
  children = "Logout",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push(partnerLoginPath("/partner/dashboard"));
    router.refresh();
  }

  return (
    <button type="button" className={className} onClick={logout}>
      {children}
    </button>
  );
}
