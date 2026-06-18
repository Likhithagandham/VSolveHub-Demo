"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function BookingOtpPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  async function sendOtp() {
    setLoading(true);
    await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send", phone }),
    });
    setStep("otp");
    setLoading(false);
  }

  async function verifyOtp() {
    setLoading(true);
    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", phone, otp }),
    });
    if (res.ok) router.push("/profile");
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Verify your phone</h1>
      <p className="text-sm text-slate-500">First-time users verify via OTP. Returning users skip this step.</p>
      {step === "phone" ? (
        <>
          <Input placeholder="10-digit phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} />
          <Button onClick={sendOtp} disabled={loading}>Send OTP</Button>
        </>
      ) : (
        <>
          <Input placeholder="6-digit OTP (use 123456)" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
          <Button onClick={verifyOtp} disabled={loading}>Verify</Button>
        </>
      )}
    </div>
  );
}
