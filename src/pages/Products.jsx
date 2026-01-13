import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 12;

  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    const offset = (currentPage - 1) * productsPerPage;
    fetch(`https://api.escuelajs.co/api/v1/products?limit=${productsPerPage}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [currentPage]);

  const items = products;

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-slate-600">Loading products...</div>
          </div>
        ) : items.length > 0 ? (
          items.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="md:flex md:flex-col rounded-xl border bg-white p-4 hover:shadow-sm transition"
            >
              <div className="flex gap-3 md:flex-col">
                <img
                  src={p.images?.[0] ?? "https://placehold.co/600x400"}
                  alt={p.title}
                  className="h-40 w-40 shrink-0 rounded-lg object-cover md:h-40 md:w-full"
                  loading="lazy"
                />
                <div className="mt-3 md:mt-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-medium line-clamp-1">{p.title}</div>
                    <div className="shrink-0 font-semibold">${p.price}</div>
                  </div>
                  <div className="mt-1 text-sm text-slate-600 line-clamp-1">
                    {p.category?.name}
                  </div>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-slate-600">No products found</div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border bg-white text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-3 py-1 text-sm text-slate-600">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={items.length < productsPerPage}
          className="px-3 py-1 rounded-lg border bg-white text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
