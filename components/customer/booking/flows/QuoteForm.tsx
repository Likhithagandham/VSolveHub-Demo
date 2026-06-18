import { EnquiryFormBase } from "./EnquiryFormBase";

export function QuoteForm({ service }: { service: { id: string; name: string } }) {
  return (
    <EnquiryFormBase
      service={service}
      archetype="F"
      title={`Get a quote — ${service.name}`}
      fields={[
        { name: "date", label: "Event date", type: "date" },
        { name: "venue", label: "Venue / location" },
        { name: "guestCount", label: "Guest count", type: "number" },
        { name: "requirements", label: "Requirements", type: "textarea" },
      ]}
    />
  );
}
