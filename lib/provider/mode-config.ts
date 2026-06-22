export type ModePortalType = "PROFESSIONAL" | "RENTAL_VENDOR" | "PROPERTY_HOST" | "EVENT_VENDOR";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  matchPrefix?: boolean;
};

export type SidebarItem = {
  href: string;
  label: string;
  icon: string;
  desc: string;
};

export type ModePortalConfig = {
  type: ModePortalType;
  label: string;
  tagline: string;
  primaryNav: NavItem[];
  sidebar: SidebarItem[];
  inboxTitle: string;
  workTitle: string;
  calendarTitle: string;
};

export const MODE_PORTAL_CONFIG: Record<ModePortalType, ModePortalConfig> = {
  PROFESSIONAL: {
    type: "PROFESSIONAL",
    label: "Professional",
    tagline: "Recurring home services",
    primaryNav: [
      { href: "/partner/dashboard", label: "Home", icon: "home" },
      { href: "/partner/leads", label: "Requests", icon: "comment-alt" },
      { href: "/partner/calendar", label: "Schedule", icon: "calendar" },
      { href: "/partner/earnings", label: "Earnings", icon: "wallet" },
    ],
    sidebar: [
      { href: "/partner/profile", label: "Profile", icon: "user", desc: "Skills, KYC & reviews" },
      { href: "/partner/certificates", label: "Certificates", icon: "diploma", desc: "Training & credentials" },
      { href: "/partner/clients", label: "Clients", icon: "users-alt", desc: "Active customer list" },
      { href: "/partner/wallet", label: "Wallet", icon: "wallet", desc: "Balance & payouts" },
      { href: "/partner/support", label: "Support", icon: "headset", desc: "Help & disputes" },
      { href: "/partner/settings", label: "Settings", icon: "settings", desc: "Notifications & prefs" },
    ],
    inboxTitle: "Service requests",
    workTitle: "Active engagements",
    calendarTitle: "Weekly schedule",
  },
  RENTAL_VENDOR: {
    type: "RENTAL_VENDOR",
    label: "Rental vendor",
    tagline: "Equipment rental business",
    primaryNav: [
      { href: "/partner/dashboard", label: "Home", icon: "home" },
      { href: "/partner/work", label: "Inventory", icon: "box-alt" },
      { href: "/partner/leads", label: "Orders", icon: "cart-shopping-fast" },
      { href: "/partner/earnings", label: "Earnings", icon: "wallet" },
    ],
    sidebar: [
      { href: "/partner/profile", label: "Profile", icon: "user", desc: "Business & KYC" },
      { href: "/partner/analytics", label: "Stock analytics", icon: "chart-histogram", desc: "Utilization & trends" },
      { href: "/partner/maintenance", label: "Maintenance", icon: "tools", desc: "Repairs & downtime" },
      { href: "/partner/wallet", label: "Wallet", icon: "wallet", desc: "Revenue & settlements" },
      { href: "/partner/support", label: "Support", icon: "headset", desc: "Order help" },
      { href: "/partner/settings", label: "Settings", icon: "settings", desc: "Alerts & preferences" },
    ],
    inboxTitle: "Rental orders",
    workTitle: "Inventory",
    calendarTitle: "Item calendar",
  },
  PROPERTY_HOST: {
    type: "PROPERTY_HOST",
    label: "Property host",
    tagline: "Occupancy & enquiries",
    primaryNav: [
      { href: "/partner/dashboard", label: "Home", icon: "home" },
      { href: "/partner/work", label: "Listings", icon: "building" },
      { href: "/partner/leads", label: "Bookings", icon: "calendar" },
      { href: "/partner/earnings", label: "Earnings", icon: "wallet" },
    ],
    sidebar: [
      { href: "/partner/profile", label: "Profile", icon: "user", desc: "Host profile & KYC" },
      { href: "/partner/properties", label: "Properties", icon: "house-blank", desc: "All listings" },
      { href: "/partner/documents", label: "Documents", icon: "id-card-clip-alt", desc: "Ownership proofs" },
      { href: "/partner/wallet", label: "Wallet", icon: "wallet", desc: "Rent collections" },
      { href: "/partner/support", label: "Support", icon: "headset", desc: "Tenant support" },
      { href: "/partner/settings", label: "Settings", icon: "settings", desc: "Preferences" },
    ],
    inboxTitle: "Booking enquiries",
    workTitle: "Listings",
    calendarTitle: "Occupancy calendar",
  },
  EVENT_VENDOR: {
    type: "EVENT_VENDOR",
    label: "Event studio",
    tagline: "Events & packages",
    primaryNav: [
      { href: "/partner/dashboard", label: "Home", icon: "home" },
      { href: "/partner/leads", label: "Enquiries", icon: "comment-alt" },
      { href: "/partner/calendar", label: "Calendar", icon: "calendar" },
      { href: "/partner/earnings", label: "Earnings", icon: "wallet" },
    ],
    sidebar: [
      { href: "/partner/profile", label: "Profile", icon: "user", desc: "Studio profile" },
      { href: "/partner/portfolio", label: "Portfolio", icon: "camera-retro", desc: "Photos & videos" },
      { href: "/partner/packages", label: "Packages", icon: "box-open", desc: "Pricing & offers" },
      { href: "/partner/quotes", label: "Quotes", icon: "file-invoice", desc: "Sent proposals" },
      { href: "/partner/wallet", label: "Wallet", icon: "wallet", desc: "Payments" },
      { href: "/partner/support", label: "Support", icon: "headset", desc: "Client help" },
      { href: "/partner/settings", label: "Settings", icon: "settings", desc: "Preferences" },
    ],
    inboxTitle: "Event enquiries",
    workTitle: "Confirmed events",
    calendarTitle: "Event calendar",
  },
};

export function getModePortalConfig(type: string): ModePortalConfig | null {
  return MODE_PORTAL_CONFIG[type as ModePortalType] ?? null;
}
