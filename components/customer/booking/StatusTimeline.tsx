"use client";

import { BOOKING_STATUSES, STATUS_LABELS, type BookingStatus } from "@/lib/constants";

type StatusTimelineProps = {
  currentStatus: string;
};

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = BOOKING_STATUSES.indexOf(currentStatus as BookingStatus);

  return (
    <ol className="timeline">
      {BOOKING_STATUSES.map((status, index) => {
        const state =
          index < currentIndex ? "done" : index === currentIndex ? "active" : "pending";
        return (
          <li key={status} className={`timeline-item ${state}`}>
            <span className="timeline-dot" />
            <span className="timeline-label">{STATUS_LABELS[status]}</span>
          </li>
        );
      })}
    </ol>
  );
}
