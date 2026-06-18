import type { BookingFlow } from "./types";

export const propertyFlow: BookingFlow = {
  code: "E",
  name: "Property",
  mechanic: "inbox-pull",
  formComponent: "PropertyForm",
  fields: ["sharing", "moveIn", "viewing"],
  isEnquiry: true,
  statuses: [
    { code: "enquiry", label: "Enquiry sent" },
    { code: "viewing_scheduled", label: "Viewing scheduled" },
    { code: "application", label: "Application submitted" },
    { code: "approved", label: "Approved" },
    { code: "move_in", label: "Move-in" },
    { code: "cancelled", label: "Cancelled" },
  ],
};
