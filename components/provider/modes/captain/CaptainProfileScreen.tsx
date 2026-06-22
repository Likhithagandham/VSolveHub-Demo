"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingState } from "@/components/ui/LoadingState";

type ProfileResponse = {
  profile: {
    name: string;
    phone: string;
    providerType: string;
    status: string;
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

  if (!data) return <LoadingState label="Loading profile…" variant="partner" />;

  const verifiedDocs = data.kyc.filter((d) => d.status === "VERIFIED").length;

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Profile</h1>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Personal info</h3>
        <p className="rapido-muted">{data.profile.phone}</p>
        <div className="form-group rapido-field-block">
          <label className="form-label" htmlFor="captain-name">
            Display name
          </label>
          <input id="captain-name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="button" className="rapido-btn rapido-btn-accept rapido-btn-block" onClick={saveName}>
          Save name
        </button>
      </section>

      <section className="rapido-card">
        <h3 className="rapido-card-head">Ratings & jobs</h3>
        <div className="rapido-perf-grid">
          <div>
            <strong>★ {data.stats.rating.toFixed(1)}</strong>
            <span>Rating</span>
          </div>
          <div>
            <strong>{data.stats.completedJobs}</strong>
            <span>Completed jobs</span>
          </div>
          <div>
            <strong>{data.stats.acceptanceRate}%</strong>
            <span>Accept rate</span>
          </div>
          <div>
            <strong>{data.profile.status}</strong>
            <span>Account status</span>
          </div>
        </div>
      </section>

      <section className="rapido-card">
        <div className="rapido-card-head">
          <h3>KYC status</h3>
          <Link href="/partner/documents">View documents</Link>
        </div>
        {data.kyc.length === 0 ? (
          <p className="rapido-muted">No documents submitted yet.</p>
        ) : (
          <>
            <p className="rapido-muted">
              {verifiedDocs} of {data.kyc.length} documents verified
            </p>
            <ul className="rapido-doc-list rapido-doc-list--compact">
              {data.kyc.map((doc) => (
                <li key={doc.docType} className="rapido-doc-item">
                  <span>{doc.docType.replace(/_/g, " ")}</span>
                  <span className="rapido-doc-status">{doc.status}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
