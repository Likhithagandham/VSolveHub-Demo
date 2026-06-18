"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function OnlineToggle({ providerId = "prov-captain-1" }: { providerId?: string }) {
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const res = await fetch("/api/provider/online", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId }),
    });
    const data = await res.json();
    setOnline(data.isOnline);
    setLoading(false);
  }

  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="font-medium text-slate-900">Go online</p>
        <p className="text-sm text-slate-500">Receive 30s job alerts when online</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={online ? "success" : "default"}>{online ? "Online" : "Offline"}</Badge>
        <Button onClick={toggle} disabled={loading} variant={online ? "secondary" : "primary"}>
          {loading ? "..." : online ? "Go offline" : "Go online"}
        </Button>
      </div>
    </div>
  );
}

export function OfferAlert() {
  const [offer, setOffer] = useState<{
    waveId: string;
    bookingRef: string;
    expiresInSeconds: number;
    providers: { name: string }[];
  } | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/provider/offers");
      const data = await res.json();
      if (data.offer) {
        setOffer(data.offer);
        setCountdown(data.offer.expiresInSeconds);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  if (!offer) return null;

  return (
    <div className="card border-amber-300 bg-amber-50">
      <div className="flex items-center justify-between">
        <p className="font-bold text-amber-900">🚨 New job offer!</p>
        <Badge variant="warning">{countdown}s</Badge>
      </div>
      <p className="mt-1 text-sm text-amber-800">Ref: {offer.bookingRef}</p>
      <div className="mt-3 flex gap-2">
        <Button
          onClick={async () => {
            await fetch("/api/provider/offers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "accept", waveId: offer.waveId }),
            });
            setOffer(null);
          }}
        >
          Accept
        </Button>
        <Button
          variant="secondary"
          onClick={async () => {
            await fetch("/api/provider/offers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "decline", waveId: offer.waveId }),
            });
            setOffer(null);
          }}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}

const JOB_STATUSES = ["assigned", "en_route", "in_progress", "completed"] as const;

export function JobLifecycle({ jobId = "job-1" }: { jobId?: string }) {
  const [status, setStatus] = useState<string>("assigned");

  async function transition(next: string) {
    await fetch("/api/provider/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, action: next }),
    });
    setStatus(next);
  }

  const nextAction: Record<string, { label: string; next: string }> = {
    assigned: { label: "Start trip", next: "en_route" },
    en_route: { label: "Arrived — start job", next: "in_progress" },
    in_progress: { label: "Complete job", next: "completed" },
  };

  const action = nextAction[status];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Job #{jobId}</h3>
        <Badge variant={status === "completed" ? "success" : "info"}>{status}</Badge>
      </div>
      {action && (
        <Button className="mt-3" onClick={() => transition(action.next)}>
          {action.label}
        </Button>
      )}
      {status === "completed" && (
        <p className="mt-2 text-sm text-green-700">Job completed successfully!</p>
      )}
    </div>
  );
}

export function CaptainDashboard() {
  return (
    <div className="space-y-4">
      <OnlineToggle />
      <OfferAlert />
      <JobLifecycle />
    </div>
  );
}
