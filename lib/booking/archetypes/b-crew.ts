import type { BookingFlow } from "./types";

export const crewFlow: BookingFlow = {
  code: "B",
  name: "Crew",
  mechanic: "push-dispatch",
  formComponent: "CrewForm",
  fields: ["slot", "address", "headcount", "days"],
  isEnquiry: false,
  statuses: [
    { code: "pending", label: "Pending" },
    { code: "dispatching", label: "Building crew" },
    { code: "assigned", label: "Crew assigned" },
    { code: "scheduled", label: "Scheduled" },
    { code: "in_progress", label: "In progress" },
    { code: "completed", label: "Completed" },
    { code: "cancelled", label: "Cancelled" },
  ],
};
