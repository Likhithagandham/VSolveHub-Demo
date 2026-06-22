"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PARTNER_NAV } from "@/lib/provider/constants";
import { PartnerLogoutButton } from "@/components/provider/PartnerLogoutButton";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { CaptainAppChrome } from "@/components/provider/modes/captain/CaptainAppChrome";

export function PartnerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/partner/login");
  const hideNav = pathname.startsWith("/partner/onboarding") || isLogin;
  const hideHeader = isLogin;
  const [isCaptain, setIsCaptain] = useState(false);

  useEffect(() => {
    if (hideNav) return;
    fetch("/api/provider/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.profile?.providerType === "CAPTAIN") {
          setIsCaptain(true);
        }
      })
      .catch(() => undefined);
  }, [hideNav, pathname]);

  if (isCaptain && !hideNav) {
    return <CaptainAppChrome>{children}</CaptainAppChrome>;
  }

  return (
    <div className="partner-shell">
      {!hideNav && !hideHeader && (
        <header className="partner-header">
          <div>
            <p className="partner-header-eyebrow">Partner portal</p>
            <h1 className="partner-header-title">Partner</h1>
          </div>
          <div className="partner-header-actions">
            <PartnerLogoutButton className="partner-header-link partner-header-logout" />
          </div>
        </header>
      )}
      <main className="partner-content">{children}</main>
      {!hideNav && (
        <nav className="partner-nav" aria-label="Partner navigation">
          {PARTNER_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={`partner-nav-item ${active ? "active" : ""}`}>
                <FlaticonIcon
                  name={item.icon}
                  size={20}
                  color={active ? "var(--color-brand)" : "var(--color-text-muted)"}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
