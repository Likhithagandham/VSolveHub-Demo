import Link from "next/link";
import { QUICK_SERVICES } from "@/lib/catalog/display-catalog";
import { ServiceIcon } from "@/components/ui/ServiceIcons";

export function QuickServices() {
  return (
    <section className="home-section">
      <div className="section-header-row">
        <h2 className="home-section-title">Quick Services</h2>
        <Link href="/services" className="section-link">
          View All →
        </Link>
      </div>
      <div className="quick-services-grid">
        {QUICK_SERVICES.map((item) => (
          <Link key={item.id} href={item.href} className="quick-service-item">
            <span className="quick-service-icon" style={{ background: item.color }}>
              <ServiceIcon name={item.icon} size={22} color="#ffffff" />
            </span>
            <span className="quick-service-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
