import Link from "next/link";

const partnerLinks = [
  { href: "/partner/dashboard", label: "Dashboard" },
  { href: "/partner/leads", label: "Leads" },
  { href: "/partner/work", label: "Work" },
  { href: "/partner/calendar", label: "Calendar" },
  { href: "/partner/earnings", label: "Earnings" },
  { href: "/partner/profile", label: "Profile" },
];

export function PartnerNav() {
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2">
      {partnerLinks.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
