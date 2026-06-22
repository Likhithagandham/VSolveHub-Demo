"use client";

import { useState } from "react";
import { FlaticonIcon } from "@/components/ui/FlaticonIcon";
import { usePortal } from "@/lib/provider/modes/portal/context";

export function PortalWork() {
  const { config, data, modeType } = usePortal();
  const [items, setItems] = useState(data.workItems);

  const isVendor = modeType === "RENTAL_VENDOR";

  return (
    <div className="mode-page">
      <header className="mode-page-header">
        <div>
          <h1 className="mode-page-title">{config.workTitle}</h1>
          <p className="mode-page-sub">{items.length} items in your workspace</p>
        </div>
      </header>

      {isVendor && (
        <div className="mode-action-row mode-action-row--top">
          <button type="button" className="mode-btn mode-btn-accept mode-btn-glow">
            <FlaticonIcon name="plus" size={14} color="#fff" />
            Add item
          </button>
          <button type="button" className="mode-btn mode-btn-secondary">
            Update stock
          </button>
        </div>
      )}

      <ul className="mode-work-list">
        {items.map((item, i) => (
          <li key={item.id} className="mode-work-card">
            <div className="mode-work-card-top">
              <span className={`mode-work-thumb mode-work-thumb--${i % 4}`}>
                <FlaticonIcon
                  name={isVendor ? "box-alt" : modeType === "PROPERTY_HOST" ? "building" : "briefcase"}
                  size={20}
                  color="var(--portal-primary)"
                />
              </span>
              <div className="mode-work-card-body">
                <div className="mode-list-row">
                  <div>
                    <strong>{item.title}</strong>
                    <p className="mode-muted">{item.subtitle}</p>
                  </div>
                  <div className="mode-work-right">
                    {item.amount && <span className="mode-amount">{item.amount}</span>}
                    {item.badge && <span className="mode-badge">{item.badge}</span>}
                  </div>
                </div>
                {item.qty != null && (
                  <div className="mode-qty-bar">
                    <div className="mode-qty-fill" style={{ width: `${Math.min(100, (item.qty / 200) * 100)}%` }} />
                    <span className="mode-muted">{item.qty} units in stock</span>
                  </div>
                )}
              </div>
            </div>
            {modeType === "PROFESSIONAL" && (
              <div className="mode-action-row">
                <button type="button" className="mode-btn mode-btn-secondary">Attendance</button>
                <button type="button" className="mode-btn mode-btn-accept">Complete shift</button>
                <button type="button" className="mode-btn mode-btn-decline">Leave</button>
              </div>
            )}
            {isVendor && item.status === "maintenance" && (
              <button
                type="button"
                className="mode-btn mode-btn-secondary mode-btn-block"
                onClick={() =>
                  setItems((prev) =>
                    prev.map((i) => (i.id === item.id ? { ...i, status: "available", badge: "Available" } : i))
                  )
                }
              >
                Mark maintenance complete
              </button>
            )}
            {modeType === "PROPERTY_HOST" && (
              <div className="mode-action-row">
                <button type="button" className="mode-btn mode-btn-secondary">Rooms</button>
                <button type="button" className="mode-btn mode-btn-secondary">Beds</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
