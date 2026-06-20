import Link from "next/link";
import { TRENDING_SEARCHES } from "@/lib/catalog/display-catalog";

export function TrendingSearches() {
  return (
    <section className="home-section home-trending">
      <h2 className="home-section-title">Trending now</h2>
      <div className="home-chip-row">
        {TRENDING_SEARCHES.map((item) => (
          <Link key={item.label} href={item.href} className="home-chip">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
