import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/catalog/mock";
import { BookingRouter } from "@/components/customer/booking/BookingRouter";
import { formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

type Props = { params: { cat: string; slug: string } };

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.cat, params.slug);
  if (!service) notFound();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <Badge variant="info">Archetype {service.archetype}</Badge>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{service.name}</h1>
        <p className="mt-2 text-slate-600">{service.description}</p>
        <p className="mt-4 text-xl font-semibold text-brand-600">{formatMoney(service.pricePaise)}</p>
      </div>
      <BookingRouter service={service} />
    </div>
  );
}
