"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StatusTimeline } from "./StatusTimeline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatDate } from "@/lib/format";
import { STATUS_LABELS, normalizeBookingStatus } from "@/lib/constants";
import { LoadingState } from "@/components/ui/LoadingState";

type TrackingData = {
  bookingRef: string;
  status: string;
  message: string;
  marketplace?: boolean;
  service: { id: string; name: string };
  issueDescription: string;
  mediaUrls: string[];
  slot: string;
  scheduleType: string;
  address: string;
  vendor: { id: string; name: string; phone: string; rating: number } | null;
  provider: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    etaMinutes: number;
  } | null;
  quotedAmount: number;
  finalAmountPaise: number;
  paymentStatus: string;
  paymentMethod: string | null;
  rating: number | null;
};

export function BookingTracker({ bookingRef }: { bookingRef: string }) {
  const router = useRouter();
  const [data, setData] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchStatus() {
      const res = await fetch(`/api/bookings/${bookingRef}`);
      if (!res.ok) {
        if (active) setError("Booking not found");
        return;
      }
      const json = await res.json();
      if (active) {
        setData(json);
        const status = normalizeBookingStatus(json.status);
        if (status === "COMPLETED" && json.rating == null) {
          router.push(`/booking/complete/${bookingRef}`);
        }
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [bookingRef, router]);

  async function cancelBooking() {
    if (!confirm("Cancel this booking?")) return;
    setCancelling(true);
    const res = await fetch(`/api/bookings/${bookingRef}/cancel`, { method: "POST" });
    setCancelling(false);
    if (res.ok) {
      const updated = await fetch(`/api/bookings/${bookingRef}`);
      if (updated.ok) setData(await updated.json());
    }
  }

  async function retrySearch() {
    setRetrying(true);
    const res = await fetch(`/api/bookings/${bookingRef}/retry`, { method: "POST" });
    setRetrying(false);
    if (res.ok) {
      const updated = await fetch(`/api/bookings/${bookingRef}`);
      if (updated.ok) setData(await updated.json());
    }
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  if (!data) {
    return <LoadingState label="Loading booking status…" variant="inline" />;
  }

  const status = normalizeBookingStatus(data.status);
  const canCancel = !["COMPLETED", "CANCELLED", "STARTED", "NO_WORKER_FOUND"].includes(status);
  const professional = data.provider ?? data.vendor;
  const showProvider =
    professional &&
    ["ASSIGNED", "PROVIDER_ARRIVING", "STARTED", "COMPLETED", "ACCEPTED", "ON_THE_WAY"].includes(
      status
    );

  return (
    <div className="stack-lg">
      <div className="card">
        <div className="flex-between">
          <div>
            <p className="text-sm text-muted">Booking reference</p>
            <p className="card-title">{data.bookingRef}</p>
          </div>
          <Badge status={status}>{STATUS_LABELS[status] ?? status}</Badge>
        </div>
        <p className="alert alert-info mt-2">{data.message}</p>
      </div>

      {status === "NO_WORKER_FOUND" && (
        <div className="card stack">
          <h2 className="section-title">No provider found</h2>
          <p className="text-sm text-muted">
            We could not find an available provider right now. You can retry, schedule for later, or
            get notified when someone is free.
          </p>
          <div className="booking-action-row">
            <Button onClick={retrySearch} loading={retrying} disabled={retrying}>
              Retry
            </Button>
            <Link href={`/booking?serviceId=${data.service.id}`} className="btn btn-secondary btn-sm">
              Schedule later
            </Link>
            <button type="button" className="btn btn-secondary btn-sm" disabled>
              Notify me
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="section-title">Status</h2>
        <StatusTimeline currentStatus={status} marketplace={data.marketplace} />
      </div>

      {showProvider && professional && (
        <div className="card stack">
          <h2 className="section-title">Your provider</h2>
          <p className="card-title">{professional.name}</p>
          <p className="text-sm text-muted">★ {professional.rating.toFixed(1)}</p>
          {data.provider && status === "ASSIGNED" && (
            <p className="text-sm">ETA ~{data.provider.etaMinutes} min</p>
          )}
          <div className="booking-action-row">
            <a href={`tel:${professional.phone}`} className="btn btn-secondary btn-sm">
              Call
            </a>
          </div>
        </div>
      )}

      <div className="card stack">
        <div>
          <p className="text-sm text-muted">Service</p>
          <p>{data.service.name}</p>
        </div>
        {data.issueDescription && (
          <div>
            <p className="text-sm text-muted">Description</p>
            <p>{data.issueDescription}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-muted">Schedule</p>
          <p>
            {data.scheduleType === "instant"
              ? "Instant booking"
              : `${formatDate(data.slot)} · ${new Date(data.slot).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">Address</p>
          <p>{data.address}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Payment</p>
          <p>
            {data.paymentMethod?.toUpperCase()} · {data.paymentStatus}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">Estimated total</p>
          <p className="detail-price">{formatPrice(data.finalAmountPaise ?? data.quotedAmount)}</p>
        </div>
      </div>

      {canCancel && (
        <Button variant="secondary" onClick={cancelBooking} disabled={cancelling} block>
          {cancelling ? "Cancelling…" : "Cancel booking"}
        </Button>
      )}

      {status === "COMPLETED" && (
        <Link
          href={`/booking/complete/${bookingRef}`}
          className="btn btn-primary btn-block"
          style={{ textAlign: "center" }}
        >
          View invoice &amp; rate
        </Link>
      )}
    </div>
  );
}
