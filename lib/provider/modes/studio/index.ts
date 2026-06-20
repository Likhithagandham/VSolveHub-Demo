import type { ProviderModeDefinition } from "../../types";

import { createScaffoldComponent } from "../scaffold/components";



export const studioMode: ProviderModeDefinition = {

  type: "EVENT_VENDOR",

  label: "Studio",

  dashboard: createScaffoldComponent("studio", "Studio", "dashboard"),

  leads: createScaffoldComponent("studio", "Studio", "leads"),

  work: createScaffoldComponent("studio", "Studio", "work"),

  workDetail: createScaffoldComponent("studio", "Studio", "workDetail"),

  calendar: createScaffoldComponent("studio", "Studio", "calendar"),

  earnings: createScaffoldComponent("studio", "Studio", "earnings"),

  profile: createScaffoldComponent("studio", "Studio", "profile"),

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

