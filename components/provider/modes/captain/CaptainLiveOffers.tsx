"use client";

import { formatPrice } from "@/lib/format";
import { OFFER_TTL_SECONDS } from "@/lib/provider/constants";
import type { CaptainDashboardState } from "./dashboard-utils";
import { secondsLeft } from "./dashboard-utils";

type Props = {
  offers: CaptainDashboardState["offers"];
  busy: string | null;
  onRespond: (assignmentId: string, action: "accept" | "decline") => void;
  tick: number;
};

export function CaptainLiveOffers({ offers, busy, onRespond, tick }: Props) {
  void tick;

  if (offers.length === 0) {
    return (
      <div className="captain-live-empty">
        <p className="captain-live-pulse" aria-hidden />
        <p>Listening for live dispatch…</p>
        <p className="partner-muted">30-second alerts appear here when you&apos;re online.</p>
      </div>
    );
  }

  return (
    <div className="captain-live-list">
      {offers.map((offer) => {
        const remaining = secondsLeft(offer.expiresAt);
        const pct = Math.round((remaining / OFFER_TTL_SECONDS) * 100);
        const urgent = remaining <= 10;

        return (
          <article key={offer.id} className={`captain-live-offer ${urgent ? "is-urgent" : ""}`}>
            <div className="captain-live-offer-timer" style={{ width: `${pct}%` }} />
            <div className="captain-live-offer-head">
              <div>
                <span className="captain-live-tag">Live alert</span>
                <h3>{offer.booking.serviceName}</h3>
              </div>
              <span className={`captain-countdown ${urgent ? "is-urgent" : ""}`} aria-live="polite">
                {remaining}s
              </span>
            </div>
            <p className="partner-muted">{offer.booking.categoryName}</p>
            <p className="captain-live-address">{offer.booking.address}</p>
            <div className="captain-live-meta">
              <span>{offer.booking.customerName}</span>
              <span className="partner-price">{formatPrice(offer.booking.quotedAmount)}</span>
            </div>
            <div className="captain-quick-row">
              <button
                type="button"
                className="btn btn-primary captain-btn-accept"
                disabled={busy === offer.id || remaining === 0}
                onClick={() => onRespond(offer.id, "accept")}
              >
                Accept
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={busy === offer.id}
                onClick={() => onRespond(offer.id, "decline")}
              >
                Decline
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
