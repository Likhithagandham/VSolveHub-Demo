"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";
import type { CaptainDashboardData } from "@/lib/provider/captain/dashboard";

export function CaptainIncentivesScreen() {
  const [data, setData] = useState<CaptainDashboardData | null>(null);

  useEffect(() => {
    fetch("/api/provider/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <LoadingState label="Loading incentives…" variant="partner" />;

  const { incentives, bonuses } = data;

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Incentives</h1>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Daily bonus</h3>
        <p className="rapido-big-amount">{formatPrice(incentives.dailyBonusPaise)}</p>
        <p className="rapido-muted">
          {incentives.completedToday} of {incentives.dailyTargetJobs} trips completed today
        </p>
        <div className="rapido-progress">
          <span style={{ width: `${incentives.dailyProgressPct}%` }} />
        </div>
        <p className={`rapido-peak ${incentives.peakHourActive ? "is-active" : ""}`}>
          {incentives.peakHourLabel}
        </p>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Streak rewards</h3>
        <p className="rapido-muted">{incentives.streakDays}-day acceptance streak active</p>
        <p className="rapido-muted">
          Weekly bonus target: {formatPrice(incentives.weeklyBonusPaise)}
        </p>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Target-based earnings</h3>
        <ul className="rapido-bonus-drawer-list">
          {bonuses.map((bonus) => (
            <li key={bonus.id} className={`rapido-bonus-drawer-item rapido-bonus-drawer-item--${bonus.status}`}>
              <div>
                <strong>{bonus.title}</strong>
                <p className="rapido-muted">{bonus.description}</p>
                {bonus.progressPct != null && bonus.status !== "earned" && (
                  <div className="rapido-progress rapido-progress--sm">
                    <span style={{ width: `${bonus.progressPct}%` }} />
                  </div>
                )}
              </div>
              <span className="rapido-earn-sm">{formatPrice(bonus.amountPaise)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
