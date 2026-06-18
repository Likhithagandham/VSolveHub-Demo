import Link from "next/link";
import { HeroBanner } from "@/components/customer/home/HeroBanner";
import { QuickServices } from "@/components/customer/home/QuickServices";
import { PromoCards } from "@/components/customer/home/PromoCards";
import { WhyChoose } from "@/components/customer/home/WhyChoose";
import { getPopularServices, getServicesByIds } from "@/lib/catalog/queries";
import { getRecentlyViewedIds } from "@/lib/recently-viewed";
import { getServerSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  const [popular, recentIds, session] = await Promise.all([
    getPopularServices(),
    getRecentlyViewedIds(),
    getServerSession(),
  ]);

  const recentlyViewed = await getServicesByIds(recentIds);

  let savedServices: Awaited<ReturnType<typeof getServicesByIds>> = [];
  if (session) {
    const saved = await prisma.savedService.findMany({
      where: { userId: session.id },
      include: { service: { include: { category: true } } },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
    savedServices = saved.map((s) => ({
      id: s.service.id,
      name: s.service.name,
      slug: s.service.slug,
      description: s.service.description,
      price: s.service.price,
      duration: s.service.duration,
      tags: JSON.parse(s.service.tags),
      category: {
        id: s.service.category.id,
        name: s.service.category.name,
        slug: s.service.category.slug,
        icon: s.service.category.icon,
      },
    }));
  }

  return (
    <div className="home-page">
      <HeroBanner />
      <QuickServices />
      <PromoCards />
      <WhyChoose />

      <section className="home-section">
        <div className="section-header-row">
          <h2 className="home-section-title">Popular services</h2>
          <Link href="/services" className="section-link">
            View All →
          </Link>
        </div>
        <div className="popular-scroll">
          {popular.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.category.slug}/${service.slug}`}
              className="popular-mini-card"
            >
              <span style={{ fontSize: "1.5rem" }}>{service.category.icon}</span>
              <h3>{service.name}</h3>
              <p>{formatPrice(service.price)}</p>
            </Link>
          ))}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="home-section">
          <h2 className="home-section-title">Recently viewed</h2>
          <div className="popular-scroll">
            {recentlyViewed.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.category.slug}/${service.slug}`}
                className="popular-mini-card"
              >
                <span style={{ fontSize: "1.5rem" }}>{service.category.icon}</span>
                <h3>{service.name}</h3>
                <p>{formatPrice(service.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {savedServices.length > 0 && (
        <section className="home-section">
          <h2 className="home-section-title">Saved services</h2>
          <div className="popular-scroll">
            {savedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.category.slug}/${service.slug}`}
                className="popular-mini-card"
              >
                <span style={{ fontSize: "1.5rem" }}>{service.category.icon}</span>
                <h3>{service.name}</h3>
                <p>{formatPrice(service.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
