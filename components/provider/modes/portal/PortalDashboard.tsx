"use client";

import Link from "next/link";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { usePortal } from "@/lib/provider/modes/portal/context";
import { getInitials, getStatIcon, getStatTone } from "@/lib/provider/modes/portal/ui-helpers";

export function PortalDashboard() {
  const { config, data } = usePortal();
  const pending = data.requests.filter((r) => r.status === "pending").length;
  const monthEarn =
    data.earnings.stats.find((s) => s.label === "Month")?.value ??
    data.stats.find((s) => s.label.toLowerCase().includes("earn") || s.label.toLowerCase().includes("revenue"))
      ?.value ??
    data.earnings.stats.at(-1)?.value ??
    "—";

  return (
    <div className="mode-page">
      <section className="mode-hero mode-hero--rich">
        <div className="mode-hero-glow" aria-hidden />
        <div className="mode-hero-inner">
          <div className="mode-hero-top">
            <span className="mode-live-pill">
              <span className="mode-live-dot" />
              {data.availability}
            </span>
            <span className="mode-hero-earn">{monthEarn}</span>
          </div>
          <p className="mode-hero-schedule">{data.todaySchedule}</p>
          <p className="mode-hero-tagline">{config.tagline}</p>
        </div>
      </section>

      <div className="mode-quick-scroll">
        {config.primaryNav.map((item) => (
          <Link key={item.href} href={item.href} className="mode-quick-chip">
            <FlaticonIcon name={item.icon} size={16} color="var(--portal-primary)" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mode-stat-grid">
        {data.stats.map((s, i) => (
          <div key={s.label} className={`mode-stat-card mode-stat-card--${getStatTone(i)}`}>
            <span className="mode-stat-icon" aria-hidden>
              <FlaticonIcon name={getStatIcon(i)} size={16} color="currentColor" />
            </span>
            <span className="mode-stat-value">{s.value}</span>
            <span className="mode-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <section className="mode-panel">
        <div className="mode-panel-head">
          <div>
            <p className="mode-panel-eyebrow">Inbox</p>
            <h3>{config.inboxTitle}</h3>
          </div>
          <Link href="/partner/leads" className="mode-panel-link">
            {pending} pending →
          </Link>
        </div>
        <ul className="mode-feed">
          {data.requests.slice(0, 3).map((r) => (
            <li key={r.id}>
              <Link href="/partner/leads" className={`mode-feed-row mode-feed-row--${r.status}`}>
                <span className="mode-person-avatar">{getInitials(r.customer)}</span>
                <span className="mode-feed-body">
                  <strong>{r.title}</strong>
                  <span className="mode-muted">{r.customer}</span>
                </span>
                <span className="mode-feed-end">
                  <span className="mode-amount">{r.amount}</span>
                  {r.badge && <span className="mode-badge mode-badge--alert">{r.badge}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mode-panel">
        <div className="mode-panel-head">
          <div>
            <p className="mode-panel-eyebrow">Active</p>
            <h3>{config.workTitle}</h3>
          </div>
          <Link href="/partner/work" className="mode-panel-link">
            View all →
          </Link>
        </div>
        <ul className="mode-feed">
          {data.workItems.slice(0, 3).map((w) => (
            <li key={w.id}>
              <Link href="/partner/work" className="mode-feed-row">
                <span className="mode-feed-icon">
                  <FlaticonIcon name="briefcase" size={18} color="var(--portal-primary)" />
                </span>
                <span className="mode-feed-body">
                  <strong>{w.title}</strong>
                  <span className="mode-muted">{w.subtitle}</span>
                </span>
                {w.badge && <span className="mode-badge">{w.badge}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
