import { CaptainDashboard } from "./captain/CaptainMode";
import { Phase2Placeholder } from "./Phase2Placeholder";
import { getProviderMode } from "@/lib/provider/modes";

export function ModeDashboard({ providerType }: { providerType: string }) {
  const mode = getProviderMode(providerType);

  if (mode.phase === 1 && providerType === "captain") {
    return <CaptainDashboard />;
  }

  return <Phase2Placeholder mode={mode} />;
}
