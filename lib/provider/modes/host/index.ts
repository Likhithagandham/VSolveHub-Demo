import type { ProviderModeDefinition } from "../../types";

import { createScaffoldComponent } from "../scaffold/components";



export const hostMode: ProviderModeDefinition = {

  type: "PROPERTY_HOST",

  label: "Host",

  dashboard: createScaffoldComponent("host", "Host", "dashboard"),

  leads: createScaffoldComponent("host", "Host", "leads"),

  work: createScaffoldComponent("host", "Host", "work"),

  workDetail: createScaffoldComponent("host", "Host", "workDetail"),

  calendar: createScaffoldComponent("host", "Host", "calendar"),

  earnings: createScaffoldComponent("host", "Host", "earnings"),

  profile: createScaffoldComponent("host", "Host", "profile"),

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

