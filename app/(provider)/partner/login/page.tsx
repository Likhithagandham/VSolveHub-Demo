import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { PartnerOtpForm } from "@/components/provider/PartnerOtpForm";
import { PartnerDemoLogin } from "@/components/provider/PartnerDemoLogin";

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
          Pick a demo role below for one-tap access, or sign in with your registered partner number.
          Demo OTP: <strong>1234</strong>.
        </p>
        <PartnerDemoLogin redirectTo={redirectTo} />
        <div className="partner-auth-divider">
          <span>or use phone OTP</span>
        </div>
        <PartnerOtpForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
