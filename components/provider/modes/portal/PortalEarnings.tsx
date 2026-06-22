"use client";

import { useState } from "react";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { usePortal } from "@/lib/provider/modes/portal/context";

export function PortalEarnings() {
  const { data } = usePortal();
  const [activeTab, setActiveTab] = useState(0);
  const activeStat = data.earnings.stats[activeTab] ?? data.earnings.stats[0];

  return (
    <div className="mode-page">
      <header className="mode-page-header">
        <div>
          <h1 className="mode-page-title">Earnings</h1>
          <p className="mode-page-sub">Track payouts and settlement history</p>
        </div>
      </header>

      <section className="mode-earn-hero">
        <p className="mode-earn-hero-label">{activeStat?.label ?? "Period"} earnings</p>
        <p className="mode-earn-hero-value">{activeStat?.value ?? "—"}</p>
        <p className="mode-muted">Settlements every Monday · Bank •••• 4821</p>
      </section>

      <div className="mode-earn-tabs">
        {data.earnings.stats.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`mode-earn-tab ${i === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </button>
        ))}
      </div>

      <section className="mode-panel">
        <div className="mode-panel-head">
          <div>
            <p className="mode-panel-eyebrow">History</p>
            <h3>Payout timeline</h3>
          </div>
        </div>
        <ul className="mode-timeline">
          {data.earnings.rows.map((row, i) => (
            <li key={row.id} className="mode-timeline-item">
              <span className="mode-timeline-dot" />
              <div className="mode-timeline-card">
                <div className="mode-list-row">
                  <div>
                    <strong>{row.title}</strong>
                    <p className="mode-muted">{row.subtitle}</p>
                  </div>
                  <div className="mode-work-right">
                    <span className="mode-amount">{row.amount}</span>
                    {row.badge && (
                      <span className={`mode-badge ${row.badge === "Paid" ? "mode-badge--success" : ""}`}>
                        {row.badge}
                      </span>
                    )}
                  </div>
                </div>
                {i === 0 && (
                  <span className="mode-timeline-note">
                    <FlaticonIcon name="shield" size={14} color="var(--color-success)" />
                    Latest transaction
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
