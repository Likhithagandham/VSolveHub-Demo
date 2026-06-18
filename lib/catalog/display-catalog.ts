import type { IconName } from "@/components/ui/ServiceIcons";

export type QuickService = {
  id: string;
  label: string;
  icon: IconName;
  color: string;
  href: string;
};

export type CatalogService = {
  name: string;
  subtitle: string;
  icon: IconName;
  color: string;
  href: string;
};

export type ServiceGroup = {
  id: string;
  number: number;
  title: string;
  icon: IconName;
  services: CatalogService[];
};

export const QUICK_SERVICES: QuickService[] = [
  { id: "ride", label: "Ride Booking", icon: "scooter", color: "#7c3aed", href: "/services?q=ride" },
  { id: "rentals", label: "Rentals", icon: "car-front", color: "#16a34a", href: "/services?q=rental" },
  { id: "taxi", label: "Taxi & Travel", icon: "taxi", color: "#ea580c", href: "/services?q=taxi" },
  { id: "repair", label: "Vehicle Repair", icon: "tools", color: "#2563eb", href: "/services?q=repair" },
  { id: "roadside", label: "Roadside Assistance", icon: "warning", color: "#dc2626", href: "/services?q=roadside" },
  { id: "home", label: "Home Services", icon: "hard-hat", color: "#ca8a04", href: "/services?category=home-repair" },
  { id: "events", label: "Events", icon: "calendar-star", color: "#db2777", href: "/services?q=event" },
  { id: "jobs", label: "Jobs", icon: "briefcase", color: "#0d9488", href: "/services?q=job" },
  { id: "buy", label: "Buy & Sell", icon: "cart", color: "#7c3aed", href: "/services?q=buy" },
  { id: "all", label: "View All", icon: "grid-four", color: "#38bdf8", href: "/services" },
];

export const PROMO_CARDS = [
  {
    id: "rentals",
    title: "Best Deals On Rentals",
    cta: "Book Now",
    bg: "#fef9c3",
    btnColor: "#ca8a04",
    icon: "car-front" as IconName,
    href: "/services?q=rental",
  },
  {
    id: "roadside",
    title: "Emergency Roadside Assistance",
    cta: "Get Help",
    bg: "#ede9fe",
    btnColor: "#6d28d9",
    icon: "tow-truck" as IconName,
    href: "/services?q=roadside",
  },
  {
    id: "pros",
    title: "Verified Professionals",
    cta: "Book Now",
    bg: "#dcfce7",
    btnColor: "#16a34a",
    icon: "hard-hat" as IconName,
    href: "/services",
  },
];

