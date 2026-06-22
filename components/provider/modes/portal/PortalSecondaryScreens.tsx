"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortal } from "@/lib/provider/modes/portal/context";

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mode-page">
      <h1 className="mode-page-title">{title}</h1>
      {children}
    </div>
  );
}

export function PortalWalletScreen() {
  const { data } = usePortal();
  const monthStat = data.earnings.stats.find((s) => s.label === "Month")?.value ?? "₹0";

  return (
    <Page title="Wallet">
      <section className="mode-card mode-wallet-hero">
        <p className="mode-muted">Available balance</p>
        <p className="mode-amount-xl">{monthStat}</p>
        <p className="mode-muted">Pending settlement to your bank account</p>
        <button type="button" className="mode-btn mode-btn-accept mode-btn-block">
          Request settlement
        </button>
      </section>
      <section className="mode-card">
        <h3>Recent payouts</h3>
        <ul className="mode-list">
          {data.earnings.rows.map((row) => (
            <li key={row.id} className="mode-list-row">
              <div>
                <strong>{row.title}</strong>
                <p className="mode-muted">{row.subtitle}</p>
              </div>
              <span className="mode-amount">{row.amount}</span>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}

const SUPPORT_TABS = ["Issue", "Dispute", "Emergency", "Help"] as const;

export function PortalSupportScreen() {
  const [tab, setTab] = useState<(typeof SUPPORT_TABS)[number]>("Issue");

  return (
    <Page title="Support">
      <div className="mode-tabs">
        {SUPPORT_TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={`mode-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Issue" && (
        <section className="mode-card">
          <h3>Report an issue</h3>
          <textarea className="form-input mode-field-block" rows={4} placeholder="Describe the issue…" />
          <button type="button" className="mode-btn mode-btn-accept mode-btn-block">Submit ticket</button>
        </section>
      )}
      {tab === "Dispute" && (
        <section className="mode-card">
          <h3>Open a dispute</h3>
          <p className="mode-muted">Select a booking from your inbox to raise a payment or service dispute.</p>
          <Link href="/partner/leads" className="mode-btn mode-btn-secondary mode-btn-block">View bookings</Link>
        </section>
      )}
      {tab === "Emergency" && (
        <section className="mode-card mode-card--alert">
          <h3>Emergency</h3>
          <p className="mode-muted">For urgent safety issues, call VSolve support immediately.</p>
          <a href="tel:1800123456" className="mode-btn mode-btn-accept mode-btn-block">Call 1800-123-456</a>
        </section>
      )}
      {tab === "Help" && (
        <section className="mode-card">
          <h3>FAQ</h3>
          <ul className="mode-faq">
            <li><strong>How do payouts work?</strong><p className="mode-muted">Earnings settle weekly to your linked bank account.</p></li>
            <li><strong>Can I pause availability?</strong><p className="mode-muted">Use Schedule → Request leave or update availability from Home.</p></li>
          </ul>
        </section>
      )}
    </Page>
  );
}

export function PortalSettingsScreen() {
  const [push, setPush] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <Page title="Settings">
      <section className="mode-card">
        <h3>Notifications</h3>
        <label className="mode-toggle-row">
          <span>Push notifications</span>
          <input type="checkbox" checked={push} onChange={(e) => setPush(e.target.checked)} />
        </label>
        <label className="mode-toggle-row">
          <span>SMS alerts</span>
          <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} />
        </label>
      </section>
      <section className="mode-card">
        <h3>Language</h3>
        <select className="form-input mode-field-block" defaultValue="en">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
        </select>
      </section>
    </Page>
  );
}

export function PortalCertificatesScreen() {
  const { data } = usePortal();
  return (
    <Page title="Certificates">
      <ul className="mode-list">
        {data.profile.certs.map((c) => (
          <li key={c} className="mode-card mode-list-row">
            <span>{c}</span>
            <span className="mode-badge">Verified</span>
          </li>
        ))}
      </ul>
      <button type="button" className="mode-btn mode-btn-secondary mode-btn-block">Upload certificate</button>
    </Page>
  );
}

export function PortalClientsScreen() {
  const { data } = usePortal();
  return (
    <Page title="Clients">
      <ul className="mode-list">
        {data.workItems.map((w) => (
          <li key={w.id} className="mode-card">
            <div className="mode-list-row">
              <div>
                <strong>{w.title}</strong>
                <p className="mode-muted">{w.subtitle}</p>
              </div>
              {w.badge && <span className="mode-badge">{w.badge}</span>}
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}

export function PortalAnalyticsScreen() {
  const { data } = usePortal();
  return (
    <Page title="Stock analytics">
      <div className="mode-stat-grid">
        {data.stats.map((s) => (
          <div key={s.label} className="mode-stat-card">
            <span className="mode-stat-value">{s.value}</span>
            <span className="mode-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
      <section className="mode-card">
        <h3>Most rented</h3>
        <p className="mode-muted">5 KVA Generator — 78% utilization this month</p>
      </section>
      <section className="mode-card">
        <h3>Downtime</h3>
        <p className="mode-muted">2 items in maintenance · 4.2% fleet downtime</p>
      </section>
    </Page>
  );
}

export function PortalMaintenanceScreen() {
  const { data } = usePortal();
  const items = data.workItems.filter((i) => i.status === "maintenance" || i.badge === "Maintenance");
  return (
    <Page title="Maintenance">
      {items.length === 0 ? (
        <p className="mode-muted">No items currently in maintenance.</p>
      ) : (
        <ul className="mode-list">
          {items.map((item) => (
            <li key={item.id} className="mode-card mode-list-row">
              <div>
                <strong>{item.title}</strong>
                <p className="mode-muted">{item.subtitle}</p>
              </div>
              <span className="mode-badge mode-badge--alert">In repair</span>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}

export function PortalPropertiesScreen() {
  const { data } = usePortal();
  return (
    <Page title="Properties">
      <ul className="mode-list">
        {data.workItems.map((p) => (
          <li key={p.id} className="mode-card">
            <div className="mode-list-row">
              <div>
                <strong>{p.title}</strong>
                <p className="mode-muted">{p.subtitle}</p>
                {p.meta && <p className="mode-muted">{p.meta}</p>}
              </div>
              {p.badge && <span className="mode-badge">{p.badge}</span>}
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}

export function PortalHostDocumentsScreen() {
  return (
    <Page title="Documents">
      <ul className="mode-list">
        {["Ownership deed — Jubilee PG", "Rental agreement template", "Fire safety certificate"].map((doc) => (
          <li key={doc} className="mode-card mode-list-row">
            <span>{doc}</span>
            <span className="mode-badge">Verified</span>
          </li>
        ))}
      </ul>
      <button type="button" className="mode-btn mode-btn-secondary mode-btn-block">Upload document</button>
    </Page>
  );
}

export function PortalPortfolioScreen() {
  return (
    <Page title="Portfolio">
      <div className="mode-portfolio-grid">
        {["Wedding — Farmhouse", "Corporate gala", "Birthday décor"].map((label) => (
          <div key={label} className="mode-portfolio-tile">
            <div className="mode-portfolio-thumb" />
            <p>{label}</p>
          </div>
        ))}
      </div>
      <section className="mode-card">
        <h3>Testimonials</h3>
        <p className="mode-muted">“Amazing work on our wedding!” — Priya & Arjun</p>
      </section>
    </Page>
  );
}

export function PortalPackagesScreen() {
  return (
    <Page title="Packages">
      {[
        { name: "Silver wedding pack", price: "₹45,000", desc: "Photography · 6 hrs" },
        { name: "Gold wedding pack", price: "₹85,000", desc: "Photo + video · full day" },
        { name: "Seasonal monsoon offer", price: "₹38,000", desc: "20% off till Aug" },
      ].map((pkg) => (
        <article key={pkg.name} className="mode-card">
          <div className="mode-list-row">
            <div>
              <strong>{pkg.name}</strong>
              <p className="mode-muted">{pkg.desc}</p>
            </div>
            <span className="mode-amount">{pkg.price}</span>
          </div>
          <div className="mode-action-row">
            <button type="button" className="mode-btn mode-btn-secondary">Edit pricing</button>
            <button type="button" className="mode-btn mode-btn-accept">Seasonal offer</button>
          </div>
        </article>
      ))}
      <button type="button" className="mode-btn mode-btn-accept mode-btn-block">Create package</button>
    </Page>
  );
}

export function PortalQuotesScreen() {
  const rows = [
    { id: "q1", title: "Wedding — Dec 12", subtitle: "Sent · ₹1.2L", badge: "Pending" },
    { id: "q2", title: "Corporate event", subtitle: "Accepted · ₹65k", badge: "Accepted" },
    { id: "q3", title: "Birthday party", subtitle: "Rejected", badge: "Rejected" },
  ];
  return (
    <Page title="Quotes">
      <ul className="mode-list">
        {rows.map((row) => (
          <li key={row.id} className="mode-card mode-list-row">
            <div>
              <strong>{row.title}</strong>
              <p className="mode-muted">{row.subtitle}</p>
            </div>
            <span className="mode-badge">{row.badge}</span>
          </li>
        ))}
      </ul>
    </Page>
  );
}
