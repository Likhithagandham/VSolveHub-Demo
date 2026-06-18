import type { Service, ServiceCategory } from "@prisma/client";
import { prisma } from "@/lib/db/client";

export type ServiceWithCategory = Service & { category: ServiceCategory };

export function parseTags(tags: string): string[] {
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function serializeService(service: ServiceWithCategory) {
  return {
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description,
    price: service.price,
    duration: service.duration,
    tags: parseTags(service.tags),
    category: {
      id: service.category.id,
      name: service.category.name,
      slug: service.category.slug,
      icon: service.category.icon,
    },
  };
}

export async function getCategories() {
  return prisma.serviceCategory.findMany({ orderBy: { name: "asc" } });
}

export async function getAllServices() {
  const services = await prisma.service.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });
  return services.map(serializeService);
}

export async function getPopularServices(limit = 6) {
  const services = await prisma.service.findMany({
    include: { category: true },
    take: limit,
    orderBy: { price: "asc" },
  });
  return services.map(serializeService);
}

export async function getServiceBySlug(categorySlug: string, serviceSlug: string) {
  const service = await prisma.service.findFirst({
    where: {
      slug: serviceSlug,
      category: { slug: categorySlug },
    },
    include: { category: true },
  });
  return service ? serializeService(service) : null;
}

export async function getServicesByCategory(categorySlug: string) {
  const services = await prisma.service.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
    orderBy: { name: "asc" },
  });
  return services.map(serializeService);
}

export async function searchServices(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return getAllServices();

  const services = await prisma.service.findMany({
    include: { category: true },
  });

  return services
    .filter((service) => {
      const tags = parseTags(service.tags);
      const haystack = [
        service.name,
        service.description,
        service.category.name,
        service.category.slug,
        ...tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q) || q.split(/\s+/).every((word) => haystack.includes(word));
    })
    .map(serializeService);
}

export async function getServicesByIds(ids: string[]) {
  if (!ids.length) return [];
  const services = await prisma.service.findMany({
    where: { id: { in: ids } },
    include: { category: true },
  });
  const order = new Map(ids.map((id, i) => [id, i]));
  return services
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
    .map(serializeService);
}
