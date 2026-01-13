import { Link } from "react-router-dom";
import products from "../assets/data/products.json";

export default function Home() {
  const items = products;

  // Featured: first 4 items (simple + predictable for practice)
  const featured = items.slice(0, 3);

  // Categories: unique by category.id
  const categories = Array.from(
    new Map(items.map((p) => [p.category.id, p.category])).values()
  );

  // Latest: sort by creationAt desc, take 4
  const latest = [...items]
    .sort(
      (a, b) =>
        new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="rounded-2xl border bg-white p-5">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            New arrivals
          </div>

          <h1 className="mt-3 text-2xl font-semibold leading-tight">
            Discover products you’ll love
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Browse categories, view latest items, and manage products & users in
            one simple app.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              to="/products"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Explore products
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Featured products</h2>
            <Link to="/products" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="overflow-hidden rounded-2xl border bg-white hover:shadow-sm transition"
              >
                {/* Image */}
                <img
                  src={p.images?.[0] ?? "https://placehold.co/600x400"}
                  alt={p.title}
                  className="h-40 w-full object-cover mx-auto rounded-xl "
                  loading="lazy"
                />

                {/* Content */}
                <div className="p-4 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-medium">{p.title}</h3>
                      <p className="truncate text-xs text-slate-600">
                        {p.category?.name}
                      </p>
                    </div>
                    <span className="shrink-0 font-semibold">${p.price}</span>
                  </div>

                  <p className="line-clamp-2 text-sm text-slate-600">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Categories</h2>

          <div className="grid grid-cols-4 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products"
                className="flex flex-col items-center text-center rounded-2xl border bg-white p-4 hover:bg-slate-50 transition"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-16 w-16 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="mt-2">
                  <div className="truncate font-medium">{c.name}</div>
                  <div className="text-xs text-slate-600">Tap to browse</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Products */}
        <section className="space-y-6 px-4 md:px-8 lg:px-12">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Products</h2>
            <Link to="/products" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>

          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="block rounded-2xl border bg-white hover:shadow-lg transition overflow-hidden"
              >
                <div className="flex flex-row md:flex-col gap-4 p-4">
                  {/* Image */}
                  <img
                    src={p.images?.[0] ?? "https://placehold.co/600x400"}
                    alt={p.title}
                    className="
                  h-24 w-24 rounded-xl object-cover flex-shrink-0
                  md:h-60 md:w-full md:rounded-t-2xl
                "
                    loading="lazy"
                  />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-semibold text-base md:text-lg">
                        {p.title}
                      </h3>
                      <span className="font-semibold">${p.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 truncate mt-1">{p.category?.name}</p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
