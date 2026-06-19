"use client";

import { useState } from "react";
import Link from "next/link";
import { ServiceIcon } from "@/components/ui/ServiceIcons";
import type { IconName } from "@/components/ui/ServiceIcons";

export type CatalogServiceItem = {
  id: string;
  name: string;
  href: string;
  icon: IconName;
  color: string;
  subtitle: string;
};

export type CatalogCategoryData = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  headerIcon: IconName;
  services: CatalogServiceItem[];
};

type Props = {
  categories: CatalogCategoryData[];
};

export function ServiceCatalogView({ categories }: Props) {
  const [view, setView] = useState<"categories" | "grid">("categories");

  return (
    <div className="service-catalog">
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Our Services</h1>
          <p className="catalog-subtitle">All Services at your fingertips</p>
        </div>
        <button
          type="button"
          className="view-categories-btn"
          onClick={() => setView((v) => (v === "categories" ? "grid" : "categories"))}
        >
          <GridIcon />
          {view === "categories" ? "View as Grid" : "View as Categories"}
        </button>
      </div>

      {view === "categories" ? (
        categories.map((category, catIndex) => (
          <section key={category.id} className="catalog-group">
            <div className="catalog-group-header">
              <h2>
                <span className="group-icon">
                  <ServiceIcon name={category.headerIcon} size={14} color="var(--color-brand)" />
                </span>
                {catIndex + 1}. {category.name.toUpperCase()}
              </h2>
              <Link href={`/services?category=${category.slug}`} className="section-link">
                View All →
              </Link>
            </div>

            <div className="catalog-service-scroll">
              {category.services.map((service) => (
                <Link key={service.id} href={service.href} className="catalog-service-card">
                  <span className="catalog-service-icon">
                    <ServiceIcon name={service.icon} size={28} color={service.color} />
                  </span>
                  <span className="catalog-service-name">{service.name}</span>
                  <span className="catalog-service-sub">{service.subtitle}</span>
                </Link>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="catalog-all-grid">
          {categories.flatMap((cat) =>
            cat.services.map((service) => (
              <Link key={service.id} href={service.href} className="catalog-service-card">
                <span className="catalog-service-icon">
                  <ServiceIcon name={service.icon} size={28} color={service.color} />
                </span>
                <span className="catalog-service-name">{service.name}</span>
                <span className="catalog-service-sub">{service.subtitle}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
