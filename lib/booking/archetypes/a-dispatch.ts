import type { BookingFlow } from "./types";

export const dispatchFlow: BookingFlow = {
  code: "A",
  name: "Dispatch",
  mechanic: "push-dispatch",
  formComponent: "DispatchForm",
  fields: ["slot", "address"],
  isEnquiry: false,
  statuses: [
    { code: "pending", label: "Pending" },
    { code: "dispatching", label: "Finding provider" },
    { code: "assigned", label: "Provider assigned" },
    { code: "en_route", label: "On the way" },
    { code: "in_progress", label: "In progress" },
    { code: "completed", label: "Completed" },
    { code: "cancelled", label: "Cancelled" },
  ],
};
