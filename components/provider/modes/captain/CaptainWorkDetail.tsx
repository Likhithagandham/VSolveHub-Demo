"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { LoadingState } from "@/components/ui/LoadingState";
import { formatPrice } from "@/lib/format";

type JobDetail = {
  id: string;
  ref: string;
  status: string;
  serviceName: string;
  categoryName: string;
  issueDescription: string;
  slot: string;
  quotedAmount: number;
  address: { full: string; lat: number | null; lng: number | null };
  customer: { name: string; phone: string };
  statusLogs?: { status: string; at: string }[];
};

export function CaptainWorkDetail({ bookingId }: { bookingId: string }) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/provider/work?id=${bookingId}`);
    if (res.ok) {
      const json = await res.json();
      setJob(json.job);
    }
  }, [bookingId]);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load]);

  async function action(kind: "arrived" | "start" | "complete") {
    setBusy(true);
    await fetch("/api/provider/work", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, action: kind }),
    });
    setBusy(false);
    await load();
  }

  if (!job) return <LoadingState label="Loading job…" variant="partner" />;

  const mapsUrl =
    job.address.lat && job.address.lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${job.address.lat},${job.address.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address.full)}`;

  const nextAction =
    job.status === "ASSIGNED" || job.status === "ACCEPTED"
      ? "arrived"
      : job.status === "ARRIVED" || job.status === "ON_THE_WAY"
        ? "start"
        : job.status === "STARTED"
          ? "complete"
          : null;

  return (
    <div className="partner-stack">
      <Link href="/partner/work" className="partner-back">
        ← Active jobs
      </Link>

      <div className="partner-card">
        <div className="partner-offer-top">
          <h2 className="partner-card-title">{job.serviceName}</h2>
          <span className="partner-badge">{job.status}</span>
        </div>
        <p className="partner-muted">{job.ref} · {job.categoryName}</p>
        <p className="partner-price">{formatPrice(job.quotedAmount)}</p>
        <p>{new Date(job.slot).toLocaleString()}</p>
        {job.issueDescription && <p>{job.issueDescription}</p>}
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">Customer</h3>
        <p>{job.customer.name}</p>
        <div className="partner-action-row">
          <a href={`tel:${job.customer.phone}`} className="btn btn-secondary btn-sm">
            Call
          </a>
          <Link href={`/partner/leads`} className="btn btn-secondary btn-sm">
            Messages
          </Link>
        </div>
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">Location</h3>
        <p>{job.address.full}</p>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
          Navigate
        </a>
      </div>

      {nextAction && (
        <button
          type="button"
          className="btn btn-primary btn-block"
          disabled={busy}
          onClick={() => action(nextAction)}
        >
          {nextAction === "arrived" && "Mark arrived"}
          {nextAction === "start" && "Start work"}
          {nextAction === "complete" && "Complete job"}
        </button>
      )}

      {job.status === "COMPLETED" && (
        <p className="partner-success">Job completed. Earnings updated.</p>
      )}
    </div>
  );
}
