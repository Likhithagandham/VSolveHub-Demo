"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OFFER_TTL_SECONDS } from "@/lib/provider/constants";
import { formatPrice } from "@/lib/format";
import type { CaptainOffer } from "./types";
import { secondsLeft } from "./dashboard-utils";

type Props = {
  offer: CaptainOffer;
  busy: boolean;
  tick: number;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
};

export function CaptainLiveOfferModal({ offer, busy, tick, onAccept, onDecline }: Props) {
  void tick;
  const remaining = secondsLeft(offer.expiresAt);
  const pct = Math.round((remaining / OFFER_TTL_SECONDS) * 100);
  const netEarnings = Math.round(offer.booking.quotedAmount * 0.85);

  useEffect(() => {
    if (remaining === 0 && !busy) onDecline(offer.id);
  }, [remaining, busy, offer.id, onDecline]);

  return (
    <div className="rapido-offer-overlay" role="dialog" aria-modal="true" aria-label="New booking request">
      <div className="rapido-offer-modal">
        <div className="rapido-offer-timer-ring">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" className="rapido-offer-timer-bg" />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="rapido-offer-timer-fg"
              style={{ strokeDashoffset: `${276 - (276 * pct) / 100}` }}
            />
          </svg>
          <span className="rapido-offer-countdown">{remaining}s</span>
        </div>

        <p className="rapido-offer-eyebrow">New booking request</p>
        <h2 className="rapido-offer-customer">{offer.booking.customerName}</h2>
        <p className="rapido-offer-service">{offer.booking.serviceName}</p>

        <div className="rapido-offer-stats">
          <div>
            <span className="rapido-offer-stat-label">Pickup</span>
            <strong>{offer.booking.pickupKm ?? 1.2} km</strong>
          </div>
          <div>
            <span className="rapido-offer-stat-label">Drop</span>
            <strong>{offer.booking.dropKm ?? 4.5} km</strong>
          </div>
          <div>
            <span className="rapido-offer-stat-label">Earn</span>
            <strong className="rapido-offer-earn">{formatPrice(netEarnings)}</strong>
          </div>
        </div>

        <p className="rapido-offer-address">{offer.booking.address}</p>
        <p className="rapido-offer-meta">
          {offer.booking.paymentMode ?? "Cash"} · {offer.booking.categoryName}
        </p>

        <div className="rapido-offer-actions">
          <button
            type="button"
            className="rapido-btn rapido-btn-decline"
            disabled={busy || remaining === 0}
            onClick={() => onDecline(offer.id)}
          >
            Decline
          </button>
          <button
            type="button"
            className="rapido-btn rapido-btn-accept"
            disabled={busy || remaining === 0}
            onClick={() => onAccept(offer.id)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
