"use client";

import { useEffect, useState } from "react";
import { StatusTimeline } from "./StatusTimeline";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatDate } from "@/lib/format";

type TrackingData = {
  bookingRef: string;
  status: string;
  message: string;
  service: { name: string };
  slot: string;
  address: string;
  quotedAmount: number;
};

export function BookingTracker({ ref: bookingRef }: { ref: string }) {
  const [data, setData] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchStatus() {
      const res = await fetch(`/api/bookings/${bookingRef}`);
      if (!res.ok) {
        if (active) setError("Booking not found");
        return;
      }
      const json = await res.json();
      if (active) setData(json);
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [bookingRef]);

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  if (!data) {
    return <p className="text-muted">Loading booking status…</p>;
  }

  return (
    <div className="stack-lg">
      <div className="card">
        <div className="flex-between">
          <div>
            <p className="text-sm text-muted">Booking reference</p>
            <p className="card-title">{data.bookingRef}</p>
          </div>
          <Badge status={data.status}>{data.status.replace(/_/g, " ")}</Badge>
        </div>
        <p className="alert alert-info mt-2">{data.message}</p>
      </div>

      <div className="card">
        <h2 className="section-title">Status</h2>
        <StatusTimeline currentStatus={data.status} />
      </div>

      <div className="card stack">
        <div>
          <p className="text-sm text-muted">Service</p>
          <p>{data.service.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Time slot</p>
          <p>{formatDate(data.slot)} — {new Date(data.slot).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Address</p>
          <p>{data.address}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Amount</p>
          <p className="detail-price">{formatPrice(data.quotedAmount)}</p>
        </div>
      </div>
    </div>
  );
}
