"use client";

import { usePathname } from "next/navigation";
import { AppHeader, BottomNav } from "@/components/shared/AppShell";

export function ShellSwitcher({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPartner = pathname.startsWith("/partner");

  if (isPartner) {
    return <>{children}</>;
  }

  return (
    <div suppressHydrationWarning>
      <AppHeader />
      <main className="main-content">{children}</main>
      <BottomNav />
    </div>
  );
}
