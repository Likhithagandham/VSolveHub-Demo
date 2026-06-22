import type { ModePortalType } from "@/lib/provider/mode-config";
import { PortalDashboard } from "@/components/provider/modes/portal/PortalDashboard";
import { PortalLiveInbox } from "@/components/provider/modes/portal/PortalLiveInbox";
import { PortalLiveWork } from "@/components/provider/modes/portal/PortalLiveWork";
import { PortalActiveJob } from "@/components/provider/modes/portal/PortalActiveJob";
import { PortalCalendar } from "@/components/provider/modes/portal/PortalCalendar";
import { PortalEarnings } from "@/components/provider/modes/portal/PortalEarnings";
import { PortalProfile } from "@/components/provider/modes/portal/PortalProfile";

export function createPortalModeScreens(_type: ModePortalType) {
  return {
    dashboard: PortalDashboard,
    leads: PortalLiveInbox,
    work: PortalLiveWork,
    workDetail: PortalActiveJob,
    calendar: PortalCalendar,
    earnings: PortalEarnings,
    profile: PortalProfile,
  };
}
