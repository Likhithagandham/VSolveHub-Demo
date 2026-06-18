import type { Metadata } from "next";
import "./globals.css";
import { AppHeader, BottomNav } from "@/components/shared/AppShell";

export const metadata: Metadata = {
  title: "V Solve Hub — One App, All Solutions",
  description: "Book home services, vehicle repair, events, and more at your doorstep.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-shell">
        <AppHeader />
        <main className="main-content">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
