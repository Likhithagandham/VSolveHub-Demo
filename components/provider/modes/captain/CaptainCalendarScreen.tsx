"use client";

import { useCallback, useEffect, useState } from "react";

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
  const [leaveDate, setLeaveDate] = useState("");
  const [blockDate, setBlockDate] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/provider/availability");
    if (res.ok) {
      const json = await res.json();
      setRows(json.availability ?? []);
    }
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

  async function addSpecial(action: "add_leave" | "add_block", date: string) {
    if (!date) return;
    await fetch("/api/provider/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, date }),
    });
    await load();
  }

  async function remove(id: string) {
    await fetch("/api/provider/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", id }),
    });
    await load();
  }

  const weekly = rows.filter((r) => r.type === "WEEKLY");
  const leaves = rows.filter((r) => r.type === "LEAVE");
  const blocked = rows.filter((r) => r.type === "BLOCKED");

  return (
    <div className="partner-stack">
      <div className="partner-card">
        <h3 className="partner-section-title">Weekly availability</h3>
        {DAYS.map((label, dayOfWeek) => {
          const row = weekly.find((r) => r.dayOfWeek === dayOfWeek);
          return (
            <div key={label} className="partner-calendar-row">
              <span>{label}</span>
              <input
                type="time"
                defaultValue={row?.startTime ?? "09:00"}
                aria-label={`${label} start`}
                id={`start-${dayOfWeek}`}
              />
              <input
                type="time"
                defaultValue={row?.endTime ?? "18:00"}
                aria-label={`${label} end`}
                id={`end-${dayOfWeek}`}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const start = (document.getElementById(`start-${dayOfWeek}`) as HTMLInputElement).value;
                  const end = (document.getElementById(`end-${dayOfWeek}`) as HTMLInputElement).value;
                  saveWeekly(dayOfWeek, start, end);
                }}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">Leave days</h3>
        <div className="partner-inline-form">
          <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} />
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => addSpecial("add_leave", leaveDate)}>
            Add leave
          </button>
        </div>
        <ul className="partner-list">
          {leaves.map((r) => (
            <li key={r.id}>
              {r.date}{" "}
              <button type="button" className="partner-text-btn" onClick={() => remove(r.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="partner-card">
        <h3 className="partner-section-title">Blocked dates</h3>
        <div className="partner-inline-form">
          <input type="date" value={blockDate} onChange={(e) => setBlockDate(e.target.value)} />
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => addSpecial("add_block", blockDate)}>
            Block date
          </button>
        </div>
        <ul className="partner-list">
          {blocked.map((r) => (
            <li key={r.id}>
              {r.date}{" "}
              <button type="button" className="partner-text-btn" onClick={() => remove(r.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
