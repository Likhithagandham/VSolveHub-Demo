"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ProviderNotificationBell } from "@/components/notifications/ProviderNotificationBell";
import { CaptainTopBar } from "./CaptainTopBar";
import { CaptainSidebar } from "./CaptainSidebar";
import { CaptainBottomNav } from "./CaptainBottomNav";
import { CaptainLiveOfferModal } from "./CaptainLiveOfferModal";
import { useCaptainClock, useCaptainPoll } from "./hooks/useCaptainPoll";
import type { CaptainOffer, CaptainProfile } from "./types";

type Props = {
  children: React.ReactNode;
};

export function CaptainAppChrome({ children }: Props) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<CaptainProfile>({
    name: "Captain",
    phone: "",
    rating: 4.8,
    isOnline: false,
  });
  const [offers, setOffers] = useState<CaptainOffer[]>([]);
  const [busyOffer, setBusyOffer] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const poll = useCallback(async () => {
    const [profileRes, offersRes] = await Promise.all([
      fetch("/api/provider/profile"),
      fetch("/api/provider/offers"),
    ]);
    if (profileRes.ok) {
      const json = await profileRes.json();
      setProfile({
        name: json.profile?.worker?.displayName ?? json.profile?.name ?? "Captain",
        phone: json.profile?.phone ?? "",
        rating: json.stats?.rating ?? 4.8,
        isOnline: json.stats?.isOnline ?? false,
      });
    }
    if (offersRes.ok) {
      const json = await offersRes.json();
      setOffers(json.offers ?? []);
    }
  }, []);

  useCaptainPoll(poll, 3000);
  useCaptainClock(() => setTick((t) => t + 1), profile.isOnline);

  async function respond(assignmentId: string, action: "accept" | "decline") {
    setBusyOffer(assignmentId);
    const res = await fetch("/api/provider/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, action }),
    });
    setBusyOffer(null);
    if (res.ok) {
      const json = await res.json();
      setOffers((prev) => prev.filter((o) => o.id !== assignmentId));
      if (action === "accept" && json.bookingId) {
        router.push(`/partner/work/${json.bookingId}`);
      }
    }
    await poll();
  }

  const liveOffer = profile.isOnline && offers.length > 0 ? offers[0] : null;

  return (
    <div className="rapido-app">
      <CaptainTopBar
        name={profile.name}
        rating={profile.rating}
        onMenu={() => setSidebarOpen(true)}
        notificationBell={<ProviderNotificationBell className="rapido-topbar-bell" />}
      />
      <main className="rapido-main">{children}</main>
      <CaptainBottomNav />
      <CaptainSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {liveOffer && (
        <CaptainLiveOfferModal
          offer={liveOffer}
          busy={busyOffer === liveOffer.id}
          tick={tick}
          onAccept={(id) => respond(id, "accept")}
          onDecline={(id) => respond(id, "decline")}
        />
      )}
    </div>
  );
}
