"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";
import { useCaptainPoll } from "@/components/provider/modes/captain/hooks/useCaptainPoll";

type JobDetail = {
  id: string;
  ref: string;
  status: string;
  serviceName: string;
  quotedAmount: number;
  paymentMethod: string;
  address: { full: string; lat: number | null; lng: number | null };
  customer: { name: string; phone: string };
};

function workStage(status: string) {
  if (status === "COMPLETED") return "completed";
  if (status === "STARTED") return "working";
  if (status === "PROVIDER_ARRIVING" || status === "ARRIVED") return "arrived";
  return "assigned";
}

export function PortalActiveJob({ bookingId }: { bookingId: string }) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [busy, setBusy] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await fetch(`/api/provider/work?id=${bookingId}`);
    if (res.ok) {
      const json = await res.json();
      setJob(json.job);
    }
  }, [bookingId]);

  useCaptainPoll(load, 3000);

  async function action(kind: "arrived" | "start" | "complete", rideOtp?: string) {
    setBusy(true);
    setError("");
    const res = await fetch("/api/provider/work", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, action: kind, otp: rideOtp }),
    });
    setBusy(false);
    if (!res.ok) {
      const json = await res.json().catch(() => null);
      setError(json?.error ?? "Action failed");
      return;
    }
    setOtp("");
    await load();
  }

  if (!job) return <LoadingState label="Loading job…" variant="partner" />;

  const stage = workStage(job.status);
  const mapsHref =
    job.address.lat != null && job.address.lng != null
      ? `https://www.google.com/maps/search/?api=1&query=${job.address.lat},${job.address.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address.full)}`;

  return (
    <div className="mode-page">
      <header className="mode-page-header">
        <div>
          <h1 className="mode-page-title">{job.serviceName}</h1>
          <p className="mode-page-sub">{job.ref} · {job.status.replace(/_/g, " ")}</p>
        </div>
      </header>

      <div className="mode-work-card">
        <p className="mode-muted">{job.customer.name}</p>
        <p>{job.address.full}</p>
        <p className="mode-amount">{formatPrice(job.quotedAmount)}</p>
      </div>

      {stage === "assigned" && (
        <div className="mode-action-row mode-action-row--top">
          <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="mode-btn mode-btn-secondary">
            <FlaticonIcon name="map-marker" size={14} />
            Navigate
          </a>
          <a href={`tel:${job.customer.phone}`} className="mode-btn mode-btn-secondary">
            Call
          </a>
          <button
            type="button"
            className="mode-btn mode-btn-accept mode-btn-glow"
            disabled={busy}
            onClick={() => action("arrived")}
          >
            Arrived
          </button>
        </div>
      )}

      {stage === "arrived" && (
        <div className="mode-work-card stack">
          <p className="mode-muted">Enter customer OTP to start (demo: 1234)</p>
          <input
            className="rapido-otp-input"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
          {error && <p className="rapido-error">{error}</p>}
          <button
            type="button"
            className="mode-btn mode-btn-accept mode-btn-block"
            disabled={busy || otp.length < 4}
            onClick={() => action("start", otp)}
          >
            Start work
          </button>
        </div>
      )}

      {stage === "working" && (
        <button
          type="button"
          className="mode-btn mode-btn-accept mode-btn-block"
          disabled={busy}
          onClick={() => action("complete")}
        >
          Complete work
        </button>
      )}

      {stage === "completed" && (
        <div className="mode-empty-card">
          <FlaticonIcon name="check-circle" size={28} color="var(--portal-primary)" />
          <p>Job completed successfully.</p>
          <Link href="/partner/work" className="mode-btn mode-btn-accept">
            Back to work
          </Link>
        </div>
      )}
    </div>
  );
}
