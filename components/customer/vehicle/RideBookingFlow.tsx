"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/format";
import { WALLET_BALANCE_PAISE } from "@/lib/profile/section-data";
import { RIDE_TYPES } from "@/lib/vehicle/constants";
import { estimateDistanceKm, estimateRideFare } from "@/lib/vehicle/pricing";
import { VehicleFlowHeader } from "./VehicleFlowHeader";

const STEPS = ["pickup", "drop", "type", "fare", "driver", "payment"] as const;
const STEP_LABELS: Record<string, string> = {
  pickup: "Pickup",
  drop: "Drop",
  type: "Ride type",
  fare: "Fare",
  driver: "Driver",
  payment: "Pay",
};

const PAYMENT_OPTIONS = [
  { id: "upi" as const, label: "UPI" },
  { id: "card" as const, label: "Card" },
  { id: "wallet" as const, label: "Wallet" },
  { id: "cod" as const, label: "Pay after ride" },
];

type Driver = { id: string; name: string; phone: string; rating: number; vehicleNumber: string };

export function RideBookingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<(typeof STEPS)[number]>("pickup");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rideType, setRideType] = useState("auto");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driverId, setDriverId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<(typeof PAYMENT_OPTIONS)[number]["id"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const distanceKm = pickup && drop ? estimateDistanceKm(pickup, drop) : 0;
  const fare = estimateRideFare(rideType, distanceKm);

  useEffect(() => {
    if (step === "driver") {
      fetch(`/api/vehicle/bookings?type=drivers&category=${rideType}`)
        .then((r) => r.json())
        .then((d) => setDrivers(d.drivers ?? []));
    }
  }, [step, rideType]);

  async function confirm() {
    if (!paymentMethod || !driverId) {
      setError("Select driver and payment method");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/vehicle/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flowType: "ride",
        serviceSlug: "ride-booking",
        pickupAddress: pickup,
        dropAddress: drop,
        rideType,
        driverId,
        paymentMethod,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Booking failed");
      return;
    }
    router.push(`/vehicle/confirm?ref=${data.bookingRef}&flow=ride`);
  }

  return (
    <div className="stack-lg booking-flow">
      <VehicleFlowHeader steps={STEPS} labels={STEP_LABELS} currentStep={step} />

      {step === "pickup" && (
        <div className="card stack">
          <h2 className="section-title">Pickup location</h2>
          <Input label="Where should we pick you up?" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="e.g. Gachibowli, Hyderabad" />
          <Button onClick={() => pickup.trim().length >= 5 && setStep("drop")} disabled={pickup.trim().length < 5}>Continue</Button>
        </div>
      )}

      {step === "drop" && (
        <div className="card stack">
          <h2 className="section-title">Drop location</h2>
          <Input label="Where are you going?" value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="e.g. HITEC City, Hyderabad" />
          <div className="booking-action-row">
            <Button variant="secondary" onClick={() => setStep("pickup")}>Back</Button>
            <Button onClick={() => drop.trim().length >= 5 && setStep("type")} disabled={drop.trim().length < 5}>Continue</Button>
          </div>
        </div>
      )}

      {step === "type" && (
        <div className="card stack">
          <h2 className="section-title">Choose ride type</h2>
          <div className="grid-2">
            {RIDE_TYPES.map((t) => (
              <button key={t.id} type="button" className={`vendor-card ${rideType === t.id ? "selected" : ""}`} onClick={() => setRideType(t.id)}>
                <span className="text-2xl">{t.icon}</span>
                <p className="card-title">{t.label}</p>
                <p className="text-sm text-muted">from {formatPrice(t.basePaise)}</p>
              </button>
            ))}
          </div>
          <div className="booking-action-row">
            <Button variant="secondary" onClick={() => setStep("drop")}>Back</Button>
            <Button onClick={() => setStep("fare")}>See fare estimate</Button>
          </div>
        </div>
      )}

      {step === "fare" && (
        <div className="card stack">
          <h2 className="section-title">Fare estimate</h2>
          <p className="text-sm text-muted">{pickup} → {drop}</p>
          <p className="card-title">~{distanceKm} km · {formatPrice(fare)}</p>
          <p className="text-sm text-muted">Final fare may vary slightly based on route and traffic.</p>
          <div className="booking-action-row">
            <Button variant="secondary" onClick={() => setStep("type")}>Back</Button>
            <Button onClick={() => setStep("driver")}>Find driver</Button>
          </div>
        </div>
      )}

      {step === "driver" && (
        <div className="card stack">
          <h2 className="section-title">Matching drivers</h2>
          {drivers.length === 0 ? (
            <p className="text-muted">Finding nearby drivers…</p>
          ) : (
            drivers.map((d) => (
              <button key={d.id} type="button" className={`vendor-card ${driverId === d.id ? "selected" : ""}`} onClick={() => setDriverId(d.id)}>
                <p className="card-title">{d.name}</p>
                <p className="text-sm text-muted">★ {d.rating.toFixed(1)} · {d.vehicleNumber}</p>
              </button>
            ))
          )}
          <div className="booking-action-row">
            <Button variant="secondary" onClick={() => setStep("fare")}>Back</Button>
            <Button onClick={() => driverId && setStep("payment")} disabled={!driverId}>Confirm driver</Button>
          </div>
        </div>
      )}

      {step === "payment" && (
        <div className="card stack">
          <h2 className="section-title">Confirm & pay</h2>
          <p className="card-title">{formatPrice(fare)}</p>
          <div className="stack">
            {PAYMENT_OPTIONS.map((p) => (
              <button key={p.id} type="button" className={`vendor-card ${paymentMethod === p.id ? "selected" : ""}`} onClick={() => setPaymentMethod(p.id)}>
                <p className="card-title">{p.label}</p>
                {p.id === "wallet" && <p className="text-sm text-muted">Balance: {formatPrice(WALLET_BALANCE_PAISE)}</p>}
              </button>
            ))}
          </div>
          {error && <p className="alert alert-error">{error}</p>}
          <div className="booking-action-row">
            <Button variant="secondary" onClick={() => setStep("driver")}>Back</Button>
            <Button onClick={confirm} disabled={loading}>{loading ? "Booking…" : "Confirm ride"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
