"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARTNER_NAV, type ProviderType } from "@/lib/provider/constants";
import { getModePortalConfig } from "@/lib/provider/mode-config";
import { PartnerLogoutButton } from "@/components/provider/PartnerLogoutButton";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { LoadingState } from "@/components/ui/LoadingState";
import { CaptainAppChrome } from "@/components/provider/modes/captain/CaptainAppChrome";
import { ModeAppChrome } from "@/components/provider/ModeAppChrome";

type Props = {
  children: React.ReactNode;
  providerType: ProviderType | null;
};

export function PartnerShell({ children, providerType }: Props) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/partner/login");
  const hideNav = pathname.startsWith("/partner/onboarding") || isLogin;
  const hideHeader = isLogin;

  const isCaptain = providerType === "CAPTAIN";
  const portalConfig = providerType ? getModePortalConfig(providerType) : null;
  const needsChrome = !hideNav && providerType != null;

  if (needsChrome && !isCaptain && !portalConfig) {
    return <LoadingState label="Loading portal…" variant="partner" />;
  }

  if (isCaptain && !hideNav) {
    return <CaptainAppChrome>{children}</CaptainAppChrome>;
  }

  if (portalConfig && !hideNav) {
    return <ModeAppChrome config={portalConfig}>{children}</ModeAppChrome>;
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
