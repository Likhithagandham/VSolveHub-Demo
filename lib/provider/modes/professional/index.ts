import type { ProviderModeDefinition } from "../../types";
import { createPortalModeScreens } from "../portal/screens";

const screens = createPortalModeScreens("PROFESSIONAL");



const professionalKyc = {

  title: "Professional verification",

  fields: [

    { id: "aadhaar", label: "Aadhaar", type: "text" as const, required: true, placeholder: "Last 4 digits" },

    { id: "selfie", label: "Live selfie", type: "selfie" as const, required: true },

    { id: "skill_cert", label: "Skill certificate (optional)", type: "file" as const, required: false },

  ],

};



export const professionalMode: ProviderModeDefinition = {

  type: "PROFESSIONAL",

  label: "Professional",

  dashboard: screens.dashboard,
  leads: screens.leads,
  work: screens.work,
  workDetail: screens.workDetail,
  calendar: screens.calendar,
  earnings: screens.earnings,
  profile: screens.profile,

  kycConfig: professionalKyc,

  availabilityConfig: { supportsWeeklyHours: true, supportsLeaveDays: true, supportsBlockedDates: false },

};

