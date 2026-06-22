"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PROVIDER_TYPES, type ProviderType } from "@/lib/provider/constants";
import { resolveMode } from "@/lib/provider/modes";
import { PartnerLogoutButton } from "@/components/provider/PartnerLogoutButton";
import { LoadingState } from "@/components/ui/LoadingState";
import { Spinner } from "@/components/ui/Spinner";

const TYPE_LABELS: Record<ProviderType, string> = {
  CAPTAIN: "Captain (dispatch)",
  PROFESSIONAL: "Professional",
  RENTAL_VENDOR: "Rental vendor",
  PROPERTY_HOST: "Property host",
  EVENT_VENDOR: "Event studio",
};

export default function PartnerOnboardingPage() {
  const router = useRouter();
  const [providerType, setProviderType] = useState<ProviderType>("CAPTAIN");
  const [docs, setDocs] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"type" | "kyc">("type");
  const [loading, setLoading] = useState(false);
  const [existing, setExisting] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/provider/profile")
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((json) => {
        if (json?.profile) {
          setExisting(true);
          setProviderType(json.profile.providerType);
          if (json.profile.onboardingCompleted) router.replace("/partner/dashboard");
          else setStep("kyc");
        }
      })
      .finally(() => setChecking(false));
  }, [router]);

  const kyc = resolveMode(providerType).kycConfig;

  async function registerType() {
    setLoading(true);
    const res = await fetch("/api/provider/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerType }),
    });
    setLoading(false);
    if (res.ok) setStep("kyc");
  }

  async function submitKyc() {
    setLoading(true);
    const documents = kyc.fields.map((f) => ({
      docType: f.id,
      lastFour: f.type === "text" ? docs[f.id]?.slice(-4) : undefined,
      url: f.type !== "text" ? `mock://${f.id}` : undefined,
    }));
    const res = await fetch("/api/provider/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documents }),
    });
    setLoading(false);
    if (res.ok) router.push("/partner/dashboard");
  }

  return (
    <div className="partner-onboarding">
      <div className="partner-onboarding-top">
        <div>
          <h1 className="partner-page-title">Partner onboarding</h1>
          <p className="partner-muted">Shared onboarding — KYC fields adapt to your provider type.</p>
        </div>
        <PartnerLogoutButton className="partner-header-link partner-onboarding-logout" />
      </div>

      {checking && <LoadingState label="Loading…" variant="partner" />}

      {!checking && step === "type" && !existing && (
        <div className="partner-card partner-stack">
          <h2 className="partner-section-title">Choose provider type</h2>
          {PROVIDER_TYPES.map((type) => (
            <label key={type} className="partner-radio-row">
              <input
                type="radio"
                name="providerType"
                checked={providerType === type}
                onChange={() => setProviderType(type)}
              />
              {TYPE_LABELS[type]}
            </label>
          ))}
          <button type="button" className="btn btn-primary btn-block btn-loading" disabled={loading} onClick={registerType}>
            {loading ? (
              <span className="btn-inner">
                <Spinner size="sm" className="btn-spinner" />
                <span>Continuing…</span>
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      )}

      {!checking && step === "kyc" && (
        <div className="partner-card partner-stack">
          <h2 className="partner-section-title">{kyc.title}</h2>
          {kyc.fields.map((field) => (
            <div key={field.id} className="form-group">
              <label className="form-label" htmlFor={field.id}>
                {field.label}
                {!field.required && " (optional)"}
              </label>
              {field.type === "text" ? (
                <input
                  id={field.id}
                  className="form-input"
                  placeholder={field.placeholder}
                  value={docs[field.id] ?? ""}
                  onChange={(e) => setDocs((d) => ({ ...d, [field.id]: e.target.value }))}
                />
              ) : (
                <input
                  id={field.id}
                  type="file"
                  className="form-input"
                  onChange={() => setDocs((d) => ({ ...d, [field.id]: "uploaded" }))}
                />
              )}
            </div>
          ))}
          <button type="button" className="btn btn-primary btn-block btn-loading" disabled={loading} onClick={submitKyc}>
            {loading ? (
              <span className="btn-inner">
                <Spinner size="sm" className="btn-spinner" />
                <span>Submitting…</span>
              </span>
            ) : (
              "Submit & go to dashboard"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
