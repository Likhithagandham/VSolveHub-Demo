import type { ProviderModeDefinition } from "../../types";
import { createPortalModeScreens } from "../portal/screens";

const screens = createPortalModeScreens("EVENT_VENDOR");



export const studioMode: ProviderModeDefinition = {

  type: "EVENT_VENDOR",

  label: "Studio",

  dashboard: screens.dashboard,
  leads: screens.leads,
  work: screens.work,
  workDetail: screens.workDetail,
  calendar: screens.calendar,
  earnings: screens.earnings,
  profile: screens.profile,

  kycConfig: {

    title: "Studio verification",

    fields: [

      { id: "aadhaar", label: "Aadhaar", type: "text", required: true, placeholder: "Last 4 digits" },

      { id: "business_proof", label: "Business proof", type: "file", required: true },

      { id: "portfolio", label: "Portfolio photos", type: "file", required: true },

    ],

  },

  availabilityConfig: { supportsWeeklyHours: false, supportsLeaveDays: false, supportsBlockedDates: true },

};

