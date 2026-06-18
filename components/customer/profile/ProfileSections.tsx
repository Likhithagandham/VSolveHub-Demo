export function ProfileSectionPlaceholder({ title }: { title: string }) {
  return (
    <div className="card">
      <h3 className="font-medium text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">Coming soon — connect to API.</p>
    </div>
  );
}
