import { ModeScaffoldScreen } from "@/components/provider/modes/scaffold/ModeScaffoldScreen";
import { getScaffoldPageData } from "./demo-data";
import type { ScaffoldPageKey } from "./types";

type ModeKey = "professional" | "vendor" | "host" | "studio";

export function createScaffoldComponent(modeKey: ModeKey, modeLabel: string, page: ScaffoldPageKey) {
  const data = getScaffoldPageData(modeKey, page);
  return function Scaffold() {
    return <ModeScaffoldScreen modeLabel={modeLabel} data={data} />;
  };
}
