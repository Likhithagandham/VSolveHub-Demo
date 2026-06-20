import { PartnerShell } from "@/components/provider/PartnerShell";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <PartnerShell>{children}</PartnerShell>;
}
