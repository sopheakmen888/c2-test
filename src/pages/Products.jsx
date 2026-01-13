import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch only 12 products
        const res = await fetch("https://api.escuelajs.co/api/v1/products?limit=12&offset=1");
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-600">Manage your product catalog</p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Add product
        </Link>
      </div>

      {loadingProducts && <p className="text-slate-500">Loading products...</p>}
      {productsError && <p className="text-red-500">{productsError}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
  {!loadingProducts &&
    !productsError &&
    products.map((p) => (
      <Link
        key={p.id}
        to={`/products/${p.id}`}
        className="rounded-xl border bg-white p-4 hover:shadow-sm transition"
      >
        <img
          src={p.images?.[0] ?? "https://placehold.co/600x400"}
          alt={p.title}
          className="h-40 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <div className="font-medium line-clamp-1">{p.title}</div>
            <div className="text-sm text-slate-600 line-clamp-1">
              {p.category?.name}
            </div>
          </div>
          <div className="shrink-0 font-semibold">${p.price}</div>
        </div>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {p.description}
        </p>
      </Link>
    ))}
</div>

    </div>
  );
}
