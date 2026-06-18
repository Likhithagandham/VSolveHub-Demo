import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/booking/track", label: "Track" },
];

export function Nav() {
  return (
    <nav className="flex gap-1 overflow-x-auto pb-2">
      {links.map((l) => (
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
