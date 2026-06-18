import type { BookingFlow } from "./types";

export const rentalFlow: BookingFlow = {
  code: "D",
  name: "Rental",
  mechanic: "inbox-pull",
  formComponent: "RentalForm",
  fields: ["qty", "dateRange", "deposit"],
  isEnquiry: true,
  statuses: [
    { code: "enquiry", label: "Enquiry sent" },
    { code: "availability_check", label: "Checking availability" },
    { code: "quoted", label: "Quote received" },
    { code: "reserved", label: "Reserved" },
    { code: "delivered", label: "Delivered" },
    { code: "returned", label: "Returned" },
    { code: "cancelled", label: "Cancelled" },
  ],
};
