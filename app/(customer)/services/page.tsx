import { Suspense } from "react";
import ServicesPageClient from "./ServicesPageClient";

export default function ServicesRoute() {
  return (
    <Suspense fallback={<p className="text-muted page-content">Loading services…</p>}>
      <ServicesPageClient />
    </Suspense>
  );
}
