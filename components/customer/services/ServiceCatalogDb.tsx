import { getCatalogGrouped } from "@/lib/catalog/queries";
import {
  CATEGORY_HEADER_ICONS,
  getServiceCardMeta,
} from "@/lib/catalog/service-card-meta";
import { ServiceCatalogView } from "./ServiceCatalogView";
import type { CatalogCategoryData } from "./ServiceCatalogView";

export async function ServiceCatalogDb() {
  const catalog = await getCatalogGrouped();

  const categories: CatalogCategoryData[] = catalog.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    headerIcon: CATEGORY_HEADER_ICONS[category.slug] ?? "grid-menu",
    services: category.subCategories.flatMap((sub) => {
      const service = sub.services[0];
      if (!service) return [];
      const meta = getServiceCardMeta(service.slug, category.slug, service.name);
      return [
        {
          id: service.id,
          name: service.name,
          href: `/services/${service.category.slug}/${service.slug}`,
          icon: meta.icon,
          color: meta.color,
          subtitle: meta.subtitle,
        },
      ];
    }),
  }));

  return <ServiceCatalogView categories={categories} />;
}
