import Link from "next/link";
import type { CSSProperties } from "react";
import { QUICK_SERVICES } from "@/lib/catalog/display-catalog";
import { getCategoryTileMeta } from "@/lib/catalog/service-card-meta";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ServiceIcon } from "@/components/ui/ServiceIcons";

function categorySlugFromHref(href: string): string | null {
  const match = href.match(/[?&]category=([^&]+)/);
  return match?.[1] ?? null;
}

export function QuickServices() {
  return (
    <section className="home-section">
      <div className="section-header-row">
        <h2 className="home-section-title">Quick Services</h2>
        <Link href="/services" className="section-link">
          View All →
        </Link>
      </div>
      <div className="quick-services-grid">
        {QUICK_SERVICES.map((item) => {
          const categorySlug = categorySlugFromHref(item.href);
          const { color, icon } = categorySlug
            ? getCategoryTileMeta(categorySlug)
            : { color: item.color, icon: item.icon };

          return (
            <Link
              key={item.id}
              href={item.href}
              className="quick-service-item"
              style={{ "--cat-color": color } as CSSProperties}
            >
              <span className="quick-service-icon" aria-hidden>
                {categorySlug ? (
                  <CategoryIcon slug={categorySlug} icon={icon} size={22} color={color} />
                ) : (
                  <ServiceIcon name={item.icon} size={22} color={color} />
                )}
              </span>
              <span className="quick-service-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
