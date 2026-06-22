const HYDERABAD_ZONES = [
  { name: "Hitech City", lat: 17.4435, lng: 78.3772, radiusKm: 3 },
  { name: "Gachibowli", lat: 17.4401, lng: 78.3489, radiusKm: 3 },
  { name: "Madhapur", lat: 17.4486, lng: 78.3908, radiusKm: 2.5 },
  { name: "Banjara Hills", lat: 17.4156, lng: 78.4347, radiusKm: 2.5 },
  { name: "Secunderabad", lat: 17.4399, lng: 78.4983, radiusKm: 3 },
  { name: "Kukatpally", lat: 17.4849, lng: 78.4138, radiusKm: 3 },
  { name: "LB Nagar", lat: 17.366, lng: 78.548, radiusKm: 3 },
  { name: "Uppal", lat: 17.4015, lng: 78.5582, radiusKm: 2.5 },
] as const;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const r = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function resolveCaptainZone(lat: number, lng: number) {
  let best = { name: "Central Hyderabad", distanceKm: Infinity };
  for (const zone of HYDERABAD_ZONES) {
    const distanceKm = haversineKm(lat, lng, zone.lat, zone.lng);
    if (distanceKm < best.distanceKm) {
      best = { name: zone.name, distanceKm };
    }
  }
  const inZone = HYDERABAD_ZONES.find((z) => z.name === best.name);
  const inside = inZone ? best.distanceKm <= inZone.radiusKm : best.distanceKm < 4;
  return {
    zone: best.name,
    distanceKm: Math.round(best.distanceKm * 10) / 10,
    label: inside ? best.name : `Near ${best.name}`,
  };
}

export function buildDemandHeatmap(lat: number, lng: number, zone: string) {
  const hour = new Date().getHours();
  const seed = Math.round(lat * 100 + lng * 100) + hour + zone.length;
  const cells: { row: number; col: number; intensity: number }[] = [];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const n = (seed * (row + 1) * (col + 1) * 9301 + 49297) % 233280;
      const base = n / 233280;
      const peakBoost = hour >= 8 && hour <= 11 ? 0.15 : hour >= 17 && hour <= 21 ? 0.25 : 0;
      const centerBoost = Math.abs(row - 2) + Math.abs(col - 2) < 2 ? 0.2 : 0;
      const intensity = Math.min(1, base * 0.7 + peakBoost + centerBoost);
      cells.push({ row, col, intensity: Math.round(intensity * 100) / 100 });
    }
  }

  return { cells, centerZone: zone, updatedAt: new Date().toISOString() };
}
