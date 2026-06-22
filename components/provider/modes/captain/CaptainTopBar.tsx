"use client";

import { FlaticonIcon } from "@/components/ui/FlaticonIcon";

type Props = {
  name: string;
  rating: number;
  onMenu: () => void;
  onNotifications?: () => void;
  unreadCount?: number;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function CaptainTopBar({ name, rating, onMenu, onNotifications, unreadCount = 0 }: Props) {
  return (
    <header className="rapido-topbar">
      <button type="button" className="rapido-topbar-menu" onClick={onMenu} aria-label="Open menu">
        <FlaticonIcon name="apps" size={22} />
      </button>
      <div className="rapido-topbar-profile">
        <span className="rapido-avatar" aria-hidden>
          {initials(name)}
        </span>
        <div>
          <p className="rapido-topbar-name">{name}</p>
          <p className="rapido-topbar-rating">★ {rating.toFixed(1)}</p>
        </div>
      </div>
      <button
        type="button"
        className="rapido-topbar-bell"
        onClick={onNotifications}
        aria-label="Notifications"
      >
        <FlaticonIcon name="bell" size={20} />
        {unreadCount > 0 && (
          <span className="rapido-topbar-bell-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </button>
    </header>
  );
}
