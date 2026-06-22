import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { PartnerOtpForm } from "@/components/provider/PartnerOtpForm";

type PageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

function resolveRedirect(path?: string) {
  if (path && path.startsWith("/partner") && !path.startsWith("/partner/login")) {
    return path;
  }
  return "/partner/dashboard";
}

export default async function PartnerLoginPage({ searchParams }: PageProps) {
  const session = await getServerSession();
  const { redirect: redirectParam } = await searchParams;
  const redirectTo = resolveRedirect(redirectParam);

  if (session) {
    redirect(redirectTo);
  }

  return (
    <div className="partner-auth-page">
      <div className="partner-auth-card">
        <p className="partner-auth-eyebrow">Partner portal</p>
        <h1 className="partner-auth-title">Partner sign in</h1>
        <p className="partner-auth-subtitle">
          Sign in with your partner account to manage jobs, leads, and earnings. Demo captain:{" "}
          <strong>9876543211</strong> · OTP <strong>1234</strong>.
        </p>
        <PartnerOtpForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
