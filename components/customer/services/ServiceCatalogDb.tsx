import { getCatalogGrouped } from "@/lib/catalog/queries";
import {
  CATEGORY_HEADER_ICONS,
  getServiceCardMeta,
} from "@/lib/catalog/service-card-meta";
import { ServiceCatalogView } from "./ServiceCatalogView";
import type { CatalogCategoryData } from "./ServiceCatalogView";

function mapServiceItem(
  service: {
    id: string;
    name: string;
    slug: string;
    category: { slug: string };
  },
  categorySlug: string
) {
  const meta = getServiceCardMeta(service.slug, categorySlug, service.name);
  return {
    id: service.id,
    name: service.name,
    href: `/services/${service.category.slug}/${service.slug}`,
    icon: meta.icon,
    color: meta.color,
    subtitle: meta.subtitle,
  };
}

export async function ServiceCatalogDb() {
  const catalog = await getCatalogGrouped();

  const categories: CatalogCategoryData[] = catalog.map((category) => {
    const allServices = [
      ...category.services,
      ...category.subCategories.flatMap((sub) => sub.services),
    ].sort((a, b) => a.name.localeCompare(b.name));

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      headerIcon: CATEGORY_HEADER_ICONS[category.slug] ?? "grid-menu",
      totalCount: allServices.length,
      services: allServices.map((service) => mapServiceItem(service, category.slug)),
    };
  });

  return <ServiceCatalogView categories={categories} />;
}
