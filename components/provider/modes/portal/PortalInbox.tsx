"use client";

import { useState } from "react";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { usePortal } from "@/lib/provider/modes/portal/context";
import type { PortalRequest } from "@/lib/provider/modes/portal/data";
import { getInitials, getRequestStatusLabel } from "@/lib/provider/modes/portal/ui-helpers";

type CounterOffer = {
  amount: string;
  note: string;
  sent: boolean;
};

export function PortalInbox() {
  const { config, data } = usePortal();
  const [requests, setRequests] = useState<PortalRequest[]>(data.requests);
  const [activeNegotiateId, setActiveNegotiateId] = useState<string | null>(null);
  const [counters, setCounters] = useState<Record<string, CounterOffer>>({});

  function respond(id: string, status: PortalRequest["status"]) {
    setActiveNegotiateId(null);
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function openNegotiate(request: PortalRequest) {
    setActiveNegotiateId(request.id);
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: "negotiating" } : r))
    );
    setCounters((prev) => ({
      ...prev,
      [request.id]: prev[request.id] ?? { amount: request.amount, note: "", sent: false },
    }));
  }

  function updateCounter(id: string, patch: Partial<CounterOffer>) {
    setCounters((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
  }

  function sendCounter(id: string) {
    const counter = counters[id];
    if (!counter?.amount.trim()) return;

    setCounters((prev) => ({
      ...prev,
      [id]: { ...prev[id], sent: true },
    }));
    setActiveNegotiateId(null);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "negotiating", badge: "Counter sent" } : r
      )
    );
  }

  function cancelNegotiate(id: string) {
    const original = data.requests.find((d) => d.id === id);
    setActiveNegotiateId(null);
    setCounters((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (original) {
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...original } : r)));
    }
  }

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="mode-page">
      <header className="mode-page-header">
        <div>
          <h1 className="mode-page-title">{config.inboxTitle}</h1>
          <p className="mode-page-sub">{pendingCount} open · negotiate or respond below</p>
        </div>
        <span className="mode-inbox-count">{requests.length}</span>
      </header>

      {requests.map((r) => {
        const counter = counters[r.id];
        const isFormOpen = activeNegotiateId === r.id;
        const counterSent = counter?.sent === true;
        const canAct = r.status === "pending" || r.status === "negotiating";

        return (
          <article key={r.id} className={`mode-inbox-card mode-inbox-card--${r.status}`}>
            <div className="mode-inbox-status-rail" aria-hidden />
            <div className="mode-inbox-head">
              <span className="mode-person-avatar mode-person-avatar--lg">{getInitials(r.customer)}</span>
              <div className="mode-inbox-head-text">
                <span className={`mode-status-chip mode-status-chip--${r.status}`}>
                  {getRequestStatusLabel(r.status)}
                </span>
                <h3>{r.title}</h3>
                <p className="mode-muted">{r.customer}</p>
              </div>
              {r.badge && <span className="mode-badge mode-badge--alert">{r.badge}</span>}
            </div>

            <p className="mode-inbox-detail">{r.detail}</p>

            <div className="mode-inbox-meta mode-inbox-meta--chips">
              {r.duration && (
                <div className="mode-meta-chip">
                  <FlaticonIcon name="clock" size={14} />
                  <span>{r.duration}</span>
                </div>
              )}
              {r.frequency && (
                <div className="mode-meta-chip">
                  <FlaticonIcon name="calendar" size={14} />
                  <span>{r.frequency}</span>
                </div>
              )}
              {r.schedule && (
                <div className="mode-meta-chip">
                  <FlaticonIcon name="calendar" size={14} />
                  <span>{r.schedule}</span>
                </div>
              )}
              {r.venue && (
                <div className="mode-meta-chip">
                  <FlaticonIcon name="marker" size={14} />
                  <span>{r.venue}</span>
                </div>
              )}
              {r.guests && (
                <div className="mode-meta-chip">
                  <FlaticonIcon name="users-alt" size={14} />
                  <span>{r.guests} guests</span>
                </div>
              )}
              {r.budget && (
                <div className="mode-meta-chip">
                  <FlaticonIcon name="wallet" size={14} />
                  <span>Budget {r.budget}</span>
                </div>
              )}
              {r.salary && (
                <div className="mode-meta-chip">
                  <FlaticonIcon name="wallet" size={14} />
                  <span>{r.salary}</span>
                </div>
              )}
            </div>

            <div className="mode-inbox-amount-row">
              <span className="mode-muted">Quoted</span>
              <span className="mode-amount-lg">{r.amount}</span>
            </div>

            {counterSent && counter && (
              <div className="mode-negotiate-sent">
                <FlaticonIcon name="comment-alt" size={18} color="var(--portal-primary)" />
                <div>
                  <strong>Your counter-offer: {counter.amount}</strong>
                  {counter.note && <p className="mode-muted">{counter.note}</p>}
                  <p className="mode-muted">Awaiting customer response…</p>
                </div>
              </div>
            )}

            {isFormOpen && counter && (
              <section className="mode-negotiate-panel">
                <h4>Send a counter-offer</h4>
                <label className="form-label" htmlFor={`amount-${r.id}`}>
                  Proposed amount
                </label>
                <input
                  id={`amount-${r.id}`}
                  className="form-input mode-field-block"
                  value={counter.amount}
                  onChange={(e) => updateCounter(r.id, { amount: e.target.value })}
                  placeholder="e.g. ₹12,000"
                />
                <label className="form-label" htmlFor={`note-${r.id}`}>
                  Message to customer
                </label>
                <textarea
                  id={`note-${r.id}`}
                  className="form-input mode-field-block"
                  rows={3}
                  value={counter.note}
                  onChange={(e) => updateCounter(r.id, { note: e.target.value })}
                  placeholder="Explain your revised rate or schedule…"
                />
                <div className="mode-action-row">
                  <button type="button" className="mode-btn mode-btn-decline" onClick={() => cancelNegotiate(r.id)}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mode-btn mode-btn-accept"
                    onClick={() => sendCounter(r.id)}
                    disabled={!counter.amount.trim()}
                  >
                    Send counter-offer
                  </button>
                </div>
              </section>
            )}

            {canAct && !isFormOpen && (
              <div className="mode-action-row mode-action-row--inbox">
                <button type="button" className="mode-btn mode-btn-decline" onClick={() => respond(r.id, "declined")}>
                  Decline
                </button>
                <button type="button" className="mode-btn mode-btn-secondary" onClick={() => openNegotiate(r)}>
                  {counterSent ? "Revise offer" : "Negotiate"}
                </button>
                <button type="button" className="mode-btn mode-btn-accept" onClick={() => respond(r.id, "accepted")}>
                  Accept
                </button>
              </div>
            )}

            {!canAct && (
              <p className={`mode-status-line mode-status-line--${r.status}`}>Status: {r.status}</p>
            )}
          </article>
        );
      })}
    </div>
  );
}
