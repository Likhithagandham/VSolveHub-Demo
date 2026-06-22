import type { ProviderModeDefinition } from "../../types";
import { createPortalModeScreens } from "../portal/screens";

const screens = createPortalModeScreens("PROPERTY_HOST");



export const hostMode: ProviderModeDefinition = {

  type: "PROPERTY_HOST",

  label: "Host",

  dashboard: screens.dashboard,
  leads: screens.leads,
  work: screens.work,
  workDetail: screens.workDetail,
  calendar: screens.calendar,
  earnings: screens.earnings,
  profile: screens.profile,

  kycConfig: {

    title: "Host verification",

    fields: [

      { id: "aadhaar", label: "Aadhaar", type: "text", required: true, placeholder: "Last 4 digits" },

      { id: "ownership_proof", label: "Ownership proof", type: "file", required: true },

      { id: "property_photos", label: "Property photos", type: "file", required: true },

    ],

  },

  availabilityConfig: { supportsWeeklyHours: false, supportsLeaveDays: true, supportsBlockedDates: true },

};

