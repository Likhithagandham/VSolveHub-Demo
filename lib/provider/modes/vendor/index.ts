import type { ProviderModeDefinition } from "../../types";

import { createScaffoldComponent } from "../scaffold/components";



export const vendorMode: ProviderModeDefinition = {

  type: "RENTAL_VENDOR",

  label: "Vendor",

  dashboard: createScaffoldComponent("vendor", "Vendor", "dashboard"),

  leads: createScaffoldComponent("vendor", "Vendor", "leads"),

  work: createScaffoldComponent("vendor", "Vendor", "work"),

  workDetail: createScaffoldComponent("vendor", "Vendor", "workDetail"),

  calendar: createScaffoldComponent("vendor", "Vendor", "calendar"),

  earnings: createScaffoldComponent("vendor", "Vendor", "earnings"),

  profile: createScaffoldComponent("vendor", "Vendor", "profile"),

  kycConfig: {

    title: "Vendor verification",

    fields: [

      { id: "aadhaar", label: "Aadhaar", type: "text", required: true, placeholder: "Last 4 digits" },

      { id: "business_proof", label: "Business proof", type: "file", required: true },

      { id: "portfolio", label: "Inventory / portfolio photos", type: "file", required: true },

    ],

  },

  availabilityConfig: { supportsWeeklyHours: false, supportsLeaveDays: false, supportsBlockedDates: true },

};

