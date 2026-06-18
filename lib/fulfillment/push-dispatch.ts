export type EligibleProvider = {
  id: string;
  name: string;
  distanceKm: number;
  rating: number;
};

export type OfferWave = {
  waveId: string;
  bookingRef: string;
  providers: EligibleProvider[];
  expiresInSeconds: number;
  expiresAt: string;
};

const MOCK_POOL: EligibleProvider[] = [
  { id: "prov-captain-1", name: "Ravi K.", distanceKm: 1.2, rating: 4.8 },
  { id: "prov-captain-2", name: "Suresh M.", distanceKm: 2.5, rating: 4.6 },
  { id: "prov-captain-3", name: "Anil P.", distanceKm: 3.1, rating: 4.9 },
];

export function buildEligiblePool(_bookingRef: string): EligibleProvider[] {
  return MOCK_POOL.filter((p) => p.distanceKm < 5);
}

export function createOfferWave(bookingRef: string): OfferWave {
  const expiresInSeconds = 30;
  return {
    waveId: `wave_${Date.now()}`,
    bookingRef,
    providers: buildEligiblePool(bookingRef).slice(0, 2),
    expiresInSeconds,
    expiresAt: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
  };
}

export function expireStaleOffers(): { expired: number } {
  // TODO: Phase-2 — query DB for expired offers
  return { expired: 0 };
}
