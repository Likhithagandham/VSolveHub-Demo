export type ProviderMode = {
  type: string;
  label: string;
  surface: string;
  leadType: "30s-alert" | "inbox";
  kycDocs: string[];
  availabilityType: string;
  earningsLabel: string;
  dashboardTitle: string;
  workLabel: string;
  phase: 1 | 2;
};
