import type { BookingFlow } from "./types";
import { dispatchFlow } from "./a-dispatch";
import { crewFlow } from "./b-crew";
import { staffingFlow } from "./c-staffing";
import { rentalFlow } from "./d-rental";
import { propertyFlow } from "./e-property";
import { quoteFlow } from "./f-quote";

export const BOOKING_FLOWS: Record<string, BookingFlow> = {
  A: dispatchFlow,
  B: crewFlow,
  C: staffingFlow,
  D: rentalFlow,
  E: propertyFlow,
  F: quoteFlow,
};

export function getBookingFlow(archetype: string): BookingFlow {
  return BOOKING_FLOWS[archetype] ?? dispatchFlow;
}

export { dispatchFlow, crewFlow, staffingFlow, rentalFlow, propertyFlow, quoteFlow };
export type { BookingFlow, BookingStatus } from "./types";
