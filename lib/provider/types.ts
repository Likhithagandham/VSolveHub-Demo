import type { ComponentType } from "react";
import type { ProviderType } from "./constants";

export type KycFieldConfig = {
  id: string;
  label: string;
  type: "text" | "file" | "selfie";
  required: boolean;
  placeholder?: string;
};

export type KycConfig = {
  title: string;
  fields: KycFieldConfig[];
};

export type AvailabilityConfig = {
  supportsWeeklyHours: boolean;
  supportsLeaveDays: boolean;
  supportsBlockedDates: boolean;
};

export type ProviderProfile = {
  id: string;
  userId: string;
  providerType: ProviderType;
  status: string;
  onboardingCompleted: boolean;
  name: string;
  phone: string;
  worker?: {
    id: string;
    displayName: string;
    phone: string;
    isOnline: boolean;
    rating: number;
    completedJobs: number;
    acceptanceRate: number;
  } | null;
};

export type ProviderModeDefinition = {
  type: ProviderType;
  label: string;
  dashboard: ComponentType;
  leads: ComponentType;
  work: ComponentType;
  workDetail: ComponentType;
  calendar: ComponentType;
  earnings: ComponentType;
  profile: ComponentType;
  kycConfig: KycConfig;
  availabilityConfig: AvailabilityConfig;
};
