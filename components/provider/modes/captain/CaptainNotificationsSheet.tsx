"use client";

import { useRouter } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import type { CaptainOffer } from "./types";

export type CaptainNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  href: string;
  icon: string;
  tone: "alert" | "success" | "info";
};

export function buildCaptainNotifications(offers: CaptainOffer[]): CaptainNotification[] {
  const items: CaptainNotification[] = offers.map((o) => ({
    id: `offer-${o.id}`,
    title: "New ride offer",
    body: `${o.booking.customerName} · ${o.booking.address} · ₹${Math.round(o.booking.quotedAmount / 100)}`,
    time: "Live now",
    href: "/partner/leads",
    icon: "motorcycle",
    tone: "alert" as const,
  }));

  items.push(
    {
      id: "incentive",
      title: "Bonus almost unlocked",
      body: "Complete 2 more rides today for ₹150 bonus.",
      time: "30m ago",
      href: "/partner/incentives",
      icon: "diamond",
      tone: "success",
    },
    {
      id: "payout",
      title: "Settlement tomorrow",
      body: "Tuesday payout will include weekend earnings.",
      time: "2h ago",
      href: "/partner/wallet",
      icon: "wallet",
      tone: "info",
    }
  );

  return items;
}

type Props = {
  open: boolean;
  onClose: () => void;
  items: CaptainNotification[];
  readIds: Set<string>;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
};

export function CaptainNotificationsSheet({
  open,
  onClose,
  items,
  readIds,
  onMarkRead,
  onMarkAllRead,
}: Props) {
  const router = useRouter();
  const unread = items.filter((n) => !readIds.has(n.id)).length;

  if (!open) return null;

  function openItem(item: CaptainNotification) {
    onMarkRead(item.id);
    onClose();
    router.push(item.href);
  }

  return (
    <>
      <button type="button" className="rapido-notif-backdrop" onClick={onClose} aria-label="Close notifications" />
      <aside className="rapido-notif-sheet" role="dialog" aria-label="Notifications">
        <div className="rapido-notif-handle" aria-hidden />
        <div className="rapido-notif-head">
          <div>
            <h2>Notifications</h2>
            <p className="rapido-muted">{unread > 0 ? `${unread} unread` : "You're all caught up"}</p>
          </div>
          {unread > 0 && (
            <button type="button" className="rapido-notif-mark-all" onClick={onMarkAllRead}>
              Mark all read
            </button>
          )}
        </div>
        <ul className="rapido-notif-list">
          {items.map((item) => {
            const isUnread = !readIds.has(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`rapido-notif-item ${isUnread ? "is-unread" : ""}`}
                  onClick={() => openItem(item)}
                >
                  <span className="rapido-notif-icon">
                    <FlaticonIcon name={item.icon} size={18} color="var(--portal-primary)" />
                  </span>
                  <span className="rapido-notif-body">
                    <strong>{item.title}</strong>
                    <span className="rapido-muted">{item.body}</span>
                    <span className="rapido-notif-time">{item.time}</span>
                  </span>
                  {isUnread && <span className="rapido-notif-unread-dot" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
