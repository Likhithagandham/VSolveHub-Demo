"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PARTNER_NAV } from "@/lib/provider/constants";
import { PartnerLogoutButton } from "@/components/provider/PartnerLogoutButton";

export function PartnerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith("/partner/onboarding");
  const [modeLabel, setModeLabel] = useState("Partner");

  useEffect(() => {
    if (hideNav) return;
    fetch("/api/provider/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.profile?.providerType) {
          setModeLabel(json.profile.providerType.replace(/_/g, " "));
        }
      })
      .catch(() => undefined);
  }, [hideNav, pathname]);

  return (
    <div className="partner-shell">
      {!hideNav && (
        <header className="partner-header">
          <div>
            <p className="partner-header-eyebrow">Partner portal</p>
            <h1 className="partner-header-title">{modeLabel}</h1>
          </div>
          <div className="partner-header-actions">
            <Link href="/" className="partner-header-link">
              Customer app
            </Link>
            <PartnerLogoutButton className="partner-header-link partner-header-logout" />
          </div>
        </header>
      )}
      <main className="partner-content">
        {children}
        {pathname === "/partner/profile" && (
          <div className="partner-logout-wrap">
            <PartnerLogoutButton />
          </div>
        )}
      </main>
      {!hideNav && (
        <nav className="partner-nav" aria-label="Partner navigation">
          {PARTNER_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={`partner-nav-item ${active ? "active" : ""}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
