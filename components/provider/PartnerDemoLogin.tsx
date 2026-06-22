"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { PARTNER_DEMO_ACCOUNTS } from "@/lib/provider/demo-accounts";
import { MOCK_OTP } from "@/lib/constants";
import { getApiErrorMessage } from "@/lib/validation/api-error";

type Props = {
  redirectTo?: string;
};

export function PartnerDemoLogin({ redirectTo = "/partner/dashboard" }: Props) {
  const router = useRouter();
  const [loadingPhone, setLoadingPhone] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function signInAs(phone: string) {
    setLoadingPhone(phone);
    setError("");

    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", phone, otp: MOCK_OTP }),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setError(
        getApiErrorMessage(
          data,
          "Could not sign in. Run npm run db:seed if demo accounts are missing."
        )
      );
      setLoadingPhone(null);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="partner-demo-login">
      <p className="partner-demo-login-label">Choose a demo account</p>
      <ul className="partner-demo-account-list">
        {PARTNER_DEMO_ACCOUNTS.map((account) => {
          const busy = loadingPhone === account.phone;
          const disabled = loadingPhone !== null && !busy;

          return (
            <li key={account.providerType}>
              <button
                type="button"
                className="partner-demo-account"
                disabled={disabled}
                onClick={() => signInAs(account.phone)}
              >
                <span className="partner-demo-account-icon" aria-hidden>
                  <FlaticonIcon name={account.icon} size={20} color="var(--color-brand)" />
                </span>
                <span className="partner-demo-account-text">
                  <strong>{account.label}</strong>
                  <span className="partner-demo-meta">{account.description}</span>
                </span>
                <span className="partner-demo-account-action">{busy ? "Signing in…" : "Enter →"}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {error && <div className="alert alert-error">{error}</div>}
    </div>
  );
}
