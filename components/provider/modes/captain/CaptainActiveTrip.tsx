"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { useCaptainPoll } from "./hooks/useCaptainPoll";
import { mapsUrl } from "./dashboard-utils";
import type { CaptainTripStage } from "./types";

type JobDetail = {
  id: string;
  ref: string;
  status: string;
  serviceName: string;
  categoryName: string;
  quotedAmount: number;
  paymentMethod: string;
  address: { full: string; lat: number | null; lng: number | null };
  customer: { name: string; phone: string };
};

function tripStage(status: string): CaptainTripStage {
  if (status === "COMPLETED") return "completed";
  if (status === "STARTED" || status === "ON_THE_WAY") return "riding";
  if (status === "ARRIVED") return "otp";
  return "pickup";
}

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CaptainActiveTrip({ bookingId }: { bookingId: string }) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [busy, setBusy] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [rideSeconds, setRideSeconds] = useState(0);
  const [rating, setRating] = useState(5);

  const load = useCallback(async () => {
    const res = await fetch(`/api/provider/work?id=${bookingId}`);
    if (res.ok) {
      const json = await res.json();
      setJob(json.job);
    }
  }, [bookingId]);

  useCaptainPoll(load, 3000);

  useEffect(() => {
    if (!job || tripStage(job.status) !== "riding") return;
    const id = setInterval(() => setRideSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [job]);

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

  if (!job) return <LoadingState label="Loading trip…" variant="partner" />;

  const stage = tripStage(job.status);
  const mapsHref = mapsUrl(job.address.lat, job.address.lng, job.address.full);
  const netEarnings = Math.round(job.quotedAmount * 0.85);

  return (
    <div className="rapido-trip">
      <div className="rapido-trip-steps">
        {(["pickup", "otp", "riding", "completed"] as CaptainTripStage[]).map((s, i) => (
          <span key={s} className={`rapido-trip-step ${stage === s ? "active" : ""} ${i < ["pickup", "otp", "riding", "completed"].indexOf(stage) ? "done" : ""}`}>
            {i + 1}
          </span>
        ))}
      </div>

      {stage === "pickup" && (
        <section className="rapido-trip-panel">
          <h2>Navigate to pickup</h2>
          <p className="rapido-trip-customer">{job.customer.name}</p>
          <div className="rapido-map-preview">
            <FlaticonIcon name="map-marker" size={32} color="var(--color-brand)" />
            <p>{job.address.full}</p>
          </div>
          <div className="rapido-trip-actions-row">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="rapido-btn rapido-btn-secondary">
              Open maps
            </a>
            <a href={`tel:${job.customer.phone}`} className="rapido-btn rapido-btn-secondary">
              Call
            </a>
            <Link href="/partner/support" className="rapido-btn rapido-btn-secondary">
              Chat
            </Link>
          </div>
          <button type="button" className="rapido-btn rapido-btn-accept rapido-btn-block" disabled={busy} onClick={() => action("arrived")}>
            ARRIVED
          </button>
        </section>
      )}

      {stage === "otp" && (
        <section className="rapido-trip-panel">
          <h2>Wait for customer OTP</h2>
          <p className="rapido-muted">Ask customer for 4-digit ride OTP (demo: 1234)</p>
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
            className="rapido-btn rapido-btn-accept rapido-btn-block"
            disabled={busy || otp.length < 4}
            onClick={() => action("start", otp)}
          >
            START RIDE
          </button>
        </section>
      )}

      {stage === "riding" && (
        <section className="rapido-trip-panel">
          <h2>Ride in progress</h2>
          <p className="rapido-trip-timer">{formatTimer(rideSeconds)}</p>
          <div className="rapido-map-preview">
            <FlaticonIcon name="road" size={28} color="#1565c0" />
            <p>{job.address.full}</p>
          </div>
          <p className="rapido-muted">Heading to destination · {job.serviceName}</p>
          <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="rapido-btn rapido-btn-secondary rapido-btn-block">
            View route
          </a>
          <button type="button" className="rapido-btn rapido-btn-accept rapido-btn-block" disabled={busy} onClick={() => action("complete")}>
            COMPLETE RIDE
          </button>
        </section>
      )}

      {stage === "completed" && (
        <section className="rapido-trip-panel rapido-trip-complete">
          <h2>Ride completed</h2>
          <p className="rapido-big-amount">{formatPrice(netEarnings)}</p>
          <p className="rapido-muted">{job.paymentMethod} payment</p>
          <label className="rapido-muted">Rate customer</label>
          <div className="rapido-rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" className={n <= rating ? "on" : ""} onClick={() => setRating(n)}>
                ★
              </button>
            ))}
          </div>
          <Link href="/partner/dashboard" className="rapido-btn rapido-btn-accept rapido-btn-block">
            Back to dashboard
          </Link>
        </section>
      )}
    </div>
  );
}
