export const MOCK_OTP = "1234";
export const SESSION_COOKIE = "vsh_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const BOOKING_STATUSES = [
  "REQUESTED",
  "ACCEPTED",
  "ON_THE_WAY",
  "STARTED",
  "COMPLETED",
  "CANCELLED",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/** Map legacy DB statuses from older bookings */
export const LEGACY_STATUS_MAP: Record<string, BookingStatus> = {
  SEARCHING: "REQUESTED",
  ASSIGNED: "ACCEPTED",
  ARRIVED: "ON_THE_WAY",
  IN_PROGRESS: "STARTED",
};

export function normalizeBookingStatus(status: string): BookingStatus {
  if (BOOKING_STATUSES.includes(status as BookingStatus)) {
    return status as BookingStatus;
  }
  return LEGACY_STATUS_MAP[status] ?? "REQUESTED";
}

export const STATUS_LABELS: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  ON_THE_WAY: "On the way",
  STARTED: "Started",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const STATUS_MESSAGES: Record<BookingStatus, string> = {
  REQUESTED: "Your booking request has been sent.",
  ACCEPTED: "A professional has accepted your booking.",
  ON_THE_WAY: "Your professional is on the way.",
  STARTED: "Service has started at your location.",
  COMPLETED: "Your service has been completed.",
  CANCELLED: "This booking was cancelled.",
};

export const RECENTLY_VIEWED_COOKIE = "vsh_recent";
export const RECENTLY_VIEWED_MAX = 6;
