export function partnerLoginPath(redirect = "/partner/dashboard") {
  const safe =
    redirect.startsWith("/partner") && !redirect.startsWith("/partner/login")
      ? redirect
      : "/partner/dashboard";
  return `/partner/login?redirect=${encodeURIComponent(safe)}`;
}
