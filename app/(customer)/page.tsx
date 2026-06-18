import { SearchBar, CategoryGrid, PopularServices } from "@/components/customer/home/HomeSections";
import { MOCK_CATEGORIES, getPopularServices } from "@/lib/catalog/mock";

export default function CustomerHomePage() {
  const popular = getPopularServices();
  const topCategories = MOCK_CATEGORIES.flatMap((c) =>
    c.children ? [c, ...c.children] : [c]
  );

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">What do you need today?</h1>
        <p className="mt-1 text-slate-500">Search, browse categories, or pick a popular service.</p>
        <div className="mt-4">
          <SearchBar />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Categories</h2>
        <CategoryGrid categories={topCategories.map((c) => ({ slug: c.slug, name: c.name, icon: c.icon }))} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Popular services</h2>
        <PopularServices services={popular} />
      </section>
    </div>
  );
}
