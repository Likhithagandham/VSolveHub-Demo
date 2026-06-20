import type { ScaffoldPageData } from "@/lib/provider/modes/scaffold/types";

type Props = {
  modeLabel: string;
  data: ScaffoldPageData;
};

export function ModeScaffoldScreen({ modeLabel, data }: Props) {
  return (
    <div className="partner-stack">
      <div className="partner-mode-intro">
        <strong>{modeLabel}</strong> partner workspace
      </div>

      {data.stats && data.stats.length > 0 && (
        <div className="partner-stat-grid">
          {data.stats.map((stat) => (
            <div key={stat.label} className="partner-stat-card">
              <span className="partner-stat-value">{stat.value}</span>
              <span className="partner-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {data.sections.map((section) => (
        <div key={section.title} className="partner-card">
          <h3 className="partner-section-title">{section.title}</h3>
          {section.description && <p className="partner-muted">{section.description}</p>}
          <ul className="partner-demo-list">
            {section.rows.map((row) => (
              <li key={`${section.title}-${row.title}`} className="partner-demo-row">
                <div className="partner-demo-row-main">
                  <div className="partner-demo-row-top">
                    <span className="partner-demo-row-title">{row.title}</span>
                    {row.badge && <span className="partner-badge">{row.badge}</span>}
                  </div>
                  {row.subtitle && <p className="partner-muted">{row.subtitle}</p>}
                  {row.meta && <p className="partner-demo-meta">{row.meta}</p>}
                </div>
                {row.amount && <span className="partner-price partner-demo-amount">{row.amount}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
