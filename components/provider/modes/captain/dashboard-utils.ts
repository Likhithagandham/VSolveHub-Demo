import type { CaptainDashboardData } from "@/lib/provider/captain/dashboard";

export type CaptainDashboardState = CaptainDashboardData;

export function secondsLeft(expiresAt: string) {
  return Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000));
}

export function availabilityLabel(availability: CaptainDashboardState["availability"]) {
  if (availability === "on_job") return "On active job";
  if (availability === "online") return "Available for dispatch";
  return "Offline — not receiving offers";
}

export function statusLabel(status: string) {
  return status.replace(/_/g, " ").toLowerCase();
}

export function mapsUrl(lat: number | null | undefined, lng: number | null | undefined, address?: string) {
  if (lat != null && lng != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
  return "https://www.google.com/maps";
}
