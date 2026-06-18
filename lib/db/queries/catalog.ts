import { prisma } from "@/lib/db/client";
import { MOCK_CATEGORIES, MOCK_SERVICES } from "@/lib/catalog/mock";

export async function getCategories() {
  try {
    const cats = await prisma.category.findMany({
      include: { children: true },
      where: { parentId: null },
    });
    if (cats.length > 0) return cats;
  } catch {
    // DB not ready — fall through to mock
  }
  return MOCK_CATEGORIES;
}

export async function getPopularServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isPopular: true },
      include: { category: true },
      take: 8,
    });
    if (services.length > 0) return services;
  } catch {
    // fall through
  }
  return MOCK_SERVICES.filter((s) => s.isPopular);
}

export async function getServiceBySlug(categorySlug: string, serviceSlug: string) {
  try {
    const service = await prisma.service.findFirst({
      where: { slug: serviceSlug, category: { slug: categorySlug } },
      include: { category: true },
    });
    if (service) return service;
  } catch {
    // fall through
  }
  return MOCK_SERVICES.find(
    (s) => s.slug === serviceSlug && s.categorySlug === categorySlug
  );
}
