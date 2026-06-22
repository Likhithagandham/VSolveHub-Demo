"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import type { PortalNotification } from "@/lib/provider/modes/portal/notifications";

type Props = {
  open: boolean;
  onClose: () => void;
  items: PortalNotification[];
  readIds: Set<string>;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
};

export function ModeNotificationsSheet({
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

  function openItem(item: PortalNotification) {
    onMarkRead(item.id);
    onClose();
    router.push(item.href);
  }

  return (
    <>
      <button type="button" className="mode-notif-backdrop" onClick={onClose} aria-label="Close notifications" />
      <aside className="mode-notif-sheet" role="dialog" aria-label="Notifications">
        <div className="mode-notif-handle" aria-hidden />
        <div className="mode-notif-head">
          <div>
            <h2>Notifications</h2>
            <p className="mode-muted">{unread > 0 ? `${unread} unread` : "You're all caught up"}</p>
          </div>
          {unread > 0 && (
            <button type="button" className="mode-notif-mark-all" onClick={onMarkAllRead}>
              Mark all read
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mode-notif-empty">
            <FlaticonIcon name="bell" size={32} color="var(--color-text-muted)" />
            <p>No notifications right now.</p>
          </div>
        ) : (
          <ul className="mode-notif-list">
            {items.map((item) => {
              const isUnread = !readIds.has(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`mode-notif-item mode-notif-item--${item.tone} ${isUnread ? "is-unread" : ""}`}
                    onClick={() => openItem(item)}
                  >
                    <span className={`mode-notif-icon mode-notif-icon--${item.tone}`}>
                      <FlaticonIcon name={item.icon} size={18} color="currentColor" />
                    </span>
                    <span className="mode-notif-body">
                      <strong>{item.title}</strong>
                      <span className="mode-muted">{item.body}</span>
                      <span className="mode-notif-time">{item.time}</span>
                    </span>
                    {isUnread && <span className="mode-notif-unread-dot" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mode-notif-foot">
          <Link href="/partner/leads" className="mode-notif-foot-link" onClick={onClose}>
            Open inbox →
          </Link>
        </div>
      </aside>
    </>
  );
}
