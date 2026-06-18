"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type Address = {
  id: string;
  label: string;
  fullAddress: string;
  isDefault: boolean;
};

export function AddressManager({ initialAddresses }: { initialAddresses: Address[] }) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [label, setLabel] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function addAddress() {
    const res = await fetch("/api/profile/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, fullAddress, isDefault: addresses.length === 0 }),
    });
    if (res.ok) {
      const { address } = await res.json();
      setAddresses((prev) => [...prev, address]);
      setLabel("");
      setFullAddress("");
      setShowForm(false);
    }
  }

  async function removeAddress(id: string) {
    await fetch(`/api/profile/addresses?id=${id}`, { method: "DELETE" });
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="stack-lg">
      <div className="flex-between">
        <p className="text-muted">Manage delivery addresses for bookings.</p>
        <Button variant="secondary" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add address"}
        </Button>
      </div>

      {showForm && (
        <div className="card stack">
          <Input label="Label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Home, Office…" />
          <Textarea label="Full address" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
          <Button onClick={addAddress} disabled={!label || fullAddress.length < 10}>
            Save address
          </Button>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="empty-state">
          <p>No addresses saved yet.</p>
        </div>
      ) : (
        <div className="stack">
          {addresses.map((addr) => (
            <div key={addr.id} className="card flex-between">
              <div>
                <p className="address-label">
                  {addr.label}
                  {addr.isDefault && <span className="text-sm text-muted"> · Default</span>}
                </p>
                <p className="address-text">{addr.fullAddress}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => removeAddress(addr.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
