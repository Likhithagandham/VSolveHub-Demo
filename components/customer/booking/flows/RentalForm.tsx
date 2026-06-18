import { EnquiryFormBase } from "./EnquiryFormBase";

export function RentalForm({ service }: { service: { id: string; name: string } }) {
  return (
    <EnquiryFormBase
      service={service}
      archetype="D"
      title={`Rental — ${service.name}`}
      fields={[
        { name: "qty", label: "Quantity", type: "number" },
        { name: "dateRange", label: "Date range (e.g. Jan 1 – Jan 5)" },
        { name: "deposit", label: "Deposit willing (₹)" },
      ]}
    />
  );
}
