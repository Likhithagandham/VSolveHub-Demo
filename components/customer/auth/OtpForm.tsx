"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type OtpFormProps = {
  redirectTo?: string;
};

export function OtpForm({ redirectTo = "/booking" }: OtpFormProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendOtp() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send", phone }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError("Enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }
    setStep("otp");
    setLoading(false);
  }

  async function verifyOtp() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", phone, otp }),
    });
    if (!res.ok) {
      setError("Invalid OTP. Use 1234 for demo.");
      setLoading(false);
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="stack">
      {step === "phone" ? (
        <>
          <Input
            label="Phone number"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            hint="We'll send a one-time password to verify your number"
          />
          {error && <div className="alert alert-error">{error}</div>}
          <Button onClick={sendOtp} disabled={loading || phone.length !== 10} block>
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <Input
            label="Enter OTP"
            placeholder="4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
            inputMode="numeric"
            hint="Demo OTP: 1234"
          />
          {error && <div className="alert alert-error">{error}</div>}
          <Button onClick={verifyOtp} disabled={loading || otp.length < 4} block>
            Verify & Continue
          </Button>
          <Button variant="secondary" onClick={() => setStep("phone")} disabled={loading}>
            Change number
          </Button>
        </>
      )}
    </div>
  );
}
