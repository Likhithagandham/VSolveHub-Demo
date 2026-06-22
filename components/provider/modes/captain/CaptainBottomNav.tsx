"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";

const NAV = [
  { href: "/partner/dashboard", label: "Home", icon: "home" },
  { href: "/partner/work", label: "Rides", icon: "briefcase" },
  { href: "/partner/earnings", label: "Earnings", icon: "wallet" },
  { href: "/partner/calendar", label: "Schedule", icon: "calendar" },
] as const;

export function CaptainBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="rapido-bottom-nav" aria-label="Captain navigation">
      {NAV.map((item) => {
        const active =
          pathname === item.href ||
          (item.href === "/partner/work" && pathname.startsWith("/partner/work/"));
        return (
          <Link key={item.href} href={item.href} className={`rapido-bottom-nav-item ${active ? "active" : ""}`}>
            <FlaticonIcon
              name={item.icon}
              size={22}
              color={active ? "var(--color-brand)" : "var(--color-text-muted)"}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
