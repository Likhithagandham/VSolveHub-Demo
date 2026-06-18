import type { BookingFlow } from "./types";

export const staffingFlow: BookingFlow = {
  code: "C",
  name: "Staffing",
  mechanic: "inbox-pull",
  formComponent: "StaffingForm",
  fields: ["role", "schedule", "pay"],
  isEnquiry: true,
  statuses: [
    { code: "enquiry", label: "Enquiry sent" },
    { code: "quoted", label: "Quote received" },
    { code: "confirmed", label: "Confirmed" },
    { code: "active", label: "Active engagement" },
    { code: "completed", label: "Completed" },
    { code: "cancelled", label: "Cancelled" },
  ],
};
