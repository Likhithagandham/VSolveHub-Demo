"use client";

import { useState } from "react";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { usePortal } from "@/lib/provider/modes/portal/context";

export function PortalCalendar() {
  const { config, data } = usePortal();
  const [leaveDate, setLeaveDate] = useState("");

  return (
    <div className="mode-page">
      <header className="mode-page-header">
        <div>
          <h1 className="mode-page-title">{config.calendarTitle}</h1>
          <p className="mode-page-sub">{data.calendarRows.length} slots & bookings this week</p>
        </div>
      </header>

      <ul className="mode-timeline mode-timeline--calendar">
        {data.calendarRows.map((row) => (
          <li key={row.id} className="mode-timeline-item">
            <span className={`mode-timeline-dot mode-timeline-dot--${(row.badge ?? "default").toLowerCase().replace(/\s+/g, "-")}`} />
            <div className="mode-timeline-card">
              <div className="mode-list-row">
                <div>
                  <strong>{row.title}</strong>
                  <p className="mode-muted">{row.subtitle}</p>
                  {row.meta && <p className="mode-timeline-meta">{row.meta}</p>}
                </div>
                {row.badge && <span className="mode-badge">{row.badge}</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="mode-panel mode-panel--soft">
        <div className="mode-panel-head">
          <div>
            <p className="mode-panel-eyebrow">Time off</p>
            <h3>Leave management</h3>
          </div>
          <FlaticonIcon name="calendar" size={20} color="var(--portal-primary)" />
        </div>
        <div className="mode-inline">
          <input type="date" className="form-input" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} />
          <button type="button" className="mode-btn mode-btn-accept">
            Request leave
          </button>
        </div>
      </section>
    </div>
  );
}
