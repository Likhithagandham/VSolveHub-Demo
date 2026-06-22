"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingState } from "@/components/ui/LoadingState";
import { usePortal } from "@/lib/provider/modes/portal/context";

export function PortalProfile() {
  const { data, modeType } = usePortal();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/provider/profile")
      .then((r) => r.json())
      .then((json) => setName(json.profile?.name ?? ""))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    await fetch("/api/provider/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: name }),
    });
  }

  if (loading) return <LoadingState label="Loading profile…" variant="partner" />;

  return (
    <div className="mode-page">
      <h1 className="mode-page-title">Profile</h1>

      <section className="mode-card">
        <label className="form-label" htmlFor="mode-name">Display name</label>
        <input id="mode-name" className="form-input mode-field-block" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="button" className="mode-btn mode-btn-accept mode-btn-block" onClick={save}>
          Save
        </button>
      </section>

      <section className="mode-card">
        <h3>Skills</h3>
        <div className="mode-tags">
          {data.profile.skills.map((s) => (
            <span key={s} className="mode-tag">{s}</span>
          ))}
        </div>
      </section>

      <section className="mode-card">
        <div className="mode-card-head">
          <h3>Certifications & KYC</h3>
          <Link href="/partner/documents">Documents</Link>
        </div>
        <ul className="mode-list">
          {data.profile.certs.map((c) => (
            <li key={c} className="mode-list-row">
              <span>{c}</span>
              <span className="mode-badge">Verified</span>
            </li>
          ))}
        </ul>
      </section>

      {data.profile.reviews.length > 0 && (
        <section className="mode-card">
          <h3>Reviews</h3>
          {data.profile.reviews.map((r) => (
            <div key={r.name} className="mode-review">
              <strong>★ {r.rating} — {r.name}</strong>
              <p className="mode-muted">{r.text}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
