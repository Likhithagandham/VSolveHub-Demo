"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function PartnerLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  async function sendOtp() {
    await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send", phone, role: "provider" }),
    });
    setStep("otp");
  }

  async function verifyOtp() {
    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", phone, otp, role: "provider" }),
    });
    if (res.ok) router.push("/partner/dashboard");
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Partner login</h1>
      {step === "phone" ? (
        <>
          <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Button onClick={sendOtp}>Send OTP</Button>
        </>
      ) : (
        <>
          <Input placeholder="OTP (123456)" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <Button onClick={verifyOtp}>Login</Button>
        </>
      )}
    </div>
  );
}
