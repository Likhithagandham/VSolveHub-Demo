import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_CATEGORIES, MOCK_SERVICES } from "@/lib/catalog/mock";
import { formatMoney } from "@/lib/format";

type Props = { params: { cat: string } };

export default function CategoryPage({ params }: Props) {
  const cat = MOCK_CATEGORIES.find((c) => c.slug === params.cat) ??
    MOCK_CATEGORIES.flatMap((c) => c.children ?? []).find((c) => c.slug === params.cat);

  if (!cat) notFound();

  const services = MOCK_SERVICES.filter((s) => s.categorySlug === params.cat);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{cat.name}</h1>
      {cat.children && cat.children.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cat.children.map((sub) => (
            <Link key={sub.slug} href={`/services/${sub.slug}`} className="card text-center hover:border-brand-300">
              <span className="text-2xl">{sub.icon}</span>
              <p className="mt-1 text-sm font-medium">{sub.name}</p>
            </Link>
          ))}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((svc) => (
          <Link key={svc.id} href={`/services/${params.cat}/${svc.slug}`} className="card hover:border-brand-300">
            <h3 className="font-medium">{svc.name}</h3>
            <p className="text-sm text-slate-500">{svc.description}</p>
            <p className="mt-2 text-sm font-semibold text-brand-600">{formatMoney(svc.pricePaise)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
