import type { KycConfig, AvailabilityConfig } from "../../types";

export const captainKycConfig: KycConfig = {
  title: "Captain verification",
  fields: [
    { id: "aadhaar", label: "Aadhaar", type: "text", required: true, placeholder: "Last 4 digits" },
    { id: "selfie", label: "Live selfie", type: "selfie", required: true },
    { id: "skill_cert", label: "Skill certificate (optional)", type: "file", required: false },
  ],
};

export const captainAvailabilityConfig: AvailabilityConfig = {
  supportsWeeklyHours: true,
  supportsLeaveDays: true,
  supportsBlockedDates: true,
};
