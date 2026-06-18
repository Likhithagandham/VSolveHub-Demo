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

export function CrewForm({ service }: { service: ServiceInfo }) {
  const router = useRouter();
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState("");
  const [headcount, setHeadcount] = useState(4);
  const [days, setDays] = useState(1);
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
        body: JSON.stringify({
          serviceId: service.id,
          archetype: "B",
          slot,
          address,
          headcount,
          days,
        }),
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

  const estimated = service.pricePaise * headcount * days;

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="font-semibold text-slate-900">Book crew — {service.name}</h3>
      <p className="text-sm text-slate-500">Est. {formatMoney(estimated)}</p>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Start date</label>
        <Input type="datetime-local" value={slot} onChange={(e) => setSlot(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Headcount</label>
          <Input type="number" min={1} max={50} value={headcount} onChange={(e) => setHeadcount(Number(e.target.value))} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Days</label>
          <Input type="number" min={1} max={30} value={days} onChange={(e) => setDays(Number(e.target.value))} required />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading}>{loading ? "Booking..." : "Request crew"}</Button>
    </form>
  );
}
