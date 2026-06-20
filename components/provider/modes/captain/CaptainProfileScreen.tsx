"use client";

import { useEffect, useState } from "react";

type ProfileResponse = {
  profile: {
    name: string;
    phone: string;
    providerType: string;
    status: string;
    worker?: { rating: number; completedJobs: number; acceptanceRate: number; isOnline: boolean } | null;
  };
  stats: { rating: number; completedJobs: number; acceptanceRate: number };
  kyc: { docType: string; status: string; lastFour: string | null }[];
};

export function CaptainProfileScreen() {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/provider/profile")
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setName(json.profile.name);
      });
  }, []);

  async function saveName() {
    await fetch("/api/provider/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: name }),
    });
  }

  if (!data) return <p className="partner-muted">Loading profile…</p>;

  return (
    <div className="partner-stack">
      <div className="partner-card">
        <h2 className="partner-card-title">{data.profile.name}</h2>
        <p className="partner-muted">{data.profile.phone}</p>
        <p className="partner-badge">{data.profile.status}</p>
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">Personal info</h3>
        <label className="form-label" htmlFor="captain-name">
          Display name
        </label>
        <input id="captain-name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="button" className="btn btn-primary btn-sm mt-2" onClick={saveName}>
          Save
        </button>
      </div>

      <div className="partner-stat-grid">
        <div className="partner-stat-card">
          <span className="partner-stat-value">★ {data.stats.rating.toFixed(1)}</span>
          <span className="partner-stat-label">Rating</span>
        </div>
        <div className="partner-stat-card">
          <span className="partner-stat-value">{data.stats.completedJobs}</span>
          <span className="partner-stat-label">Jobs done</span>
        </div>
        <div className="partner-stat-card">
          <span className="partner-stat-value">{data.stats.acceptanceRate}%</span>
          <span className="partner-stat-label">Accept rate</span>
        </div>
        <div className="partner-stat-card">
          <span className="partner-stat-value">{data.profile.worker?.isOnline ? "Online" : "Offline"}</span>
          <span className="partner-stat-label">Status</span>
        </div>
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">KYC status</h3>
        {data.kyc.length === 0 ? (
          <p className="partner-muted">No documents submitted yet.</p>
        ) : (
          <ul className="partner-list">
            {data.kyc.map((doc) => (
              <li key={doc.docType}>
                {doc.docType} — {doc.status}
                {doc.lastFour ? ` · ••••${doc.lastFour}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
