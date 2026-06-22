"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";

type EarningsResponse = {
  summary: {
    dailyPaise: number;
    weeklyPaise: number;
    monthlyPaise: number;
    dailyCommissionPaise: number;
  };
  earnings: { id: string; amountPaise: number; payoutStatus: string; earnedAt: string }[];
  stats?: { completedJobs: number; rating: number };
};

function last7Days(earnings: EarningsResponse["earnings"]) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });
  return days.map((day) => {
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const amount = earnings
      .filter((e) => {
        const t = new Date(e.earnedAt);
        return t >= day && t < next;
      })
      .reduce((s, e) => s + e.amountPaise, 0);
    const trips = earnings.filter((e) => {
      const t = new Date(e.earnedAt);
      return t >= day && t < next;
    }).length;
    return {
      label: day.toLocaleDateString(undefined, { weekday: "short" }),
      amount,
      trips,
    };
  });
}

export function CaptainEarningsScreen() {
  const [data, setData] = useState<EarningsResponse | null>(null);

  useEffect(() => {
    fetch("/api/provider/earnings")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const chart = useMemo(() => (data ? last7Days(data.earnings) : []), [data]);
  const maxAmount = Math.max(...chart.map((d) => d.amount), 1);
  const maxTrips = Math.max(...chart.map((d) => d.trips), 1);

  if (!data) return <LoadingState label="Loading earnings…" variant="partner" />;

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Earnings</h1>

      <div className="rapido-earn-tabs">
        <div className="rapido-earn-tab active">
          <span>Today</span>
          <strong>{formatPrice(data.summary.dailyPaise)}</strong>
        </div>
        <div className="rapido-earn-tab">
          <span>Week</span>
          <strong>{formatPrice(data.summary.weeklyPaise)}</strong>
        </div>
        <div className="rapido-earn-tab">
          <span>Month</span>
          <strong>{formatPrice(data.summary.monthlyPaise)}</strong>
        </div>
      </div>

      <section className="rapido-card">
        <h3>Daily earnings</h3>
        <div className="rapido-chart">
          {chart.map((d) => (
            <div key={d.label} className="rapido-chart-col">
              <span className="rapido-chart-bar" style={{ height: `${(d.amount / maxAmount) * 100}%` }} />
              <span className="rapido-chart-label">{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rapido-card">
        <h3>Trip count</h3>
        <div className="rapido-chart rapido-chart--trips">
          {chart.map((d) => (
            <div key={`t-${d.label}`} className="rapido-chart-col">
              <span className="rapido-chart-bar rapido-chart-bar--blue" style={{ height: `${(d.trips / maxTrips) * 100}%` }} />
              <span className="rapido-chart-label">{d.trips}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rapido-card">
        <h3>Payouts & bonuses</h3>
        <ul className="rapido-payout-list">
          {data.earnings.length === 0 ? (
            <li className="rapido-muted">Complete rides to earn payouts.</li>
          ) : (
            data.earnings.map((e) => (
              <li key={e.id}>
                <div>
                  <strong>{formatPrice(e.amountPaise)}</strong>
                  <p className="rapido-muted">{new Date(e.earnedAt).toLocaleString()}</p>
                </div>
                <span className="rapido-badge">{e.payoutStatus}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
