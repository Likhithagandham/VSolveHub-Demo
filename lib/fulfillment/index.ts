import { createOfferWave, buildEligiblePool, expireStaleOffers } from "./push-dispatch";
import { getProviderRequests, acceptRequest } from "./inbox-pull";

export type FulfillmentMechanic = "push-dispatch" | "inbox-pull";

export const FULFILLMENT_REGISTRY: Record<FulfillmentMechanic, {
  name: string;
  dispatch?: typeof createOfferWave;
  getRequests?: typeof getProviderRequests;
}> = {
  "push-dispatch": {
    name: "Push Dispatch (30s waves)",
    dispatch: createOfferWave,
  },
  "inbox-pull": {
    name: "Inbox Pull (SLA)",
    getRequests: getProviderRequests,
  },
};

export function getMechanic(archetype: string): FulfillmentMechanic {
  return ["A", "B"].includes(archetype) ? "push-dispatch" : "inbox-pull";
}

export { createOfferWave, buildEligiblePool, expireStaleOffers, getProviderRequests, acceptRequest };
