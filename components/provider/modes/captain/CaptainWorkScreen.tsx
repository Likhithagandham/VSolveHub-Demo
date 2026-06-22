"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";
import { useCaptainPoll } from "./hooks/useCaptainPoll";

type Job = {
  id: string;
  ref: string;
  status: string;
  serviceName: string;
  quotedAmount: number;
  slot: string;
  customer: { name: string };
};

export function CaptainWorkScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/work");
    if (res.ok) {
      const json = await res.json();
      setJobs(json.jobs ?? []);
    }
    setLoading(false);
  }, []);

  useCaptainPoll(load, 5000);

  if (loading) return <LoadingState label="Loading rides…" variant="partner" />;

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Ride history</h1>
      {jobs.length === 0 ? (
        <div className="rapido-empty">
          <p>No active rides.</p>
          <Link href="/partner/dashboard" className="rapido-btn rapido-btn-accept">
            Go online
          </Link>
        </div>
      ) : (
        <ul className="rapido-ride-list">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link href={`/partner/work/${job.id}`}>
                <div className="rapido-ride-top">
                  <strong>{job.serviceName}</strong>
                  <span className="rapido-badge">{job.status.replace(/_/g, " ")}</span>
                </div>
                <p className="rapido-muted">{job.customer.name} · {job.ref}</p>
                <div className="rapido-ride-bottom">
                  <span>{new Date(job.slot).toLocaleString()}</span>
                  <strong>{formatPrice(job.quotedAmount)}</strong>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
