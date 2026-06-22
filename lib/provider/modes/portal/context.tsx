"use client";

import { createContext, useContext } from "react";
import type { ModePortalConfig, ModePortalType } from "@/lib/provider/mode-config";
import { getModePortalConfig } from "@/lib/provider/mode-config";
import { getPortalData } from "@/lib/provider/modes/portal/data";

type PortalContextValue = {
  modeType: ModePortalType;
  config: ModePortalConfig;
  data: ReturnType<typeof getPortalData>;
};

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ modeType, children }: { modeType: ModePortalType; children: React.ReactNode }) {
  const config = getModePortalConfig(modeType)!;
  const data = getPortalData(modeType);
  return <PortalContext.Provider value={{ modeType, config, data }}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within PortalProvider");
  return ctx;
}
