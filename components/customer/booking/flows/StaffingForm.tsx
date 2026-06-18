import { EnquiryFormBase } from "./EnquiryFormBase";

export function StaffingForm({ service }: { service: { id: string; name: string } }) {
  return (
    <EnquiryFormBase
      service={service}
      archetype="C"
      title={`Staffing — ${service.name}`}
      fields={[
        { name: "role", label: "Role needed" },
        { name: "schedule", label: "Schedule" },
        { name: "pay", label: "Budget (₹)" },
        { name: "notes", label: "Additional notes", type: "textarea" },
      ]}
    />
  );
}
