import Link from "next/link";
import { MOCK_CATEGORIES, MOCK_SERVICES } from "@/lib/catalog/mock";
import { formatMoney } from "@/lib/format";

export default function ServicesHubPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">All services</h1>
      {MOCK_CATEGORIES.map((cat) => (
        <section key={cat.slug}>
          <h2 className="mb-3 text-lg font-semibold">
            <Link href={`/services/${cat.slug}`} className="hover:text-brand-600">
              {cat.icon} {cat.name}
            </Link>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOCK_SERVICES.filter((s) => s.categorySlug === cat.slug || cat.children?.some((c) => c.slug === s.categorySlug)).map((svc) => (
              <Link key={svc.id} href={`/services/${svc.categorySlug}/${svc.slug}`} className="card block hover:border-brand-300">
                <p className="font-medium">{svc.name}</p>
                <p className="text-sm text-brand-600">{formatMoney(svc.pricePaise)}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
