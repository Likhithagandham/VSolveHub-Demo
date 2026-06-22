"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { PartnerLogoutButton } from "@/components/provider/PartnerLogoutButton";

const MENU_ITEMS = [
  {
    href: "/partner/profile",
    label: "Profile",
    icon: "user",
    desc: "Personal info, KYC & ratings",
  },
  {
    href: "/partner/wallet",
    label: "Wallet",
    icon: "wallet",
    desc: "Balance, payouts & settlements",
  },
  {
    href: "/partner/incentives",
    label: "Incentives",
    icon: "badge-percent",
    desc: "Bonuses, streaks & targets",
  },
  {
    href: "/partner/documents",
    label: "Documents",
    icon: "id-card-clip-alt",
    desc: "ID, license & vehicle docs",
  },
  {
    href: "/partner/support",
    label: "Support",
    icon: "headset",
    desc: "Help, disputes & emergency",
  },
  {
    href: "/partner/settings",
    label: "Settings",
    icon: "settings",
    desc: "Notifications & preferences",
  },
] as const;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CaptainSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div className={`rapido-sidebar-backdrop ${open ? "is-open" : ""}`} onClick={onClose} aria-hidden />
      <aside className={`rapido-sidebar ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="rapido-sidebar-head">
          <h2>Menu</h2>
          <button type="button" className="rapido-sidebar-close" onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav className="rapido-sidebar-nav" aria-label="Account and settings">
          {MENU_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rapido-sidebar-link ${active ? "active" : ""}`}
                onClick={onClose}
              >
                <FlaticonIcon name={item.icon} size={18} />
                <span className="rapido-sidebar-link-text">
                  <span className="rapido-sidebar-link-label">{item.label}</span>
                  <span className="rapido-sidebar-link-desc">{item.desc}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="rapido-sidebar-footer">
          <PartnerLogoutButton className="rapido-sidebar-logout">Logout</PartnerLogoutButton>
        </div>
      </aside>
    </>
  );
}
