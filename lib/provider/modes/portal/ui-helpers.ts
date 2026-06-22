const STAT_ICONS = [
  "inbox",
  "users-alt",
  "calendar",
  "clock",
  "wallet",
  "chart-histogram",
  "star",
] as const;

const STAT_TONES = ["violet", "blue", "amber", "emerald", "rose", "cyan"] as const;

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function getStatIcon(index: number) {
  return STAT_ICONS[index % STAT_ICONS.length];
}

export function getStatTone(index: number) {
  return STAT_TONES[index % STAT_TONES.length];
}

export function getRequestStatusLabel(status: string) {
  switch (status) {
    case "pending":
      return "New request";
    case "negotiating":
      return "In negotiation";
    case "accepted":
      return "Accepted";
    case "declined":
      return "Declined";
    default:
      return status;
  }
}
