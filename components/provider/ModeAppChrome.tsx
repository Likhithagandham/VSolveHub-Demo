"use client";

import { useEffect, useMemo, useState } from "react";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import type { ModePortalConfig } from "@/lib/provider/mode-config";
import { PortalProvider } from "@/lib/provider/modes/portal/context";
import { getPortalNotifications } from "@/lib/provider/modes/portal/notifications";
import { ModeSidebar } from "./modes/portal/ModeSidebar";
import { ModeBottomNav } from "./modes/portal/ModeBottomNav";
import { ModeNotificationsSheet } from "./modes/portal/ModeNotificationsSheet";

type Props = {
  config: ModePortalConfig;
  children: React.ReactNode;
};

export function ModeAppChrome({ config, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const [name, setName] = useState(config.label);
  const [rating, setRating] = useState(4.8);

  const notifications = useMemo(() => getPortalNotifications(config.type), [config.type]);
  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  useEffect(() => {
    fetch("/api/provider/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.profile?.name) setName(json.profile.name);
        if (json?.stats?.rating) setRating(json.stats.rating);
      })
      .catch(() => undefined);
  }, []);

  function markRead(id: string) {
    setReadIds((prev) => new Set(prev).add(id));
  }

  function markAllRead() {
    setReadIds(new Set(notifications.map((n) => n.id)));
  }

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
          <button
            type="button"
            className="mode-topbar-bell"
            onClick={() => setNotifOpen(true)}
            aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
          >
            <span className="mode-topbar-bell-wrap">
              <FlaticonIcon name="bell" size={20} />
              {unreadCount > 0 && (
                <span className="mode-topbar-bell-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
              )}
            </span>
          </button>
        </header>
        <main className="mode-main">{children}</main>
        <ModeBottomNav items={config.primaryNav} />
        <ModeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} items={config.sidebar} />
        <ModeNotificationsSheet
          open={notifOpen}
          onClose={() => setNotifOpen(false)}
          items={notifications}
          readIds={readIds}
          onMarkRead={markRead}
          onMarkAllRead={markAllRead}
        />
      </div>
    </PortalProvider>
  );
}
