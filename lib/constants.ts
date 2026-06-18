export const MOCK_OTP = "1234";
export const SESSION_COOKIE = "vsh_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const BOOKING_STATUSES = [
  "SEARCHING",
  "ASSIGNED",
  "ON_THE_WAY",
  "ARRIVED",
  "IN_PROGRESS",
  "COMPLETED",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const STATUS_LABELS: Record<BookingStatus, string> = {
  SEARCHING: "Searching for provider",
  ASSIGNED: "Provider assigned",
  ON_THE_WAY: "On the way",
  ARRIVED: "Arrived at location",
  IN_PROGRESS: "Service in progress",
  COMPLETED: "Completed",
};

export const STATUS_MESSAGES: Record<BookingStatus, string> = {
  SEARCHING: "Searching for nearby service provider.",
  ASSIGNED: "A provider has been assigned to your booking.",
  ON_THE_WAY: "Your provider is on the way.",
  ARRIVED: "Provider has arrived at your address.",
  IN_PROGRESS: "Service is currently in progress.",
  COMPLETED: "Your service has been completed.",
};

export const RECENTLY_VIEWED_COOKIE = "vsh_recent";
export const RECENTLY_VIEWED_MAX = 6;
