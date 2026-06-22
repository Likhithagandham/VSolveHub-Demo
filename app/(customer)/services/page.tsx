import { Suspense } from "react";
import { LoadingState } from "@/components/ui/LoadingState";
import { ServiceCatalogDb } from "@/components/customer/services/ServiceCatalogDb";
import { ServicesSearchResults } from "./ServicesSearchResults";

type PageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function ServicesRoute({ searchParams }: PageProps) {
  const { q, category } = await searchParams;

  if (q || category) {
    return (
      <Suspense fallback={<LoadingState label="Loading services…" />}>
        <ServicesSearchResults query={q} category={category} />
      </Suspense>
    );
  }

  return <ServiceCatalogDb />;
}
