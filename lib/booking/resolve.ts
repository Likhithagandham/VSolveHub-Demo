import { getBookingFlow } from "./archetypes";
import type { CatalogService } from "@/lib/catalog/mock";

export function resolveArchetype(service: { archetype?: string }): string {
  return service.archetype ?? "A";
}

export function resolveBookingFlow(service: { archetype?: string }) {
  const archetype = resolveArchetype(service);
  return getBookingFlow(archetype);
}

export function resolveFromService(service: CatalogService | { archetype: string }) {
  return resolveBookingFlow(service);
}
