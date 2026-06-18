import { EnquiryFormBase } from "./EnquiryFormBase";

export function PropertyForm({ service }: { service: { id: string; name: string } }) {
  return (
    <EnquiryFormBase
      service={service}
      archetype="E"
      title={`Property — ${service.name}`}
      fields={[
        { name: "sharing", label: "Sharing preference" },
        { name: "moveIn", label: "Move-in date", type: "date" },
        { name: "viewing", label: "Preferred viewing slot" },
      ]}
    />
  );
}
