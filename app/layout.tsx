import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppFab } from "@/components/shared/WhatsAppFab";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VSolveHub — Services made simple",
  description: "Book home services, events, rentals, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
