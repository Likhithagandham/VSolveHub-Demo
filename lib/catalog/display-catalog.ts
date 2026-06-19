import type { IconName } from "@/components/ui/ServiceIcons";

export type QuickService = {
  id: string;
  label: string;
  icon: IconName;
  color: string;
  href: string;
};

export const QUICK_SERVICES: QuickService[] = [
  { id: "home", label: "Home Services", icon: "house", color: "#2563eb", href: "/services?category=home-services" },
  { id: "construction", label: "Construction", icon: "hard-hat", color: "#ca8a04", href: "/services?category=construction-services" },
  { id: "beauty", label: "Beauty", icon: "beauty", color: "#db2777", href: "/services?category=beauty-wellness" },
  { id: "events", label: "Events", icon: "calendar-star", color: "#7c3aed", href: "/services?category=event-media-services" },
  { id: "rentals", label: "Rentals", icon: "car-front", color: "#16a34a", href: "/services?category=rental-services" },
  { id: "vehicle", label: "Vehicle", icon: "car-side", color: "#ea580c", href: "/services?category=vehicle-services" },
  { id: "stay", label: "Stay", icon: "venue", color: "#0891b2", href: "/services?category=accommodation-services" },
  { id: "jobs", label: "Jobs", icon: "briefcase", color: "#0d9488", href: "/services?category=job-opportunities" },
  { id: "staff", label: "Manpower", icon: "worker", color: "#dc2626", href: "/services?category=manpower-support-staff" },
  { id: "all", label: "View All", icon: "grid-four", color: "#38bdf8", href: "/services" },
];

export const PROMO_CARDS = [
  {
    id: "home",
    title: "Home Services On Demand",
    cta: "Book Now",
    bg: "#ede9fe",
    btnColor: "#6d28d9",
    icon: "house" as IconName,
    href: "/services?category=home-services",
  },
  {
    id: "construction",
    title: "Skilled Construction Crew",
    cta: "Hire Labour",
    bg: "#fef9c3",
    btnColor: "#ca8a04",
    icon: "hard-hat" as IconName,
    href: "/services?category=construction-services",
  },
  {
    id: "events",
    title: "Plan Your Perfect Event",
    cta: "Explore",
    bg: "#dcfce7",
    btnColor: "#16a34a",
    icon: "calendar-star" as IconName,
    href: "/services?category=event-media-services",
  },
];

export const WHY_CHOOSE: { icon: IconName; label: string; color: string }[] = [
  { icon: "shield", label: "Verified\nProfessionals", color: "#16a34a" },
  { icon: "diamond", label: "Affordable\nPricing", color: "#db2777" },
  { icon: "headset", label: "Quick\nSupport", color: "#2563eb" },
  { icon: "lock", label: "Secure\nPayments", color: "#7c3aed" },
];

export const HERO_SLIDES: { id: number; title: string; highlight: string; icons: IconName[] }[] = [
  {
    id: 1,
    title: "ALL SERVICES",
    highlight: "AT YOUR FINGERTIPS",
    icons: ["house", "hard-hat", "beauty", "calendar", "car-side", "briefcase"],
  },
  {
    id: 2,
    title: "BOOK TRUSTED",
    highlight: "PROFESSIONALS",
    icons: ["hard-hat", "broom", "beauty", "ac-unit", "bolt", "wrench"],
  },
  {
    id: 3,
    title: "ONE APP",
    highlight: "ALL SOLUTIONS",
    icons: ["shield", "diamond", "headset", "lock", "cart", "scooter"],
  },
];
