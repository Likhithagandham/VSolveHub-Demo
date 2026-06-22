"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { OFFER_TTL_SECONDS } from "@/lib/provider/constants";
import { LoadingState } from "@/components/ui/LoadingState";
import { useCaptainClock, useCaptainPoll } from "./hooks/useCaptainPoll";
import type { CaptainOffer } from "./types";
import { secondsLeft } from "./dashboard-utils";

export function CaptainLeadsScreen() {
  const router = useRouter();
  const [offers, setOffers] = useState<CaptainOffer[]>([]);
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

  void tick;

  if (loading) return <LoadingState label="Loading incentives…" variant="partner" />;

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Live offers & incentives</h1>
      <p className="rapido-muted">Offers expire in {OFFER_TTL_SECONDS}s. Full-screen alerts appear when online.</p>
      {offers.length === 0 ? (
        <div className="rapido-empty">
          <p>No live offers. Stay online on the dashboard.</p>
        </div>
      ) : (
        <ul className="rapido-offer-list">
          {offers.map((offer) => {
            const remaining = secondsLeft(offer.expiresAt);
            return (
              <li key={offer.id} className="rapido-offer-list-item">
                <div className="rapido-offer-list-head">
                  <strong>{offer.booking.customerName}</strong>
                  <span className="rapido-countdown-pill">{remaining}s</span>
                </div>
                <p>{offer.booking.serviceName}</p>
                <p className="rapido-muted">
                  {offer.booking.pickupKm} km pickup · {offer.booking.dropKm} km drop
                </p>
                <p className="rapido-earn">{formatPrice(Math.round(offer.booking.quotedAmount * 0.85))}</p>
                <div className="rapido-offer-actions">
                  <button type="button" className="rapido-btn rapido-btn-decline" disabled={busy === offer.id} onClick={() => respond(offer.id, "decline")}>
                    Decline
                  </button>
                  <button type="button" className="rapido-btn rapido-btn-accept" disabled={busy === offer.id} onClick={() => respond(offer.id, "accept")}>
                    Accept
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
