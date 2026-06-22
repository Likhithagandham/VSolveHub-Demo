"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { formatPrice } from "@/lib/format";
import { OFFER_TTL_SECONDS } from "@/lib/provider/constants";
import { LoadingState } from "@/components/ui/LoadingState";
import { usePortal } from "@/lib/provider/modes/portal/context";
import { getInitials } from "@/lib/provider/modes/portal/ui-helpers";
import { useCaptainPoll, useCaptainClock } from "@/components/provider/modes/captain/hooks/useCaptainPoll";
import { secondsLeft } from "@/components/provider/modes/captain/dashboard-utils";

type LiveOffer = {
  id: string;
  expiresAt: string;
  booking: {
    id: string;
    ref: string;
    serviceName: string;
    categoryName: string;
    slot: string;
    quotedAmount: number;
    address: string;
    customerName: string;
    customerPhone: string;
    paymentMode: string;
  };
};

export function PortalLiveInbox() {
  const { config } = usePortal();
  const router = useRouter();
  const [offers, setOffers] = useState<LiveOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [, setTick] = useState(0);

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/offers");
    if (res.ok) {
      const json = await res.json();
      setOffers(json.offers ?? []);
    }
    setLoading(false);
  }, []);

  useCaptainPoll(load, 3000);
  useCaptainClock(() => setTick((t) => t + 1));

  async function respond(id: string, action: "accept" | "decline") {
    setBusy(id);
    const res = await fetch("/api/provider/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId: id, action }),
    });
    setBusy(null);
    if (res.ok) {
      const json = await res.json();
      await load();
      if (action === "accept" && json.bookingId) {
        router.push(`/partner/work/${json.bookingId}`);
      }
    }
  }

  if (loading) return <LoadingState label="Loading requests…" variant="partner" />;

  return (
    <div className="mode-page">
      <header className="mode-page-header">
        <div>
          <h1 className="mode-page-title">{config.inboxTitle}</h1>
          <p className="mode-page-sub">
            {offers.length} live · offers expire in {OFFER_TTL_SECONDS}s
          </p>
        </div>
        <span className="mode-inbox-count">{offers.length}</span>
      </header>

      {offers.length === 0 ? (
        <div className="mode-empty-card">
          <FlaticonIcon name="comment-alt" size={28} color="var(--portal-primary)" />
          <p>No live requests right now. Stay available on your dashboard.</p>
        </div>
      ) : (
        offers.map((offer) => {
          const remaining = secondsLeft(offer.expiresAt);
          return (
            <article key={offer.id} className="mode-inbox-card mode-inbox-card--pending">
              <div className="mode-inbox-status-rail" aria-hidden />
              <div className="mode-inbox-head">
                <span className="mode-person-avatar mode-person-avatar--lg">
                  {getInitials(offer.booking.customerName)}
                </span>
                <div className="mode-inbox-head-text">
                  <span className="mode-status-chip mode-status-chip--pending">New request</span>
                  <h3>{offer.booking.serviceName}</h3>
                  <p className="mode-muted">{offer.booking.customerName}</p>
                </div>
                <span className="mode-badge mode-badge--alert">{remaining}s</span>
              </div>
              <p className="mode-inbox-detail">{offer.booking.address}</p>
              <div className="mode-inbox-meta mode-inbox-meta--chips">
                <div className="mode-meta-chip">
                  <FlaticonIcon name="calendar" size={14} />
                  <span>{new Date(offer.booking.slot).toLocaleString()}</span>
                </div>
                <div className="mode-meta-chip">
                  <FlaticonIcon name="wallet" size={14} />
                  <span>{formatPrice(offer.booking.quotedAmount)}</span>
                </div>
              </div>
              <div className="mode-action-row">
                <button
                  type="button"
                  className="mode-btn mode-btn-decline"
                  disabled={busy === offer.id}
                  onClick={() => respond(offer.id, "decline")}
                >
                  Decline
                </button>
                <button
                  type="button"
                  className="mode-btn mode-btn-accept mode-btn-glow"
                  disabled={busy === offer.id}
                  onClick={() => respond(offer.id, "accept")}
                >
                  Accept
                </button>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}
