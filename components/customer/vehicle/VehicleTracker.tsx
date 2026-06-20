"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { VEHICLE_STATUS_LABELS } from "@/lib/vehicle/constants";

type TrackingData = {
  bookingRef: string;
  flowType: string;
  status: string;
  message: string;
  quotedAmount: number;
  depositPaise: number;
  details: Record<string, unknown>;
  driver: { name: string; phone: string; rating: number; vehicleNumber: string } | null;
  rentalAsset: { name: string; brand: string; model: string } | null;
  vendor: { name: string; phone: string; rating: number } | null;
  statusLogs: { status: string }[];
};

export function VehicleTracker({ bookingRef }: { bookingRef: string }) {
  const [data, setData] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let active = true;
    async function fetchStatus() {
      const res = await fetch(`/api/vehicle/bookings/${bookingRef}`);
      if (!res.ok) {
        if (active) setError("Booking not found");
        return;
      }
      if (active) setData(await res.json());
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [bookingRef]);

  async function cancelBooking() {
    if (!confirm("Cancel this booking?")) return;
    setCancelling(true);
    const res = await fetch(`/api/vehicle/bookings/${bookingRef}/cancel`, { method: "POST" });
    setCancelling(false);
    if (res.ok) {
      const updated = await fetch(`/api/vehicle/bookings/${bookingRef}`);
      if (updated.ok) setData(await updated.json());
    }
  }

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!data) return <p className="text-muted">Loading…</p>;

  const canCancel = !["COMPLETED", "CANCELLED"].includes(data.status);
  const assignee = data.driver ?? data.vendor;

  return (
    <div className="stack-lg">
      <div className="card">
        <div className="flex-between">
          <div>
            <p className="text-sm text-muted">Booking reference</p>
            <p className="card-title">{data.bookingRef}</p>
          </div>
          <Badge status={data.status}>
            {VEHICLE_STATUS_LABELS[data.status] ?? data.status}
          </Badge>
        </div>
        <p className="alert alert-info mt-2">{data.message}</p>
      </div>

      <div className="card">
        <h2 className="section-title">Status timeline</h2>
        <div className="stack">
          {data.statusLogs.map((log, i) => (
            <div key={i} className="flex-between text-sm">
              <span>{VEHICLE_STATUS_LABELS[log.status] ?? log.status}</span>
              {log.status === data.status && <span className="text-muted">Current</span>}
            </div>
          ))}
        </div>
      </div>

      {data.rentalAsset && (
        <div className="card">
          <h2 className="section-title">Vehicle</h2>
          <p className="card-title">{data.rentalAsset.name}</p>
          <p className="text-sm text-muted">
            {data.rentalAsset.brand} {data.rentalAsset.model}
          </p>
        </div>
      )}

      {assignee && (
        <div className="card">
          <h2 className="section-title">{data.driver ? "Driver" : "Mechanic"}</h2>
          <p className="card-title">{assignee.name}</p>
          <p className="text-sm text-muted">
            ★ {assignee.rating.toFixed(1)}
            {data.driver ? ` · ${data.driver.vehicleNumber}` : ""}
          </p>
          {assignee.phone ? (
            <a href={`tel:${assignee.phone}`} className="btn btn-secondary btn-sm mt-2">
              Call
            </a>
          ) : null}
        </div>
      )}

      <div className="card">
        <div className="flex-between">
          <span>Amount</span>
          <span className="card-title">{formatPrice(data.quotedAmount)}</span>
        </div>
        {data.depositPaise > 0 && (
          <p className="text-sm text-muted mt-1">
            Includes {formatPrice(data.depositPaise)} security deposit
          </p>
        )}
      </div>

      <div className="booking-action-row">
        {canCancel && (
          <Button variant="secondary" onClick={cancelBooking} disabled={cancelling}>
            {cancelling ? "Cancelling…" : "Cancel booking"}
          </Button>
        )}
        <Link href="/services?category=vehicle-services" className="btn btn-primary">
          Book another
        </Link>
      </div>
    </div>
  );
}
