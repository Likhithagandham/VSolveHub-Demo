// TODO: Phase-2 — provider_requests inbox with SLA tracking

export type ProviderRequest = {
  id: string;
  providerId: string;
  type: string;
  status: string;
  slaHours: number;
  createdAt: string;
};

const MOCK_REQUESTS: ProviderRequest[] = [
  {
    id: "req-1",
    providerId: "prov-prof-1",
    type: "staffing",
    status: "pending",
    slaHours: 24,
    createdAt: new Date().toISOString(),
  },
];

export function getProviderRequests(providerId: string): ProviderRequest[] {
  return MOCK_REQUESTS.filter((r) => r.providerId === providerId);
}

export function acceptRequest(requestId: string): ProviderRequest | null {
  const req = MOCK_REQUESTS.find((r) => r.id === requestId);
  if (!req) return null;
  req.status = "accepted";
  return req;
}
