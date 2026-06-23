"use client";

import { useEffect, useState } from "react";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import type { ModePortalConfig } from "@/lib/provider/mode-config";
import { PortalProvider } from "@/lib/provider/modes/portal/context";
import { ProviderNotificationBell } from "@/components/notifications/ProviderNotificationBell";
import { ModeSidebar } from "./modes/portal/ModeSidebar";
import { ModeBottomNav } from "./modes/portal/ModeBottomNav";

type Props = {
  config: ModePortalConfig;
  children: React.ReactNode;
};

export function ModeAppChrome({ config, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState(config.label);
  const [rating, setRating] = useState(4.8);

  useEffect(() => {
    fetch("/api/provider/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.profile?.name) setName(json.profile.name);
        if (json?.stats?.rating) setRating(json.stats.rating);
      })
      .catch(() => undefined);
  }, []);

  return (
    <PortalProvider modeType={config.type}>
      <div className="mode-app">
        <header className="mode-topbar">
          <button type="button" className="mode-topbar-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <FlaticonIcon name="apps" size={22} />
          </button>
          <div className="mode-topbar-profile">
            <span className="mode-avatar">{name.slice(0, 2).toUpperCase()}</span>
            <div>
              <p className="mode-topbar-name">{name}</p>
              <p className="mode-topbar-meta">{config.tagline} · ★ {rating.toFixed(1)}</p>
            </div>
          </div>
          <ProviderNotificationBell />
        </header>
        <main className="mode-main">{children}</main>
        <ModeBottomNav items={config.primaryNav} />
        <ModeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} items={config.sidebar} />
      </div>
    </PortalProvider>
  );
}
