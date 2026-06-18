"use client";

import { DispatchForm } from "./flows/DispatchForm";
import { CrewForm } from "./flows/CrewForm";
import { StaffingForm } from "./flows/StaffingForm";
import { RentalForm } from "./flows/RentalForm";
import { PropertyForm } from "./flows/PropertyForm";
import { QuoteForm } from "./flows/QuoteForm";
import { resolveArchetype } from "@/lib/booking/resolve";

type Service = {
  id: string;
  name: string;
  pricePaise: number;
  archetype?: string;
};

export function BookingRouter({ service }: { service: Service }) {
  const archetype = resolveArchetype(service);

  switch (archetype) {
    case "A":
      return <DispatchForm service={service} />;
    case "B":
      return <CrewForm service={service} />;
    case "C":
      return <StaffingForm service={service} />;
    case "D":
      return <RentalForm service={service} />;
    case "E":
      return <PropertyForm service={service} />;
    case "F":
      return <QuoteForm service={service} />;
    default:
      return <DispatchForm service={service} />;
  }
}
