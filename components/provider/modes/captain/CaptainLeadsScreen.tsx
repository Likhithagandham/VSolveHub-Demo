"use client";

import { useCallback, useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { OFFER_TTL_SECONDS } from "@/lib/provider/constants";
import { LoadingState } from "@/components/ui/LoadingState";

type Offer = {
  id: string;
  status: string;
  expiresAt: string;
  booking: {
    ref: string;
    serviceName: string;
    categoryName: string;
    slot: string;
    quotedAmount: number;
    address: string;
    customerName: string;
  };
};

function secondsLeft(expiresAt: string) {
  return Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000));
}

export function CaptainLeadsScreen() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/offers");
    if (res.ok) {
      const json = await res.json();
      setOffers(json.offers ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const poll = setInterval(load, 3000);
    const clock = setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      clearInterval(poll);
      clearInterval(clock);
    };
  }, [load]);

  async function respond(assignmentId: string, action: "accept" | "decline") {
    setBusy(assignmentId);
    const res = await fetch("/api/provider/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, action }),
    });
    setBusy(null);
    if (res.ok) await load();
  }

  void tick;

  if (loading) return <LoadingState label="Loading offers…" variant="partner" />;

  return (
    <div className="partner-stack">
      <p className="partner-muted">
        Live offers expire in {OFFER_TTL_SECONDS}s. First accept wins — timer is synced from server.
      </p>

      {offers.length === 0 ? (
        <div className="partner-empty">
          <p>No live offers right now.</p>
          <p className="partner-muted">Stay online on the dashboard to receive dispatch waves.</p>
        </div>
      ) : (
        offers.map((offer) => {
          const remaining = secondsLeft(offer.expiresAt);
          const pct = Math.round((remaining / OFFER_TTL_SECONDS) * 100);
          return (
            <article key={offer.id} className="partner-offer-card">
              <div className="partner-offer-timer" style={{ width: `${pct}%` }} />
              <div className="partner-offer-body">
                <div className="partner-offer-top">
                  <h3>{offer.booking.serviceName}</h3>
                  <span className="partner-badge">{remaining}s</span>
                </div>
                <p className="partner-muted">{offer.booking.categoryName}</p>
                <p>{offer.booking.address}</p>
                <p className="partner-muted">
                  {offer.booking.customerName} · {new Date(offer.booking.slot).toLocaleString()}
                </p>
                <p className="partner-price">{formatPrice(offer.booking.quotedAmount)}</p>
                <div className="partner-action-row">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={busy === offer.id || remaining === 0}
                    onClick={() => respond(offer.id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={busy === offer.id}
                    onClick={() => respond(offer.id, "decline")}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}
