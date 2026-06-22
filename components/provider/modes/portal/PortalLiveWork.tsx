"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";
import { usePortal } from "@/lib/provider/modes/portal/context";
import { useCaptainPoll } from "@/components/provider/modes/captain/hooks/useCaptainPoll";

type Job = {
  id: string;
  ref: string;
  status: string;
  serviceName: string;
  quotedAmount: number;
  slot: string;
  customer: { name: string };
};

export function PortalLiveWork() {
  const { config } = usePortal();
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

  useCaptainPoll(load, 3000);

  if (loading) return <LoadingState label="Loading work…" variant="partner" />;

  return (
    <div className="mode-page">
      <header className="mode-page-header">
        <div>
          <h1 className="mode-page-title">{config.workTitle}</h1>
          <p className="mode-page-sub">{jobs.length} active jobs</p>
        </div>
      </header>

      {jobs.length === 0 ? (
        <div className="mode-empty-card">
          <FlaticonIcon name="briefcase" size={28} color="var(--portal-primary)" />
          <p>No active jobs. Accept a request from your inbox.</p>
          <Link href="/partner/leads" className="mode-btn mode-btn-accept">
            View requests
          </Link>
        </div>
      ) : (
        <ul className="mode-work-list">
          {jobs.map((job, i) => (
            <li key={job.id}>
              <Link href={`/partner/work/${job.id}`} className="mode-work-card">
                <div className="mode-work-card-top">
                  <span className={`mode-work-thumb mode-work-thumb--${i % 4}`}>
                    <FlaticonIcon name="briefcase" size={20} color="var(--portal-primary)" />
                  </span>
                  <div className="mode-work-card-body">
                    <div className="mode-list-row">
                      <div>
                        <strong>{job.serviceName}</strong>
                        <p className="mode-muted">
                          {job.customer.name} · {job.ref}
                        </p>
                      </div>
                      <div className="mode-work-right">
                        <span className="mode-amount">{formatPrice(job.quotedAmount)}</span>
                        <span className="mode-badge">{job.status.replace(/_/g, " ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
