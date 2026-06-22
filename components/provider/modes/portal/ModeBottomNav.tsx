"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import type { NavItem } from "@/lib/provider/mode-config";

export function ModeBottomNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="mode-bottom-nav" aria-label="Partner navigation">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.matchPrefix !== false && pathname.startsWith(`${item.href}/`));
        return (
          <Link key={item.href} href={item.href} className={`mode-bottom-nav-item ${active ? "active" : ""}`}>
            <span className="mode-bottom-nav-icon">
              <FlaticonIcon
                name={item.icon}
                size={22}
                color={active ? "var(--portal-primary)" : "var(--color-text-muted)"}
              />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
