import type { ProviderType } from "./constants";

export type PartnerDemoAccount = {
  providerType: ProviderType;
  phone: string;
  name: string;
  label: string;
  description: string;
  icon: string;
};

export const PARTNER_DEMO_ACCOUNTS: PartnerDemoAccount[] = [
  {
    providerType: "CAPTAIN",
    phone: "9876543211",
    name: "Demo Captain",
    label: "Captain",
    description: "Rides, live offers & trip management",
    icon: "motorcycle",
  },
  {
    providerType: "PROFESSIONAL",
    phone: "9876543212",
    name: "Demo Professional",
    label: "Professional",
    description: "Maid, cook, tutor, nurse & driver services",
    icon: "user-md",
  },
  {
    providerType: "RENTAL_VENDOR",
    phone: "9876543213",
    name: "Demo Rental Vendor",
    label: "Rental vendor",
    description: "Equipment inventory & rental orders",
    icon: "box-alt",
  },
  {
    providerType: "PROPERTY_HOST",
    phone: "9876543214",
    name: "Demo Property Host",
    label: "Property host",
    description: "PG, rooms & occupancy management",
    icon: "building",
  },
  {
    providerType: "EVENT_VENDOR",
    phone: "9876543215",
    name: "Demo Event Studio",
    label: "Event studio",
    description: "Enquiries, packages & event calendar",
    icon: "camera-retro",
  },
];

export function getDemoAccountByPhone(phone: string) {
  return PARTNER_DEMO_ACCOUNTS.find((a) => a.phone === phone);
}

export function getDemoAccountByType(type: ProviderType) {
  return PARTNER_DEMO_ACCOUNTS.find((a) => a.providerType === type);
}
