import type { ProviderModeDefinition } from "../types";
import { CaptainDashboard } from "@/components/provider/modes/captain/CaptainDashboard";
import { CaptainLeadsScreen } from "@/components/provider/modes/captain/CaptainLeadsScreen";
import { CaptainWorkScreen } from "@/components/provider/modes/captain/CaptainWorkScreen";
import { CaptainActiveTrip } from "@/components/provider/modes/captain/CaptainActiveTrip";
import { CaptainCalendarScreen } from "@/components/provider/modes/captain/CaptainCalendarScreen";
import { CaptainEarningsScreen } from "@/components/provider/modes/captain/CaptainEarningsScreen";
import { CaptainProfileScreen } from "@/components/provider/modes/captain/CaptainProfileScreen";
import { captainAvailabilityConfig, captainKycConfig } from "./captain/config";
import { professionalMode } from "./professional";
import { vendorMode } from "./vendor";
import { hostMode } from "./host";
import { studioMode } from "./studio";
import type { ProviderType } from "../constants";

function CaptainWorkDetailWrapper(_props: { bookingId: string }) {
  return null;
}

export const captainMode: ProviderModeDefinition = {
  type: "CAPTAIN",
  label: "Captain",
  dashboard: CaptainDashboard,
  leads: CaptainLeadsScreen,
  work: CaptainWorkScreen,
  workDetail: CaptainWorkDetailWrapper,
  calendar: CaptainCalendarScreen,
  earnings: CaptainEarningsScreen,
  profile: CaptainProfileScreen,
  kycConfig: captainKycConfig,
  availabilityConfig: captainAvailabilityConfig,
};

export { CaptainActiveTrip as CaptainWorkDetail };

const MODE_REGISTRY: Record<ProviderType, ProviderModeDefinition> = {
  CAPTAIN: captainMode,
  PROFESSIONAL: professionalMode,
  RENTAL_VENDOR: vendorMode,
  PROPERTY_HOST: hostMode,
  EVENT_VENDOR: studioMode,
};

export function resolveMode(providerType: string): ProviderModeDefinition {
  return MODE_REGISTRY[providerType as ProviderType] ?? captainMode;
}

export function allModes() {
  return Object.values(MODE_REGISTRY);
}
