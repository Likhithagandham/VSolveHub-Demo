const faqs = [
  { q: "How do I book a service?", a: "Search for a service, pick a slot, and confirm your booking." },
  { q: "What is the mock OTP?", a: "Use 123456 for development/testing." },
  { q: "How do I become a partner?", a: "Visit /partner/login to register as a provider." },
];

export default function FaqPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">FAQ</h1>
      {faqs.map((f) => (
        <div key={f.q} className="card">
          <h3 className="font-medium text-slate-900">{f.q}</h3>
          <p className="mt-1 text-sm text-slate-600">{f.a}</p>
        </div>
      ))}
    </div>
  );
}
