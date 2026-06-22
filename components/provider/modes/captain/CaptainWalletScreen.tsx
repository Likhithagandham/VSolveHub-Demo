"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { LoadingState } from "@/components/ui/LoadingState";

type WalletData = {
  summary: { dailyPaise: number; weeklyPaise: number; monthlyPaise: number };
  earnings: { id: string; amountPaise: number; payoutStatus: string; earnedAt: string }[];
};

export function CaptainWalletScreen() {
  const [data, setData] = useState<WalletData | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    fetch("/api/provider/earnings")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <LoadingState label="Loading wallet…" variant="partner" />;

  const balance = data.earnings
    .filter((e) => e.payoutStatus === "PENDING")
    .reduce((s, e) => s + e.amountPaise, 0);
  const settled = data.earnings.filter((e) => e.payoutStatus !== "PENDING");

  async function requestSettlement() {
    setRequesting(true);
    await new Promise((r) => setTimeout(r, 600));
    setRequesting(false);
    setRequested(true);
  }

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Wallet</h1>

      <section className="rapido-card rapido-wallet-hero">
        <p className="rapido-muted">Available balance</p>
        <p className="rapido-big-amount">{formatPrice(balance)}</p>
        <p className="rapido-muted">Pending settlement to your bank account</p>
        <button
          type="button"
          className="rapido-btn rapido-btn-accept rapido-btn-block"
          disabled={requesting || balance === 0 || requested}
          onClick={requestSettlement}
        >
          {requested ? "Settlement requested" : requesting ? "Requesting…" : "Request settlement"}
        </button>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Payout history</h3>
        {settled.length === 0 ? (
          <p className="rapido-muted">No completed payouts yet.</p>
        ) : (
          <ul className="rapido-payout-list">
            {settled.map((e) => (
              <li key={e.id}>
                <div>
                  <strong>{formatPrice(e.amountPaise)}</strong>
                  <p className="rapido-muted">{new Date(e.earnedAt).toLocaleString()}</p>
                </div>
                <span className="rapido-badge">{e.payoutStatus}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Recent earnings</h3>
        <ul className="rapido-payout-list">
          {data.earnings.slice(0, 6).map((e) => (
            <li key={e.id}>
              <div>
                <strong>{formatPrice(e.amountPaise)}</strong>
                <p className="rapido-muted">{new Date(e.earnedAt).toLocaleDateString()}</p>
              </div>
              <span className="rapido-badge">{e.payoutStatus}</span>
            </li>
          ))}
        </ul>
        <Link href="/partner/earnings" className="rapido-text-link">
          View full earnings
        </Link>
      </section>
    </div>
  );
}
