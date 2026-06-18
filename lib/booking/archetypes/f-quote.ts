import type { BookingFlow } from "./types";

export const quoteFlow: BookingFlow = {
  code: "F",
  name: "Quote",
  mechanic: "inbox-pull",
  formComponent: "QuoteForm",
  fields: ["date", "venue", "guestCount"],
  isEnquiry: true,
  statuses: [
    { code: "enquiry", label: "Enquiry sent" },
    { code: "quoted", label: "Quote received" },
    { code: "negotiating", label: "Negotiating" },
    { code: "confirmed", label: "Confirmed" },
    { code: "in_progress", label: "In progress" },
    { code: "completed", label: "Completed" },
    { code: "cancelled", label: "Cancelled" },
  ],
};
