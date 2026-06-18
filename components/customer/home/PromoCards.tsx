import Link from "next/link";
import { PROMO_CARDS } from "@/lib/catalog/display-catalog";
import { ServiceIcon } from "@/components/ui/ServiceIcons";

export function PromoCards() {
  return (
    <section className="promo-scroll">
      {PROMO_CARDS.map((card) => (
        <Link
          key={card.id}
          href={card.href}
          className="promo-card"
          style={{ background: card.bg }}
        >
          <div className="promo-card-content">
            <h3>{card.title}</h3>
            <span className="promo-cta" style={{ background: card.btnColor }}>
              {card.cta}
            </span>
          </div>
          <span className="promo-icon-wrap">
            <ServiceIcon name={card.icon} size={48} color={card.btnColor} />
          </span>
        </Link>
      ))}
    </section>
  );
}
