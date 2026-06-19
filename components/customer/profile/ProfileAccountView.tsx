"use client";

import Link from "next/link";
import {
  BrandIcon,
  CardIcon,
  ClipboardIcon,
  DeviceIcon,
  HeadsetIcon,
  PinIcon,
  PlusCircleIcon,
  ReceiptIcon,
  SettingsIcon,
  StarIcon,
  WalletMenuIcon,
} from "./ProfileIcons";

type QuickAction = { label: string; href: string };
type MenuItem = { label: string; href: string };

type Props = {
  name: string;
  phone: string;
  email: string | null;
  quickActions: QuickAction[];
  menuItems: MenuItem[];
};

const QUICK_ICONS: Record<string, React.ReactNode> = {
  "My bookings": <ClipboardIcon />,
  "Saved services": <DeviceIcon />,
  "Help & support": <HeadsetIcon />,
};

const MENU_ICONS: Record<string, React.ReactNode> = {
  "My Plans": <ReceiptIcon />,
  Wallet: <WalletMenuIcon />,
  "Plus membership": <PlusCircleIcon />,
  "My rating": <StarIcon />,
  "Manage addresses": <PinIcon />,
  "Manage payment methods": <CardIcon />,
  Settings: <SettingsIcon />,
  "About V Solve Hub": <BrandIcon />,
};

export function ProfileAccountView({ name, phone, email, quickActions, menuItems }: Props) {
  return (
    <div className="profile-account">
      <header className="profile-account-header">
        <div>
          <h1 className="profile-account-name">{name}</h1>
          <p className="profile-account-meta">{phone}</p>
          <p className="profile-account-meta">{email ?? "Add your email"}</p>
        </div>
        <button type="button" className="profile-edit-btn" aria-label="Edit profile">
          <EditIcon />
        </button>
      </header>

      <div className="profile-quick-actions">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href} className="profile-quick-card">
            <span className="profile-quick-icon">{QUICK_ICONS[action.label]}</span>
            <span>{action.label}</span>
          </Link>
        ))}
      </div>

      <nav className="profile-menu">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className="profile-menu-item">
            <span className="profile-menu-icon">{MENU_ICONS[item.label]}</span>
            <span className="profile-menu-label">{item.label}</span>
            <ChevronIcon />
          </Link>
        ))}
      </nav>

      <div className="profile-refer-card">
        <div className="profile-refer-text">
          <h2>Refer &amp; earn ₹100</h2>
          <p>Get ₹100 when your friend completes their first booking</p>
          <button type="button" className="profile-refer-btn" onClick={() => alert("Referral link coming soon!")}>
            Refer now
          </button>
        </div>
        <span className="profile-refer-gift" aria-hidden>
          🎁
        </span>
      </div>

      <LogoutButton />

      <p className="profile-version">Version 1.0.0</p>
    </div>
  );
}

export function LogoutButton() {
  async function logout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    window.location.href = "/";
  }

  return (
    <button type="button" className="profile-logout-btn" onClick={logout}>
      Logout
    </button>
  );
}

function EditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
