import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories?limit=4");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.slice(0, 4));
      } catch (err) {
        setCategoriesError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products?limit=12&offset=12");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProductsError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Slice products for featured and latest
  const featured = products.slice(0, 4);
  const latest = products.slice(4, 8);

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
            Browse categories, view latest items, and manage products & users in one simple app.
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loadingProducts && <p className="text-slate-500">Loading featured products...</p>}
            {productsError && <p className="text-red-500">{productsError}</p>}

            {!loadingProducts &&
              !productsError &&
              featured.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="flex flex-col overflow-hidden rounded-2xl border bg-white hover:shadow-sm transition"
                >
                  <img
                    src={p.images?.[0] ?? "https://placehold.co/600x400"}
                    alt={p.title}
                    className="w-full aspect-[3/2] object-cover"
                    loading="lazy"
                  />

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.title}</div>
                        <div className="truncate text-xs text-slate-600">{p.category?.name}</div>
                      </div>

                      <div className="shrink-0 font-semibold">${p.price}</div>
                    </div>

                    <p className="line-clamp-2 text-sm text-slate-600">{p.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Categories</h2>

          <div className="space-y-3">
            {loadingCategories && <p className="text-slate-500">Loading categories...</p>}
            {categoriesError && <p className="text-red-500">{categoriesError}</p>}

            {!loadingCategories &&
              !categoriesError &&
              categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/products?category=${c.id}`}
                  className="flex items-center gap-3 rounded-2xl border bg-white p-4 hover:bg-slate-50 transition"
                >
                  <img
                    src={c.image ?? "https://placehold.co/100x100"}
                    alt={c.name}
                    className="h-12 w-12 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-medium">{c.name}</div>
                    <div className="text-xs text-slate-600">Tap to browse</div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Latest Products */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Latest products</h2>
            <Link to="/products" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loadingProducts && <p className="text-slate-500">Loading latest products...</p>}
            {productsError && <p className="text-red-500">{productsError}</p>}

            {!loadingProducts &&
              !productsError &&
              latest.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="flex flex-col overflow-hidden rounded-2xl border bg-white hover:shadow-sm transition"
                >
                  <img
                    src={p.images?.[0] ?? "https://placehold.co/600x400"}
                    alt={p.title}
                    className="w-full aspect-[3/2] object-cover"
                    loading="lazy"
                  />

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.title}</div>
                        <div className="truncate text-xs text-slate-600">{p.category?.name}</div>
                      </div>

                      <div className="shrink-0 font-semibold">${p.price}</div>
                    </div>

                    <p className="line-clamp-2 text-sm text-slate-600">{p.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
