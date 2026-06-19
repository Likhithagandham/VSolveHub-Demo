"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BookingFlowHeader } from "./BookingFlowHeader";
import { BookingDetailsStep } from "./steps/BookingDetailsStep";
import { BookingAddressStep } from "./steps/BookingAddressStep";
import { BookingScheduleStep } from "./steps/BookingScheduleStep";
import { BookingVendorStep } from "./steps/BookingVendorStep";
import { BookingSummaryStep } from "./steps/BookingSummaryStep";
import { BookingPaymentStep } from "./steps/BookingPaymentStep";
import { getInstantSlot } from "@/lib/bookings/slots";
import type {
  BookingDraft,
  BookingServiceInfo,
  BookingStep,
  VendorOption,
} from "@/lib/bookings/types";

type Address = {
  id: string;
  label: string;
  fullAddress: string;
  isDefault: boolean;
};

type Props = {
  serviceId: string;
};

const INITIAL_DRAFT = (serviceId: string): BookingDraft => ({
  serviceId,
  issueDescription: "",
  mediaUrls: [],
  addressId: null,
  scheduleType: "instant",
  slot: getInstantSlot(),
  vendorId: null,
  vendorAssignmentMode: "auto",
  paymentMethod: null,
});

export function BookingFlow({ serviceId }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<BookingStep>("details");
  const [service, setService] = useState<BookingServiceInfo | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [draft, setDraft] = useState<BookingDraft>(() => INITIAL_DRAFT(serviceId));
  const [vendorCache, setVendorCache] = useState<VendorOption[]>([]);

  useEffect(() => {
    async function load() {
      const [catalogRes, addrRes] = await Promise.all([
        fetch("/api/catalog"),
        fetch("/api/profile/addresses"),
      ]);

      if (catalogRes.ok) {
        const { services } = await catalogRes.json();
        const found = services.find((s: BookingServiceInfo) => s.id === serviceId);
        setService(found ?? null);
      }

      if (addrRes.ok) {
        const { addresses: list } = await addrRes.json();
        setAddresses(list);
        const defaultAddr = list.find((a: Address) => a.isDefault) ?? list[0];
        if (defaultAddr) {
          setDraft((d) => ({ ...d, addressId: defaultAddr.id }));
        }
      } else {
        router.push(`/booking/otp?redirect=${encodeURIComponent(`/booking?serviceId=${serviceId}`)}`);
      }
    }
    load();
  }, [serviceId, router]);

  const updateDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
  }, []);

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === draft.addressId) ?? null,
    [addresses, draft.addressId]
  );

  const selectedVendor = useMemo(() => {
    return vendorCache.find((v) => v.id === draft.vendorId) ?? null;
  }, [vendorCache, draft.vendorId]);

  useEffect(() => {
    if (!draft.addressId || step !== "vendor") return;
    const params = new URLSearchParams({ serviceId, addressId: draft.addressId });
    fetch(`/api/vendors/nearby?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.nearby) {
          setVendorCache([...data.previous, ...data.nearby]);
        }
      });
  }, [draft.addressId, serviceId, step]);

  function goNext() {
    const index = ["details", "address", "schedule", "vendor", "summary", "payment"].indexOf(step);
    if (index < 5) {
      setStep(["details", "address", "schedule", "vendor", "summary", "payment"][index + 1] as BookingStep);
    }
  }

  if (!service) {
    return <p className="text-muted">Loading service details…</p>;
  }

  const totalPaise = service.pricePaise;

  return (
    <div className="booking-flow">
      <BookingFlowHeader currentStep={step} />

      {step === "details" && (
        <BookingDetailsStep
          service={service}
          issueDescription={draft.issueDescription}
          mediaUrls={draft.mediaUrls}
          onChange={updateDraft}
          onNext={goNext}
        />
      )}

      {step === "address" && (
        <BookingAddressStep
          addresses={addresses}
          selectedAddressId={draft.addressId}
          onSelectAddress={(id) => updateDraft({ addressId: id })}
          onAddressSaved={(address) => setAddresses((prev) => [...prev, address])}
          onNext={goNext}
        />
      )}

      {step === "schedule" && (
        <BookingScheduleStep
          scheduleType={draft.scheduleType}
          slot={draft.slot}
          onChange={updateDraft}
          onNext={goNext}
        />
      )}

      {step === "vendor" && (
        <BookingVendorStep
          serviceId={serviceId}
          addressId={draft.addressId}
          vendorId={draft.vendorId}
          vendorAssignmentMode={draft.vendorAssignmentMode}
          onChange={updateDraft}
          onNext={goNext}
        />
      )}

      {step === "summary" && (
        <BookingSummaryStep
          service={service}
          draft={draft}
          address={selectedAddress}
          vendor={selectedVendor}
          onNext={goNext}
        />
      )}

      {step === "payment" && <BookingPaymentStep draft={draft} totalPaise={totalPaise} />}
    </div>
  );
}
