"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LoadingState } from "@/components/ui/LoadingState";

type AvailabilityRow = {
  id: string;
  type: string;
  dayOfWeek: number | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CaptainCalendarScreen() {
  const [rows, setRows] = useState<AvailabilityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaveDate, setLeaveDate] = useState("");
  const [view, setView] = useState<"week" | "month">("week");

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/availability");
    if (res.ok) {
      const json = await res.json();
      setRows(json.availability ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function saveWeekly(dayOfWeek: number, startTime: string, endTime: string) {
    await fetch("/api/provider/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "upsert_weekly", dayOfWeek, startTime, endTime }),
    });
    await load();
  }

  async function addLeave(date: string) {
    if (!date) return;
    await fetch("/api/provider/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add_leave", date }),
    });
    await load();
  }

  const weekly = rows.filter((r) => r.type === "WEEKLY");
  const leaves = rows.filter((r) => r.type === "LEAVE");
  const summary = useMemo(
    () => ({
      slots: weekly.length,
      leaves: leaves.length,
      hours: weekly.reduce((h, r) => {
        if (!r.startTime || !r.endTime) return h;
        const [sh, sm] = r.startTime.split(":").map(Number);
        const [eh, em] = r.endTime.split(":").map(Number);
        return h + (eh + em / 60) - (sh + sm / 60);
      }, 0),
    }),
    [weekly, leaves]
  );

  if (loading) return <LoadingState label="Loading calendar…" variant="partner" />;

  return (
    <div className="rapido-page">
      <h1 className="rapido-page-title">Availability</h1>

      <div className="rapido-view-toggle">
        <button type="button" className={view === "week" ? "active" : ""} onClick={() => setView("week")}>
          Weekly
        </button>
        <button type="button" className={view === "month" ? "active" : ""} onClick={() => setView("month")}>
          Monthly summary
        </button>
      </div>

      <div className="rapido-cal-summary">
        <div><strong>{summary.slots}</strong><span>Active days</span></div>
        <div><strong>{summary.leaves}</strong><span>Leave days</span></div>
        <div><strong>{Math.round(summary.hours)}h</strong><span>Weekly hours</span></div>
      </div>

      {view === "week" ? (
        <section className="rapido-card">
          <h3>Available slots</h3>
          {DAYS.map((label, dayOfWeek) => {
            const row = weekly.find((r) => r.dayOfWeek === dayOfWeek);
            return (
              <div key={label} className="rapido-cal-row">
                <span>{label}</span>
                <input type="time" defaultValue={row?.startTime ?? "09:00"} id={`s-${dayOfWeek}`} />
                <input type="time" defaultValue={row?.endTime ?? "18:00"} id={`e-${dayOfWeek}`} />
                <button
                  type="button"
                  className="rapido-chip"
                  onClick={() => {
                    const start = (document.getElementById(`s-${dayOfWeek}`) as HTMLInputElement).value;
                    const end = (document.getElementById(`e-${dayOfWeek}`) as HTMLInputElement).value;
                    saveWeekly(dayOfWeek, start, end);
                  }}
                >
                  Save
                </button>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="rapido-card">
          <h3>Monthly overview</h3>
          <p className="rapido-muted">
            {summary.slots} working days configured · {summary.leaves} leave requests this month
          </p>
          <ul className="rapido-leave-list">
            {leaves.map((l) => (
              <li key={l.id}>Leave on {l.date}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="rapido-card">
        <h3>Leave requests</h3>
        <div className="rapido-inline">
          <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} />
          <button type="button" className="rapido-btn rapido-btn-accept" onClick={() => addLeave(leaveDate)}>
            Request leave
          </button>
        </div>
      </section>
    </div>
  );
}
