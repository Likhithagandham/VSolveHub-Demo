import type { ProviderModeDefinition } from "../../types";

import { createScaffoldComponent } from "../scaffold/components";



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

  dashboard: createScaffoldComponent("professional", "Professional", "dashboard"),

  leads: createScaffoldComponent("professional", "Professional", "leads"),

  work: createScaffoldComponent("professional", "Professional", "work"),

  workDetail: createScaffoldComponent("professional", "Professional", "workDetail"),

  calendar: createScaffoldComponent("professional", "Professional", "calendar"),

  earnings: createScaffoldComponent("professional", "Professional", "earnings"),

  profile: createScaffoldComponent("professional", "Professional", "profile"),

  kycConfig: professionalKyc,

  availabilityConfig: { supportsWeeklyHours: true, supportsLeaveDays: true, supportsBlockedDates: false },

};

