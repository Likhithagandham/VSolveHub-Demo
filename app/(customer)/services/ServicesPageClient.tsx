"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceCatalog } from "@/components/customer/services/ServiceCatalog";
import { ServiceCardList, type ServiceCardData } from "@/components/customer/services/ServiceCard";

export default function ServicesPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const view = searchParams.get("view") ?? "";

  const [services, setServices] = useState<ServiceCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const showSearchResults = Boolean(query || category);

  useEffect(() => {
    if (!showSearchResults) return;

    async function load() {
      setLoading(true);
      const url = query
        ? `/api/catalog/search?q=${encodeURIComponent(query)}`
        : `/api/catalog?category=${category}`;

      const res = await fetch(url);
      const data = await res.json();
      setServices(data.services ?? []);
      setLoading(false);
    }
    load();
  }, [query, category, showSearchResults]);

  if (showSearchResults) {
    return (
      <div className="page-content">
        <h1 className="catalog-title">
          {query ? `Results for "${query}"` : "Filtered services"}
        </h1>
        <p className="catalog-subtitle" style={{ marginBottom: "1rem" }}>
          {loading ? "Searching…" : `${services.length} service(s) found`}
        </p>
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : (
          <ServiceCardList services={services} />
        )}
      </div>
    );
  }

  return <ServiceCatalog />;
}
