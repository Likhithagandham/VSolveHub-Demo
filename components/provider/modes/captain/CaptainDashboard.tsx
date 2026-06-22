"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";

type DashboardData = {
  isOnline: boolean;
  pendingOffers: number;
  activeJobs: number;
  completedJobs: number;
  todayEarningsPaise: number;
  weeklyEarningsPaise: number;
  rating: number;
  acceptanceRate: number;
};

export function CaptainDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const profileRes = await fetch("/api/provider/profile");
    if (profileRes.ok) {
      const json = await profileRes.json();
      if (json.stats) {
        setData(json.stats);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, [load]);

  async function toggleOnline() {
    if (!data) return;
    const res = await fetch("/api/provider/online", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOnline: !data.isOnline }),
    });
    if (res.ok) {
      const json = await res.json();
      setData((prev) => (prev ? { ...prev, isOnline: json.isOnline } : prev));
    }
  }

  if (loading) return <LoadingState label="Loading dashboard…" variant="partner" />;
  if (!data) {
    return (
      <div className="partner-empty">
        <p>Could not load dashboard.</p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => { setLoading(true); load(); }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="partner-stack">
      <div className="partner-card partner-online-card">
        <div>
          <h2 className="partner-card-title">You&apos;re {data.isOnline ? "online" : "offline"}</h2>
          <p className="partner-muted">Toggle availability to receive live job offers.</p>
        </div>
        <button type="button" className={`partner-toggle ${data.isOnline ? "is-on" : ""}`} onClick={toggleOnline}>
          {data.isOnline ? "Online" : "Offline"}
        </button>
      </div>

      <div className="partner-stat-grid">
        <Link href="/partner/leads" className="partner-stat-card">
          <span className="partner-stat-value">{data.pendingOffers}</span>
          <span className="partner-stat-label">Pending offers</span>
        </Link>
        <Link href="/partner/work" className="partner-stat-card">
          <span className="partner-stat-value">{data.activeJobs}</span>
          <span className="partner-stat-label">Active jobs</span>
        </Link>
        <div className="partner-stat-card">
          <span className="partner-stat-value">{data.completedJobs}</span>
          <span className="partner-stat-label">Completed</span>
        </div>
        <div className="partner-stat-card">
          <span className="partner-stat-value">★ {data.rating.toFixed(1)}</span>
          <span className="partner-stat-label">{data.acceptanceRate}% accept rate</span>
        </div>
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">Earnings snapshot</h3>
        <div className="partner-earnings-row">
          <div>
            <p className="partner-muted">Today</p>
            <p className="partner-price">{formatPrice(data.todayEarningsPaise)}</p>
          </div>
          <div>
            <p className="partner-muted">This week</p>
            <p className="partner-price">{formatPrice(data.weeklyEarningsPaise)}</p>
          </div>
        </div>
        <Link href="/partner/earnings" className="partner-link">
          View earnings →
        </Link>
      </div>
    </div>
  );
}
