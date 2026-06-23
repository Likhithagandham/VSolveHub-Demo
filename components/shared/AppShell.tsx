"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import {
  BellIcon,
  WalletIcon,
  PinIcon,
  ChevronDownIcon,
  HeaderSearchIcon,
  HomeIcon,
  BookingsIcon,
  PlusIcon,
  MessagesIcon,
  ProfileIcon,
} from "@/components/ui/AppIcons";
import { CustomerNotificationBell } from "@/components/notifications/CustomerNotificationBell";

export function AppHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/services?q=${encodeURIComponent(q)}` : "/services");
  }

  return (
    <header className="app-header">
      <div className="app-header-top">
        <Link href="/" className="brand-logo">
          <span className="brand-v">V</span>
          <span className="brand-text">
            <span className="brand-name">SOLVE HUB</span>
            <span className="brand-tagline">ONE APP, ALL SOLUTIONS</span>
          </span>
        </Link>

        <div className="header-actions">
          <CustomerNotificationBell />
          <div className="wallet-pill">
            <WalletIcon />
            <span>₹1,250</span>
          </div>
        </div>
      </div>

      <button type="button" className="location-bar">
        <PinIcon />
        <span>Hyderabad, Telangana</span>
        <ChevronDownIcon />
      </button>

      <form className="m3-search-bar" onSubmit={handleSearch}>
        <span className="m3-search-bar__leading" aria-hidden>
          <HeaderSearchIcon />
        </span>
        <input
          type="search"
          className="m3-search-bar__input"
          placeholder="Search services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for services"
        />
        <button type="submit" className="m3-search-bar__submit" aria-label="Search">
          <HeaderSearchIcon />
        </button>
      </form>
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isNotifications = pathname === "/notifications";
  const isBookings =
    pathname.startsWith("/profile/bookings") ||
    pathname.startsWith("/booking/track") ||
    pathname.startsWith("/vehicle/track") ||
    pathname.startsWith("/accommodation/track");
  const isMessages = pathname.startsWith("/profile/messages");
  const isProfile =
    pathname.startsWith("/profile") && !isBookings && !isMessages && !isNotifications;

  return (
    <nav className="bottom-nav">
      <Link href="/" className={`bottom-nav-item ${isHome ? "active" : ""}`}>
        <HomeIcon active={isHome} />
        <span>Home</span>
      </Link>
      <Link href="/profile/bookings" className={`bottom-nav-item ${isBookings ? "active" : ""}`}>
        <BookingsIcon active={isBookings} />
        <span>My Bookings</span>
      </Link>
      <Link href="/services" className="bottom-nav-fab" aria-label="Book a service">
        <PlusIcon />
      </Link>
      <Link href="/profile/messages" className={`bottom-nav-item ${isMessages ? "active" : ""}`}>
        <MessagesIcon active={isMessages} />
        <span>Messages</span>
      </Link>
      <Link href="/profile" className={`bottom-nav-item ${isProfile ? "active" : ""}`}>
        <ProfileIcon active={isProfile} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
