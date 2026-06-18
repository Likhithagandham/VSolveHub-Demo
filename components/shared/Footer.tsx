import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-900">VSolveHub</p>
            <p className="mt-1 text-sm text-slate-500">Services made simple.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/about" className="text-slate-600 hover:text-brand-600">About</Link>
            <Link href="/faq" className="text-slate-600 hover:text-brand-600">FAQ</Link>
            <Link href="/contact" className="text-slate-600 hover:text-brand-600">Contact</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/gallery" className="text-slate-600 hover:text-brand-600">Gallery</Link>
            <Link href="/partner/login" className="text-slate-600 hover:text-brand-600">Become a Partner</Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} VSolveHub</p>
      </div>
    </footer>
  );
}
