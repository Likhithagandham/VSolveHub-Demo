import Link from "next/link";
import { getServicesByCategory, searchServices, getCategories } from "@/lib/catalog/queries";
import { ServiceCardList } from "@/components/customer/services/ServiceCard";

type Props = {
  query?: string;
  category?: string;
};

export async function ServicesSearchResults({ query, category }: Props) {
  if (category && !query) {
    const [services, categories] = await Promise.all([
      getServicesByCategory(category),
      getCategories(),
    ]);
    const cat = categories.find((c) => c.slug === category);

    return (
      <div className="services-page">
        <header className="services-page__header">
          <Link href="/services" className="services-page__back">
            ← All services
          </Link>
          <h1 className="services-page__title">{cat?.name ?? "Services"}</h1>
          <p className="services-page__meta">
            {services.length} service{services.length === 1 ? "" : "s"}
            {cat?.tagline ? ` · ${cat.tagline}` : ""}
          </p>
        </header>
        <ServiceCardList services={services} />
      </div>
    );
  }

  const services = query ? await searchServices(query) : [];

  return (
    <div className="services-page">
      <header className="services-page__header">
        <p className="services-page__eyebrow">Search results</p>
        <h1 className="services-page__title">{query ? `"${query}"` : "Services"}</h1>
        <p className="services-page__meta">
          {services.length} service{services.length === 1 ? "" : "s"} found
        </p>
      </header>
      <ServiceCardList services={services} />
    </div>
  );
}
