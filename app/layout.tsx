import type { Metadata } from "next";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import "./globals.css";
import { ShellSwitcher } from "@/components/shared/ShellSwitcher";

export const metadata: Metadata = {
  title: "V Solve Hub — One App, All Solutions",
  description: "Book home services, vehicle repair, events, and more at your doorstep.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <ShellSwitcher>{children}</ShellSwitcher>
      </body>
    </html>
  );
}
