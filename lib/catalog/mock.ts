export type CatalogCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  children?: CatalogCategory[];
};

export type CatalogService = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  pricePaise: number;
  archetype: string;
  categorySlug: string;
  isPopular: boolean;
};

export const MOCK_CATEGORIES: CatalogCategory[] = [
  {
    id: "cat-home",
    slug: "home-services",
    name: "Home Services",
    icon: "🏠",
    description: "Cleaning, repairs, and maintenance",
    children: [
      { id: "cat-clean", slug: "cleaning", name: "Cleaning", icon: "✨" },
      { id: "cat-plumb", slug: "plumbing", name: "Plumbing", icon: "🔧" },
    ],
  },
  {
    id: "cat-events",
    slug: "events",
    name: "Events",
    icon: "🎉",
    description: "Photography, catering, decor",
    children: [
      { id: "cat-photo", slug: "photography", name: "Photography", icon: "📸" },
      { id: "cat-cater", slug: "catering", name: "Catering", icon: "🍽️" },
    ],
  },
  {
    id: "cat-rental",
    slug: "rentals",
    name: "Rentals",
    icon: "📦",
    description: "Equipment and furniture rental",
  },
  {
    id: "cat-staff",
    slug: "staffing",
    name: "Staffing",
    icon: "👥",
    description: "Hire skilled professionals",
  },
];

export const MOCK_SERVICES: CatalogService[] = [
  {
    id: "svc-1",
    slug: "deep-cleaning",
    name: "Deep Home Cleaning",
    description: "Full home deep clean with eco-friendly products",
    pricePaise: 249900,
    archetype: "A",
    categorySlug: "cleaning",
    isPopular: true,
  },
  {
    id: "svc-2",
    slug: "ac-repair",
    name: "AC Repair & Service",
    description: "On-demand AC technician visit",
    pricePaise: 49900,
    archetype: "A",
    categorySlug: "home-services",
    isPopular: true,
  },
  {
    id: "svc-3",
    slug: "moving-crew",
    name: "Moving Crew (4 people)",
    description: "Professional moving team for home relocation",
    pricePaise: 499900,
    archetype: "B",
    categorySlug: "home-services",
    isPopular: true,
  },
  {
    id: "svc-4",
    slug: "event-staff",
    name: "Event Staffing",
    description: "Hire waiters and hosts for your event",
    pricePaise: 150000,
    archetype: "C",
    categorySlug: "staffing",
    isPopular: false,
  },
  {
    id: "svc-5",
    slug: "projector-rental",
    name: "Projector Rental",
    description: "HD projector with screen for 3 days",
    pricePaise: 350000,
    archetype: "D",
    categorySlug: "rentals",
    isPopular: false,
  },
  {
    id: "svc-6",
    slug: "pg-room",
    name: "PG Room — Koramangala",
    description: "Furnished single occupancy near metro",
    pricePaise: 1200000,
    archetype: "E",
    categorySlug: "rentals",
    isPopular: true,
  },
  {
    id: "svc-7",
    slug: "wedding-photo",
    name: "Wedding Photography Package",
    description: "Full-day coverage with album",
    pricePaise: 7500000,
    archetype: "F",
    categorySlug: "photography",
    isPopular: true,
  },
];

export function searchServices(query: string): CatalogService[] {
  const q = query.toLowerCase().trim();
  if (!q) return MOCK_SERVICES;
  return MOCK_SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.categorySlug.includes(q)
  );
}

export function getServiceBySlug(cat: string, slug: string): CatalogService | undefined {
  return MOCK_SERVICES.find((s) => s.slug === slug && s.categorySlug === cat) ??
    MOCK_SERVICES.find((s) => s.slug === slug);
}

export function getPopularServices(): CatalogService[] {
  return MOCK_SERVICES.filter((s) => s.isPopular);
}
