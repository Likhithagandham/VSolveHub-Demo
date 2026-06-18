import type { ProviderMode } from "./types";

export const captainMode: ProviderMode = {
  type: "captain",
  label: "Captain",
  surface: "jobs",
  leadType: "30s-alert",
  kycDocs: ["aadhaar", "driving_license", "vehicle_rc"],
  availabilityType: "online-toggle",
  earningsLabel: "Trip earnings",
  dashboardTitle: "Captain Dashboard",
  workLabel: "Jobs",
  phase: 1,
};

export const professionalMode: ProviderMode = {
  type: "professional",
  label: "Professional",
  surface: "engagements",
  leadType: "inbox",
  kycDocs: ["aadhaar", "experience_certificate"],
  availabilityType: "schedule",
  earningsLabel: "Engagement earnings",
  dashboardTitle: "Professional Dashboard",
  workLabel: "Engagements",
  phase: 2,
};

export const vendorMode: ProviderMode = {
  type: "vendor",
  label: "Vendor",
  surface: "inventory",
  leadType: "inbox",
  kycDocs: ["aadhaar", "gst", "business_proof"],
  availabilityType: "stock",
  earningsLabel: "Rental earnings",
  dashboardTitle: "Vendor Dashboard",
  workLabel: "Inventory",
  phase: 2,
};

export const hostMode: ProviderMode = {
  type: "host",
  label: "Host",
  surface: "listings",
  leadType: "inbox",
  kycDocs: ["aadhaar", "property_docs"],
  availabilityType: "beds",
  earningsLabel: "Booking earnings",
  dashboardTitle: "Host Dashboard",
  workLabel: "Listings",
  phase: 2,
};

export const studioMode: ProviderMode = {
  type: "studio",
  label: "Studio",
  surface: "packages",
  leadType: "inbox",
  kycDocs: ["aadhaar", "portfolio", "gst"],
  availabilityType: "calendar",
  earningsLabel: "Package earnings",
  dashboardTitle: "Studio Dashboard",
  workLabel: "Packages",
  phase: 2,
};

export const PROVIDER_MODES: Record<string, ProviderMode> = {
  captain: captainMode,
  professional: professionalMode,
  vendor: vendorMode,
  host: hostMode,
  studio: studioMode,
};

export function getProviderMode(type: string): ProviderMode {
  return PROVIDER_MODES[type] ?? captainMode;
}

export type { ProviderMode } from "./types";
