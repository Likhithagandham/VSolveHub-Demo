"use client";

import { useCallback, useEffect, useState } from "react";
import { LoadingState } from "@/components/ui/LoadingState";
import { Spinner } from "@/components/ui/Spinner";

const DOCUMENT_TYPES = [
  { id: "aadhaar", label: "Aadhaar", required: true, input: "text" as const },
  { id: "selfie", label: "Live selfie", required: true, input: "file" as const },
  { id: "driving_license", label: "Driving license", required: true, input: "file" as const },
  { id: "vehicle_rc", label: "Vehicle RC", required: true, input: "file" as const },
  { id: "skill_cert", label: "Skill certificate", required: false, input: "file" as const },
] as const;

type DocId = (typeof DOCUMENT_TYPES)[number]["id"];

type KycDoc = { docType: string; status: string; lastFour: string | null };

export function CaptainDocumentsScreen() {
  const [kyc, setKyc] = useState<KycDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [docType, setDocType] = useState<DocId>("aadhaar");
  const [aadhaar, setAadhaar] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/profile");
    if (res.ok) {
      const json = await res.json();
      setKyc(json.kyc ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selected = DOCUMENT_TYPES.find((d) => d.id === docType)!;
  const docMap = new Map(kyc.map((d) => [d.docType, d]));
  const canUpload =
    docType === "aadhaar" ? aadhaar.replace(/\D/g, "").length >= 4 : file != null;

  async function upload() {
    setUploading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/provider/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        docType,
        lastFour: docType === "aadhaar" ? aadhaar.replace(/\D/g, "").slice(-4) : undefined,
        fileName: file?.name,
      }),
    });
    const json = await res.json().catch(() => null);
    setUploading(false);
    if (!res.ok) {
      setError(json?.error ?? "Upload failed");
      return;
    }
    setSuccess(`${selected.label} submitted for verification`);
    setAadhaar("");
    setFile(null);
    await load();
  }

  async function uploadForType(id: DocId) {
    setDocType(id);
    setError("");
    setSuccess("");
    document.getElementById("rapido-doc-upload")?.scrollIntoView({ behavior: "smooth" });
  }

  if (loading) return <LoadingState label="Loading documents…" variant="partner" />;

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Documents</h1>
      <p className="rapido-muted">Keep your verification up to date to stay active on dispatch.</p>

      <ul className="rapido-doc-list">
        {DOCUMENT_TYPES.map((doc) => {
          const submitted = docMap.get(doc.id);
          const status = submitted?.status ?? "NOT_SUBMITTED";
          return (
            <li key={doc.id} className={`rapido-doc-item rapido-doc-item--${status.toLowerCase()}`}>
              <div className="rapido-doc-item-main">
                <strong>{doc.label}</strong>
                {doc.required && <span className="rapido-doc-required">Required</span>}
                {submitted?.lastFour && (
                  <p className="rapido-muted">••••{submitted.lastFour}</p>
                )}
              </div>
              <div className="rapido-doc-item-actions">
                <span className="rapido-doc-status">{status.replace(/_/g, " ")}</span>
                <button type="button" className="rapido-chip" onClick={() => uploadForType(doc.id)}>
                  Upload
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <section id="rapido-doc-upload" className="rapido-card">
        <h3 className="rapido-card-head">Upload document</h3>
        <p className="rapido-muted">
          Uploads are reviewed within 24 hours. Contact support if verification is delayed.
        </p>

        <div className="form-group rapido-field-block">
          <label className="form-label" htmlFor="doc-type">
            Document type
          </label>
          <select
            id="doc-type"
            className="form-input"
            value={docType}
            onChange={(e) => {
              setDocType(e.target.value as DocId);
              setAadhaar("");
              setFile(null);
              setError("");
              setSuccess("");
            }}
          >
            {DOCUMENT_TYPES.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.label}
                {!doc.required ? " (optional)" : ""}
              </option>
            ))}
          </select>
        </div>

        {selected.input === "text" ? (
          <div className="form-group rapido-field-block">
            <label className="form-label" htmlFor="aadhaar-digits">
              Aadhaar number (last 4 digits minimum)
            </label>
            <input
              id="aadhaar-digits"
              className="form-input"
              inputMode="numeric"
              placeholder="Last 4 digits"
              maxLength={12}
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        ) : (
          <div className="form-group rapido-field-block">
            <label className="form-label" htmlFor="doc-file">
              {selected.label} file
            </label>
            <input
              id="doc-file"
              type="file"
              className="form-input rapido-file-input"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file && <p className="rapido-muted rapido-file-name">{file.name}</p>}
          </div>
        )}

        {error && <p className="rapido-error">{error}</p>}
        {success && <p className="rapido-success">{success}</p>}

        <button
          type="button"
          className="rapido-btn rapido-btn-accept rapido-btn-block"
          disabled={uploading || !canUpload}
          onClick={upload}
        >
          {uploading ? (
            <span className="btn-inner">
              <Spinner size="sm" className="btn-spinner" />
              <span>Uploading…</span>
            </span>
          ) : (
            "Upload document"
          )}
        </button>
      </section>
    </div>
  );
}
