import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export type ConfirmSlipRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

type Props = {
  title: string;
  subtitle: string;
  bookingRef: string;
  status: string;
  statusMessage: string;
  rows: ConfirmSlipRow[];
  totalLabel: string;
  totalValue: string;
  paymentMethod?: string | null;
  paymentStatus?: string | null;
  trackHref: string;
  trackLabel?: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function BookingConfirmSlip({
  title,
  subtitle,
  bookingRef,
  status,
  statusMessage,
  rows,
  totalLabel,
  totalValue,
  paymentMethod,
  paymentStatus,
  trackHref,
  trackLabel = "Track booking",
  secondaryHref,
  secondaryLabel,
}: Props) {
  return (
    <div className="confirm-page">
      <div className="confirm-hero">
        <div className="confirm-success-ring" aria-hidden>
          <span className="confirm-success-check">✓</span>
        </div>
        <h1 className="confirm-hero-title">{title}</h1>
        <p className="confirm-hero-subtitle">{subtitle}</p>
      </div>

      <article className="confirm-slip">
        <div className="confirm-slip-notch confirm-slip-notch-left" aria-hidden />
        <div className="confirm-slip-notch confirm-slip-notch-right" aria-hidden />

        <header className="confirm-slip-header">
          <div className="confirm-slip-brand">
            <span className="confirm-slip-logo">V</span>
            <span>V Solve Hub</span>
          </div>
          <Badge status={status}>{status.replace(/_/g, " ")}</Badge>
        </header>

        <div className="confirm-slip-ref-block">
          <span className="confirm-slip-ref-label">Booking reference</span>
          <span className="confirm-slip-ref">{bookingRef}</span>
        </div>

        <div className="confirm-slip-perforation" aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="confirm-slip-body">
          {rows.map((row) => (
            <div key={row.label} className={`confirm-slip-row ${row.highlight ? "highlight" : ""}`}>
              <span className="confirm-slip-row-label">{row.label}</span>
              <span className="confirm-slip-row-value">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="confirm-slip-total">
          <span>{totalLabel}</span>
          <span className="confirm-slip-total-amount">{totalValue}</span>
        </div>

        {(paymentMethod || paymentStatus) && (
          <div className="confirm-slip-payment">
            <span className="confirm-slip-payment-icon" aria-hidden>
              ◆
            </span>
            <span>
              {paymentMethod?.toUpperCase()}
              {paymentMethod && paymentStatus ? " · " : ""}
              {paymentStatus}
            </span>
          </div>
        )}

        <footer className="confirm-slip-footer">
          <p>{statusMessage}</p>
          <div className="confirm-slip-bars" aria-hidden>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ height: `${12 + (i % 5) * 4}px` }} />
            ))}
          </div>
        </footer>
      </article>

      <div className="confirm-actions">
        <Link href={trackHref} className="btn btn-primary btn-block confirm-btn">
          {trackLabel}
        </Link>
        <Link href={secondaryHref} className="btn btn-secondary btn-block confirm-btn">
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
