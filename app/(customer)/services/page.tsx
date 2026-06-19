import { Suspense } from "react";
import { ServiceCatalogDb } from "@/components/customer/services/ServiceCatalogDb";
import { ServicesSearchResults } from "./ServicesSearchResults";

type PageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function ServicesRoute({ searchParams }: PageProps) {
  const { q, category } = await searchParams;

  if (q || category) {
    return (
      <Suspense fallback={<p className="text-muted page-content">Loading services…</p>}>
        <ServicesSearchResults query={q} category={category} />
      </Suspense>
    );
  }

  return <ServiceCatalogDb />;
}
