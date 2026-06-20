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
  { id: "events", label: "Events", icon: "calendar", color: "#7c3aed", href: "/services?category=event-media-services" },
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
  {
    id: "beauty",
    title: "Beauty & Wellness At Home",
    cta: "Book Now",
    bg: "#fce7f3",
    btnColor: "#db2777",
    icon: "beauty" as IconName,
    href: "/services?category=beauty-wellness",
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

export const HOME_TESTIMONIALS = [
  {
    quote: "Booked an electrician in 10 minutes. The worker arrived on time and fixed everything.",
    author: "Priya",
    city: "Hyderabad",
    rating: 5,
  },
  {
    quote: "Finally one place for wedding makeup, decor, and photography. Very easy to use.",
    author: "Ramesh",
    city: "Vijayawada",
    rating: 5,
  },
  {
    quote: "Hired masons for our home renovation. Transparent pricing and reliable workers.",
    author: "Lakshmi",
    city: "Guntur",
    rating: 5,
  },
  {
    quote: "Booked a cab and vehicle repair from the same app. Saved so much time!",
    author: "Suresh",
    city: "Warangal",
    rating: 4,
  },
];

export const HOW_IT_WORKS = [
  { step: "1", title: "Pick a service", desc: "Browse categories or search 850+ services." },
  { step: "2", title: "Book in minutes", desc: "Choose a slot, pay securely, get confirmation." },
  { step: "3", title: "Pro at your door", desc: "Verified professional arrives and completes the job." },
];

export const HOME_SPOTLIGHTS: {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  icon: IconName;
  color: string;
  bg: string;
}[] = [
  {
    id: "ride",
    title: "Book a ride",
    subtitle: "Bike, auto, taxi & premium cabs",
    cta: "Book now",
    href: "/vehicle/ride",
    icon: "scooter",
    color: "#ea580c",
    bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
  },
  {
    id: "stay",
    title: "Find a stay",
    subtitle: "PG, hostel & rental rooms",
    cta: "Browse stays",
    href: "/accommodation",
    icon: "buildings",
    color: "#0891b2",
    bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)",
  },
  {
    id: "beauty",
    title: "Salon at home",
    subtitle: "Beauty, spa & bridal packages",
    cta: "Explore",
    href: "/services?category=beauty-wellness",
    icon: "beauty",
    color: "#db2777",
    bg: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
  },
];

export const TRENDING_SEARCHES = [
  { label: "AC repair", href: "/services?q=ac" },
  { label: "House cleaning", href: "/services?q=cleaning" },
  { label: "Electrician", href: "/services?q=electrical" },
  { label: "Plumber", href: "/services?q=plumbing" },
  { label: "Event decor", href: "/services?category=event-media-services" },
  { label: "Car repair", href: "/vehicle/repair" },
];
