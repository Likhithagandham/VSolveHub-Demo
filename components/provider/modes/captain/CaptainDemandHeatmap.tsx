"use client";

import type { CaptainDashboardState } from "./dashboard-utils";

type Props = {
  heatmap: CaptainDashboardState["demandHeatmap"];
};

export function CaptainDemandHeatmap({ heatmap }: Props) {
  return (
    <div className="captain-heatmap">
      <div className="captain-heatmap-grid" role="img" aria-label={`Demand heatmap near ${heatmap.centerZone}`}>
        {heatmap.cells.map((cell) => (
          <span
            key={`${cell.row}-${cell.col}`}
            className="captain-heatmap-cell"
            style={{ opacity: 0.25 + cell.intensity * 0.75 }}
          />
        ))}
        <span className="captain-heatmap-you" aria-hidden />
      </div>
      <div className="captain-heatmap-legend">
        <span>Low</span>
        <span className="captain-heatmap-bar" />
        <span>High</span>
      </div>
    </div>
  );
}