export const WHY_CHOOSE: { icon: IconName; label: string; color: string }[] = [
  { icon: "shield", label: "Verified\nProfessionals", color: "#16a34a" },
  { icon: "diamond", label: "Affordable\nPricing", color: "#db2777" },
  { icon: "headset", label: "Quick\nSupport", color: "#2563eb" },
  { icon: "lock", label: "Secure\nPayments", color: "#7c3aed" },
];

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "vehicle",
    number: 1,
    title: "VEHICLE SERVICES",
    icon: "car-side",
    services: [
      { name: "Ride Booking", subtitle: "Bike, Auto, Car", icon: "scooter", color: "#7c3aed", href: "/services?q=ride" },
      { name: "Vehicle Rentals", subtitle: "Car, Van, Truck", icon: "car-front", color: "#2563eb", href: "/services?q=rental" },
      { name: "Taxi & Travel", subtitle: "Outstation, Local", icon: "taxi", color: "#ea580c", href: "/services?q=taxi" },
      { name: "Vehicle Repair", subtitle: "All Vehicles", icon: "wrench", color: "#16a34a", href: "/services?q=vehicle" },
      { name: "Roadside Assistance", subtitle: "24x7 Support", icon: "tow-truck", color: "#dc2626", href: "/services?q=roadside" },
      { name: "Vehicle Docs & Insurance", subtitle: "All Documents", icon: "doc-shield", color: "#2563eb", href: "/services?q=insurance" },
    ],
  },
  {
    id: "home",
    number: 2,
    title: "HOME & PROPERTY SERVICES",
    icon: "house",
    services: [
      { name: "Home Cleaning", subtitle: "Cleaning Services", icon: "broom", color: "#16a34a", href: "/services/cleaning/deep-cleaning" },
      { name: "Pest Control", subtitle: "Pest Control", icon: "pest", color: "#dc2626", href: "/services?q=pest" },
      { name: "Plumbing", subtitle: "All Plumbing", icon: "faucet", color: "#2563eb", href: "/services/home-repair/plumbing" },
      { name: "Electrical", subtitle: "All Electrical", icon: "bolt", color: "#ca8a04", href: "/services/home-repair/electrician" },
      { name: "Carpentry", subtitle: "Carpentry Work", icon: "hammer", color: "#7c3aed", href: "/services?q=carpentry" },
      { name: "Painting", subtitle: "Wall Painting", icon: "paint-roller", color: "#16a34a", href: "/services?q=painting" },
    ],
  },
  {
    id: "labour",
    number: 3,
    title: "LABOUR & TECHNICAL SERVICES",
    icon: "worker",
    services: [
      { name: "Labour", subtitle: "Helper, Worker", icon: "shovel", color: "#ea580c", href: "/services?q=labour" },
      { name: "Masonry", subtitle: "Brick, Tile Work", icon: "brick-wall", color: "#7c3aed", href: "/services?q=masonry" },
      { name: "Welding", subtitle: "All Welding", icon: "welding-mask", color: "#2563eb", href: "/services?q=welding" },
      { name: "Fabrication", subtitle: "Metal Fabrication", icon: "ibeam", color: "#16a34a", href: "/services?q=fabrication" },
      { name: "AC Service", subtitle: "AC Repair & Install", icon: "ac-unit", color: "#0891b2", href: "/services/home-repair/ac-repair" },
      { name: "Appliance Repair", subtitle: "All Appliances", icon: "toolbox", color: "#ea580c", href: "/services/appliance-repair/washing-machine-repair" },
    ],
  },
  {
    id: "events",
    number: 4,
    title: "EVENTS & CELEBRATIONS",
    icon: "calendar",
    services: [
      { name: "Venue Booking", subtitle: "Halls, Lawns", icon: "venue", color: "#16a34a", href: "/services?q=venue" },
      { name: "Catering", subtitle: "Food Services", icon: "cloche", color: "#ea580c", href: "/services?q=catering" },
      { name: "Decoration", subtitle: "All Decorations", icon: "arch-flowers", color: "#7c3aed", href: "/services?q=decoration" },
      { name: "Photography", subtitle: "Photo & Video", icon: "camera", color: "#dc2626", href: "/services?q=photography" },
      { name: "DJ & Music", subtitle: "DJ, Sound", icon: "headphones-music", color: "#2563eb", href: "/services?q=dj" },
      { name: "Event Planning", subtitle: "Full Planning", icon: "clipboard-check", color: "#16a34a", href: "/services?q=event" },
    ],
  },
  {
    id: "other",
    number: 5,
    title: "OTHER SERVICES",
    icon: "grid-menu",
    services: [
      { name: "Packers & Movers", subtitle: "Moving Services", icon: "truck", color: "#7c3aed", href: "/services?q=movers" },
      { name: "Tutors & Coaching", subtitle: "Home Tuition", icon: "tutor", color: "#16a34a", href: "/services?q=tutor" },
      { name: "Health & Beauty", subtitle: "Salon, Spa", icon: "beauty", color: "#dc2626", href: "/services/beauty/home-salon" },
      { name: "Fitness & Yoga", subtitle: "Yoga, Fitness", icon: "yoga", color: "#2563eb", href: "/services?q=fitness" },
      { name: "Pet Services", subtitle: "Pet Care", icon: "paw", color: "#ea580c", href: "/services?q=pet" },
      { name: "Elderly Care", subtitle: "Care Services", icon: "walker", color: "#7c3aed", href: "/services?q=elderly" },
    ],
  },
  {
    id: "jobs",
    number: 6,
    title: "JOBS & BUSINESS",
    icon: "briefcase",
    services: [
      { name: "Job Search", subtitle: "Find Jobs", icon: "job-search", color: "#16a34a", href: "/services?q=job" },
      { name: "Post a Job", subtitle: "Hire Talent", icon: "megaphone", color: "#7c3aed", href: "/services?q=hire" },
      { name: "Freelancers", subtitle: "Hire Experts", icon: "freelancer", color: "#2563eb", href: "/services?q=freelance" },
      { name: "Business Services", subtitle: "Grow Business", icon: "buildings", color: "#ea580c", href: "/services?q=business" },
      { name: "Buy & Sell", subtitle: "Marketplace", icon: "cart", color: "#dc2626", href: "/services?q=buy" },
      { name: "Deals & Offers", subtitle: "Best Offers", icon: "tag-percent", color: "#16a34a", href: "/services" },
    ],
  },
];

export const HERO_SLIDES: { id: number; title: string; highlight: string; icons: IconName[] }[] = [
  {
    id: 1,
    title: "ALL SERVICES",
    highlight: "AT YOUR FINGERTIPS",
    icons: ["car-side", "house", "grad-cap", "calendar", "hard-hat", "briefcase"],
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
