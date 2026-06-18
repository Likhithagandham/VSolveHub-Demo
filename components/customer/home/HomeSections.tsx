"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "@/components/ui/Icons";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/services?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <Input
        type="search"
        placeholder="Search services..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10"
      />
    </form>
  );
}

type Category = { slug: string; name: string; icon?: string };

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/services/${cat.slug}`}
          className="card flex flex-col items-center gap-2 text-center transition hover:border-brand-300 hover:shadow-md"
        >
          <span className="text-2xl">{cat.icon ?? "📋"}</span>
          <span className="text-sm font-medium text-slate-800">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}

type Service = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  pricePaise: number;
  categorySlug: string;
};

import { formatMoney } from "@/lib/format";

export function PopularServices({ services }: { services: Service[] }) {

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((svc) => (
        <Link
          key={svc.id}
          href={`/services/${svc.categorySlug}/${svc.slug}`}
          className="card block transition hover:border-brand-300 hover:shadow-md"
        >
          <h3 className="font-medium text-slate-900">{svc.name}</h3>
          {svc.description && (
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{svc.description}</p>
          )}
          <p className="mt-2 text-sm font-semibold text-brand-600">
            {formatMoney(svc.pricePaise)}
          </p>
        </Link>
      ))}
    </div>
  );
}
