"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { PartnerLogoutButton } from "@/components/provider/PartnerLogoutButton";
import type { SidebarItem } from "@/lib/provider/mode-config";

type Props = {
  open: boolean;
  onClose: () => void;
  items: SidebarItem[];
};

export function ModeSidebar({ open, onClose, items }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div className={`mode-sidebar-backdrop ${open ? "is-open" : ""}`} onClick={onClose} aria-hidden />
      <aside className={`mode-sidebar ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mode-sidebar-head">
          <h2>Menu</h2>
          <button type="button" className="mode-sidebar-close" onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav className="mode-sidebar-nav">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mode-sidebar-link ${active ? "active" : ""}`}
                onClick={onClose}
              >
                <FlaticonIcon name={item.icon} size={18} />
                <span className="mode-sidebar-link-text">
                  <span className="mode-sidebar-link-label">{item.label}</span>
                  <span className="mode-sidebar-link-desc">{item.desc}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="mode-sidebar-footer">
          <PartnerLogoutButton className="mode-sidebar-logout">Logout</PartnerLogoutButton>
        </div>
      </aside>
    </>
  );
}
