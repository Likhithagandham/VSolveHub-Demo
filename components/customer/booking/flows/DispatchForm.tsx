"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatMoney } from "@/lib/format";

type ServiceInfo = {
  id: string;
  name: string;
  pricePaise: number;
};

export function DispatchForm({ service }: { service: ServiceInfo }) {
  const router = useRouter();
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: service.id, archetype: "A", slot, address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      router.push(`/booking/confirm?ref=${data.ref}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="font-semibold text-slate-900">Book {service.name}</h3>
      <p className="text-sm text-slate-500">From {formatMoney(service.pricePaise)}</p>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Preferred slot</label>
        <Input type="datetime-local" value={slot} onChange={(e) => setSlot(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Service address</label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address" required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading}>{loading ? "Booking..." : "Book now"}</Button>
    </form>
  );
}
