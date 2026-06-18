import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-brand-600">
          VSolveHub
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/services" className="text-slate-600 hover:text-brand-600">
            Services
          </Link>
          <Link href="/profile" className="text-slate-600 hover:text-brand-600">
            Profile
          </Link>
          <Link href="/partner/login" className="text-slate-600 hover:text-brand-600">
            Partner
          </Link>
        </nav>
      </div>
    </header>
  );
}
