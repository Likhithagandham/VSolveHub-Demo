"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

type Job = {
  id: string;
  ref: string;
  status: string;
  serviceName: string;
  address: { full: string };
  customer: { name: string; phone: string };
  quotedAmount: number;
  slot: string;
};

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Assigned",
  ACCEPTED: "Assigned",
  ARRIVED: "Arrived",
  ON_THE_WAY: "On the way",
  STARTED: "In progress",
};

export function CaptainWorkScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/work");
    if (res.ok) {
      const json = await res.json();
      setJobs(json.jobs ?? []);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load]);

  if (jobs.length === 0) {
    return (
      <div className="partner-empty">
        <p>No active jobs.</p>
        <Link href="/partner/leads" className="partner-link">
          Check leads →
        </Link>
      </div>
    );
  }

  return (
    <div className="partner-stack">
      {jobs.map((job) => (
        <Link key={job.id} href={`/partner/work/${job.id}`} className="partner-card partner-job-card">
          <div className="partner-offer-top">
            <h3>{job.serviceName}</h3>
            <span className="partner-badge">{STATUS_LABELS[job.status] ?? job.status}</span>
          </div>
          <p className="partner-muted">{job.address.full}</p>
          <p>{job.customer.name}</p>
          <p className="partner-price">{formatPrice(job.quotedAmount)}</p>
        </Link>
      ))}
    </div>
  );
}
