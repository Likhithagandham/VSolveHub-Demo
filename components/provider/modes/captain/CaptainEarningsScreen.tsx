"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";

type EarningsResponse = {
  summary: {
    dailyPaise: number;
    weeklyPaise: number;
    monthlyPaise: number;
    dailyCommissionPaise: number;
    weeklyCommissionPaise: number;
    monthlyCommissionPaise: number;
  };
  earnings: {
    id: string;
    amountPaise: number;
    commissionPaise: number;
    payoutStatus: string;
    earnedAt: string;
  }[];
};

export function CaptainEarningsScreen() {
  const [data, setData] = useState<EarningsResponse | null>(null);

  useEffect(() => {
    fetch("/api/provider/earnings")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <LoadingState label="Loading earnings…" variant="partner" />;

  const { summary, earnings } = data;

  return (
    <div className="partner-stack">
      <div className="partner-stat-grid">
        <div className="partner-stat-card">
          <span className="partner-stat-value">{formatPrice(summary.dailyPaise)}</span>
          <span className="partner-stat-label">Today</span>
        </div>
        <div className="partner-stat-card">
          <span className="partner-stat-value">{formatPrice(summary.weeklyPaise)}</span>
          <span className="partner-stat-label">This week</span>
        </div>
        <div className="partner-stat-card">
          <span className="partner-stat-value">{formatPrice(summary.monthlyPaise)}</span>
          <span className="partner-stat-label">This month</span>
        </div>
        <div className="partner-stat-card">
          <span className="partner-stat-value">{formatPrice(summary.monthlyCommissionPaise)}</span>
          <span className="partner-stat-label">Commission</span>
        </div>
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">Recent payouts</h3>
        {earnings.length === 0 ? (
          <p className="partner-muted">No earnings yet. Complete jobs to get paid.</p>
        ) : (
          <ul className="partner-list">
            {earnings.map((e) => (
              <li key={e.id} className="partner-earning-row">
                <div>
                  <strong>{formatPrice(e.amountPaise)}</strong>
                  <p className="partner-muted">
                    {new Date(e.earnedAt).toLocaleDateString()} · Commission{" "}
                    {formatPrice(e.commissionPaise)}
                  </p>
                </div>
                <span className="partner-badge">{e.payoutStatus}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
