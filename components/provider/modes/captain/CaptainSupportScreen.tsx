"use client";

import { useState } from "react";

type SupportCategory = "issue" | "dispute" | "emergency" | "help";

const SUPPORT_OPTIONS: {
  id: SupportCategory;
  label: string;
  desc: string;
  emergency?: boolean;
}[] = [
  { id: "issue", label: "Raise an issue", desc: "Report app or payment problems" },
  { id: "dispute", label: "Booking dispute", desc: "Challenge fare or cancellation" },
  { id: "emergency", label: "Emergency support", desc: "Urgent on-road assistance", emergency: true },
  { id: "help", label: "Help center", desc: "FAQs and how-to guides" },
];

const FAQ_ITEMS = [
  { q: "How do I go online?", a: "Open Home and tap the large ONLINE toggle. Stay on the dashboard to receive live offers." },
  { q: "When do I get paid?", a: "Earnings move to Wallet after each completed ride. Request settlement from the Wallet page." },
  { q: "How do live offers work?", a: "You have 30 seconds to accept or decline. First accept wins the booking." },
  { q: "What is the ride OTP?", a: "Ask the customer for their 4-digit OTP after you arrive. Demo OTP is 1234." },
];

export function CaptainSupportScreen() {
  const [message, setMessage] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [category, setCategory] = useState<SupportCategory>("issue");
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const active = SUPPORT_OPTIONS.find((o) => o.id === category)!;

  function selectCategory(id: SupportCategory) {
    setCategory(id);
    setSent(false);
    setMessage("");
    setBookingRef("");
  }

  async function submit() {
    if (category === "help") return;
    if (category === "dispute" && !bookingRef.trim()) return;
    if (!message.trim() && category !== "emergency") return;
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
    setMessage("");
    setBookingRef("");
  }

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Support</h1>

      <div className="rapido-support-grid" role="tablist" aria-label="Support categories">
        {SUPPORT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={category === opt.id}
            className={`rapido-support-card ${category === opt.id ? "active" : ""} ${opt.emergency ? "rapido-support-card--emergency" : ""}`}
            onClick={() => selectCategory(opt.id)}
          >
            <strong>{opt.label}</strong>
            <span className="rapido-muted">{opt.desc}</span>
          </button>
        ))}
      </div>

      <section className="rapido-card" role="tabpanel" aria-labelledby={`support-tab-${category}`}>
        <h3 className="rapido-card-head">{active.label}</h3>

        {category === "emergency" && (
          <>
            <p className="rapido-muted">For immediate danger or accidents on the road, call emergency services first.</p>
            <a href="tel:112" className="rapido-btn rapido-btn-accept rapido-btn-block rapido-emergency-call">
              Call 112 — Emergency
            </a>
            <p className="rapido-muted rapido-support-note">
              VSolve captain safety line: <a href="tel:18001234567">1800-123-4567</a>
            </p>
            <label className="form-label" htmlFor="support-msg">
              Quick alert to dispatch (optional)
            </label>
            <textarea
              id="support-msg"
              className="form-input rapido-textarea"
              rows={3}
              placeholder="Share location or situation…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </>
        )}

        {category === "dispute" && (
          <>
            <label className="form-label" htmlFor="booking-ref">
              Booking reference
            </label>
            <input
              id="booking-ref"
              className="form-input rapido-field-block"
              placeholder="e.g. VSH-12345"
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value)}
            />
            <label className="form-label" htmlFor="support-msg">
              Describe the dispute
            </label>
            <textarea
              id="support-msg"
              className="form-input rapido-textarea"
              rows={4}
              placeholder="Fare issue, cancellation, customer behaviour…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </>
        )}

        {category === "issue" && (
          <>
            <p className="rapido-muted">Report app bugs, payment delays, or account problems.</p>
            <label className="form-label" htmlFor="support-msg">
              Describe your issue
            </label>
            <textarea
              id="support-msg"
              className="form-input rapido-textarea"
              rows={4}
              placeholder="What happened?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </>
        )}

        {category === "help" && (
          <ul className="rapido-faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <li key={item.q} className="rapido-faq-item">
                <button
                  type="button"
                  className="rapido-faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                  <span aria-hidden>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="rapido-muted rapido-faq-a">{item.a}</p>}
              </li>
            ))}
          </ul>
        )}

        {sent && (
          <p className="rapido-success">
            {category === "emergency"
              ? "Alert sent to dispatch. Stay safe — help is on the way if you called emergency services."
              : "Ticket submitted. We'll respond within 24 hours."}
          </p>
        )}

        {category !== "help" && (
          <button
            type="button"
            className="rapido-btn rapido-btn-accept rapido-btn-block"
            disabled={
              category === "dispute"
                ? !bookingRef.trim() || !message.trim()
                : category === "emergency"
                  ? !message.trim()
                  : !message.trim()
            }
            onClick={submit}
          >
            {category === "emergency" ? "Send alert" : "Submit ticket"}
          </button>
        )}
      </section>
    </div>
  );
}
