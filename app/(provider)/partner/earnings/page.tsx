import { formatMoney } from "@/lib/format";

export default function PartnerEarningsPage() {
  const earnings = [
    { id: "e1", amount: 249900, source: "Deep cleaning", status: "paid" },
    { id: "e2", amount: 49900, source: "AC repair", status: "pending" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
      <div className="grid gap-3">
        {earnings.map((e) => (
          <div key={e.id} className="card flex justify-between">
            <div>
              <p className="font-medium">{e.source}</p>
              <p className="text-sm text-slate-500">{e.status}</p>
            </div>
            <p className="font-semibold text-brand-600">{formatMoney(e.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
