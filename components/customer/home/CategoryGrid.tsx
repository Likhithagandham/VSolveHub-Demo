import Link from "next/link";

type Category = {
  slug: string;
  name: string;
  icon: string;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid-4">
      {categories.map((cat) => (
        <Link key={cat.slug} href={`/services?category=${cat.slug}`} className="category-tile">
          <span className="category-icon" aria-hidden>
            {cat.icon}
          </span>
          <span className="category-name">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}
