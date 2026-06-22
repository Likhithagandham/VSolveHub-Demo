"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { CaptainDemandHeatmap } from "./CaptainDemandHeatmap";
import { useCaptainPoll } from "./hooks/useCaptainPoll";
import type { CaptainDashboardData } from "@/lib/provider/captain/dashboard";
import { mapsUrl } from "./dashboard-utils";

export function CaptainDashboard() {
  const [data, setData] = useState<CaptainDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/dashboard");
    if (res.ok) setData(await res.json());
    setLoading(false);
  }, []);

  useCaptainPoll(load, 3000);

  async function patchOnline(payload: { isOnline?: boolean; lat?: number; lng?: number }) {
    const res = await fetch("/api/provider/online", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) await load();
  }

  async function toggleOnline() {
    if (!data) return;
    if (!data.stats.isOnline) {
      setLocating(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            await patchOnline({ isOnline: true, lat: pos.coords.latitude, lng: pos.coords.longitude });
            setLocating(false);
          },
          async () => {
            await patchOnline({ isOnline: true });
            setLocating(false);
          },
          { enableHighAccuracy: true, timeout: 8000 }
        );
        return;
      }
      setLocating(false);
    }
    await patchOnline({ isOnline: !data.stats.isOnline });
  }

  if (loading) return <LoadingState label="Loading dashboard…" variant="partner" />;
  if (!data) {
    return (
      <div className="rapido-empty">
        <p>Could not load dashboard.</p>
        <button type="button" className="rapido-btn rapido-btn-accept" onClick={load}>
          Retry
        </button>
      </div>
    );
  }

  const { stats, incentives, wallet, activeJob, location } = data;
  const isOnline = stats.isOnline;

  return (
    <div className="rapido-dashboard">
      <section className="rapido-online-hero">
        <button
          type="button"
          className={`rapido-online-toggle ${isOnline ? "is-online" : ""}`}
          onClick={toggleOnline}
          disabled={locating}
        >
          <span className="rapido-online-toggle-track">
            <span className="rapido-online-toggle-thumb" />
          </span>
          <span className="rapido-online-toggle-label">{isOnline ? "ONLINE" : "OFFLINE"}</span>
        </button>
        {isOnline ? (
          <>
            <p className="rapido-online-pulse-wrap">
              <span className="rapido-online-pulse" aria-hidden />
              Live location active
            </p>
            <p className="rapido-online-msg">You&apos;re online and ready to receive bookings</p>
          </>
        ) : (
          <p className="rapido-online-msg rapido-online-msg--muted">
            You&apos;re hidden from dispatch. Go online to receive rides.
          </p>
        )}
        <p className="rapido-zone">
          <FlaticonIcon name="marker" size={14} color="var(--color-brand)" /> {location.label}
        </p>
      </section>

      <section className="rapido-card">
        <div className="rapido-card-head">
          <h3>Today&apos;s earnings</h3>
          <Link href="/partner/earnings">View all</Link>
        </div>
        <p className="rapido-big-amount">{formatPrice(stats.todayEarningsPaise)}</p>
        <div className="rapido-mini-stats">
          <span>{stats.completedToday} trips</span>
          <span>{incentives.dailyProgressPct}% daily goal</span>
        </div>
        <div className="rapido-progress">
          <span style={{ width: `${incentives.dailyProgressPct}%` }} />
        </div>
        <p className="rapido-muted">
          Bonus unlock: {formatPrice(incentives.dailyBonusPaise)} at {incentives.dailyTargetJobs} trips
        </p>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Performance</h3>
        <div className="rapido-perf-grid">
          <div>
            <strong>{stats.acceptanceRate}%</strong>
            <span>Accept rate</span>
          </div>
          <div>
            <strong>{stats.cancellationRate}%</strong>
            <span>Cancellation</span>
          </div>
          <div>
            <strong>★ {stats.rating.toFixed(1)}</strong>
            <span>Rating</span>
          </div>
          <div>
            <strong>{stats.completedJobs}</strong>
            <span>Total rides</span>
          </div>
        </div>
      </section>

      <section className="rapido-card">
        <div className="rapido-card-head">
          <h3>Current activity</h3>
          {activeJob && (
            <Link href={`/partner/work/${activeJob.id}`}>Open trip</Link>
          )}
        </div>
        {!activeJob ? (
          <p className="rapido-muted">No active trip. Stay online for live bookings.</p>
        ) : (
          <div className="rapido-activity-trip">
            <strong>{activeJob.serviceName}</strong>
            <p>{activeJob.customerName}</p>
            <p className="rapido-muted">{activeJob.address}</p>
            <div className="rapido-activity-actions">
              <a href={mapsUrl(activeJob.lat, activeJob.lng, activeJob.address)} className="rapido-chip">
                Navigate
              </a>
              <a href={`tel:${activeJob.customerPhone}`} className="rapido-chip">
                Call
              </a>
            </div>
          </div>
        )}
        <div className="rapido-activity-pills">
          <span className={activeJob ? "active" : ""}>Active trip {activeJob ? 1 : 0}</span>
          <span className={activeJob?.status === "ASSIGNED" ? "active" : ""}>Pickup pending</span>
          <span className={activeJob?.status === "STARTED" ? "active" : ""}>Drop pending</span>
        </div>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Demand heatmap</h3>
        <p className="rapido-muted">High demand near {location.zone}</p>
        <CaptainDemandHeatmap heatmap={data.demandHeatmap} />
      </section>

      <section className="rapido-card">
        <div className="rapido-card-head">
          <h3>Wallet</h3>
          <Link href="/partner/wallet">Open wallet</Link>
        </div>
        <div className="rapido-wallet-row">
          <div>
            <span className="rapido-muted">Available</span>
            <strong>{formatPrice(wallet.availablePaise)}</strong>
          </div>
          <div>
            <span className="rapido-muted">Pending payout</span>
            <strong>{formatPrice(wallet.pendingPaise)}</strong>
          </div>
        </div>
        <ul className="rapido-wallet-history">
          {data.recentJobs.slice(0, 3).map((job) => (
            <li key={job.id}>
              <span>{job.serviceName}</span>
              <span>{job.earnedPaise ? formatPrice(job.earnedPaise) : "—"}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
