"use client";

import { BOOKING_STATUSES, STATUS_LABELS, normalizeBookingStatus, type BookingStatus } from "@/lib/constants";

type StatusTimelineProps = {
  currentStatus: string;
};

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const normalized = normalizeBookingStatus(currentStatus);
  const activeStatuses = BOOKING_STATUSES.filter((s) => s !== "CANCELLED");
  const currentIndex =
    normalized === "CANCELLED" ? -1 : activeStatuses.indexOf(normalized);

  return (
    <ol className="timeline">
      {activeStatuses.map((status, index) => {
        const state =
          normalized === "CANCELLED"
            ? "pending"
            : index < currentIndex
              ? "done"
              : index === currentIndex
                ? "active"
                : "pending";
        return (
          <li key={status} className={`timeline-item ${state}`}>
            <span className="timeline-dot" />
            <span className="timeline-label">{STATUS_LABELS[status as BookingStatus]}</span>
          </li>
        );
      })}
    </ol>
  );
}
