import type { ModePortalType } from "@/lib/provider/mode-config";
import { getModePortalConfig } from "@/lib/provider/mode-config";
import { getPortalData } from "@/lib/provider/modes/portal/data";

export type PortalNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  href: string;
  icon: string;
  tone: "alert" | "success" | "info";
};

export function getPortalNotifications(modeType: ModePortalType): PortalNotification[] {
  const data = getPortalData(modeType);
  const config = getModePortalConfig(modeType)!;
  const items: PortalNotification[] = [];

  for (const r of data.requests.filter((req) => req.status === "pending")) {
    items.push({
      id: `req-${r.id}`,
      title: r.badge ? `${r.badge} enquiry` : `New ${config.inboxTitle.toLowerCase().replace(/s$/, "")}`,
      body: `${r.customer} — ${r.title} · ${r.amount}`,
      time: "Just now",
      href: "/partner/leads",
      icon: "comment-alt",
      tone: r.badge === "Priority" || r.badge === "Urgent" ? "alert" : "info",
    });
  }

  for (const row of data.earnings.rows.filter((e) => e.badge === "Pending" || e.badge === "Quote")) {
    items.push({
      id: `earn-${row.id}`,
      title: row.badge === "Quote" ? "Quote awaiting approval" : "Payout processing",
      body: `${row.title} · ${row.amount}`,
      time: "1h ago",
      href: "/partner/earnings",
      icon: "wallet",
      tone: "info",
    });
  }

  for (const row of data.calendarRows.slice(0, 2)) {
    items.push({
      id: `cal-${row.id}`,
      title: row.badge ? `${row.badge} reminder` : "Upcoming on calendar",
      body: `${row.title} — ${row.subtitle}`,
      time: "Today",
      href: "/partner/calendar",
      icon: "calendar",
      tone: row.badge === "Move-in" || row.badge === "Booked" ? "success" : "info",
    });
  }

  const monthEarn = data.earnings.stats.find((s) => s.label === "Month")?.value;
  if (monthEarn) {
    items.push({
      id: "settlement",
      title: "Settlement scheduled",
      body: `${monthEarn} will be credited to your bank on Monday.`,
      time: "3h ago",
      href: "/partner/wallet",
      icon: "wallet",
      tone: "success",
    });
  }

  return items;
}
