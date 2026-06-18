export default function GalleryPage() {
  const items = ["Home cleaning", "AC repair", "Wedding photography", "PG rooms"];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Gallery</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="card flex aspect-square items-center justify-center bg-slate-50 text-sm text-slate-500">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
