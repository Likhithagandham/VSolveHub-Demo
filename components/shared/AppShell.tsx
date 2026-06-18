"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

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
        <button type="button" className="icon-btn" aria-label="Menu">
          <MenuIcon />
        </button>

        <Link href="/" className="brand-logo">
          <span className="brand-v">V</span>
          <span className="brand-text">
            <span className="brand-name">SOLVE HUB</span>
            <span className="brand-tagline">ONE APP, ALL SOLUTIONS</span>
          </span>
        </Link>

        <div className="header-actions">
          <button type="button" className="icon-btn notif-btn" aria-label="Notifications">
            <BellIcon />
            <span className="notif-dot" />
          </button>
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

      <form className="header-search" onSubmit={handleSearch}>
        <div className="header-search-input">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search for services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for services"
          />
        </div>
        <button type="submit" className="header-search-btn">
          Search
        </button>
      </form>
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isBookings = pathname.startsWith("/profile/bookings") || pathname.startsWith("/booking/track");
  const isProfile = pathname.startsWith("/profile");

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
      <Link href="/profile" className="bottom-nav-item">
        <MessagesIcon />
        <span>Messages</span>
      </Link>
      <Link href="/profile" className={`bottom-nav-item ${isProfile && !isBookings ? "active" : ""}`}>
        <ProfileIcon active={isProfile && !isBookings} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 7v10a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BookingsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill={active ? "currentColor" : "none"} />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill={active ? "currentColor" : "none"} />
      <circle cx="12" cy="7" r="4" fill={active ? "currentColor" : "none"} />
    </svg>
  );
}
