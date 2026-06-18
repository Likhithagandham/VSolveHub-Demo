"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";

export type EnquiryField = { name: string; label: string; type?: string };

export function EnquiryFormBase({
  service,
  title,
  archetype,
  fields,
}: {
  service: { id: string; name: string };
  title: string;
  archetype: string;
  fields: EnquiryField[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId: service.id, archetype, ...payload, enquiry: true }),
    });
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="card text-center">
        <Badge variant="success">Enquiry sent</Badge>
        <p className="mt-3 text-sm text-slate-600">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <Badge variant="info">Enquiry</Badge>
      </div>
      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1 block text-sm font-medium text-slate-700">{f.label}</label>
          {f.type === "textarea" ? (
            <Textarea name={f.name} required />
          ) : (
            <Input name={f.name} type={f.type ?? "text"} required />
          )}
        </div>
      ))}
      <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send enquiry"}</Button>
    </form>
  );
}
