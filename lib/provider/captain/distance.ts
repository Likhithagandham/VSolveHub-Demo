export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const r = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function estimateTripDistances(
  captainLat: number,
  captainLng: number,
  pickupLat: number | null | undefined,
  pickupLng: number | null | undefined,
  quotedAmount: number
) {
  const pickupKm =
    pickupLat != null && pickupLng != null
      ? Math.round(haversineKm(captainLat, captainLng, pickupLat, pickupLng) * 10) / 10
      : 1.2;
  const dropKm = Math.max(2, Math.round((quotedAmount / 10000) * 10) / 10 + 2.5);
  return { pickupKm, dropKm };
}
