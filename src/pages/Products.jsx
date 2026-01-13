import { Link } from "react-router-dom";
// import products from "../assets/data/products.json";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const items = products;

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=12&offset=1")
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setIsLoading(false);
    })
    .catch(err => {
      console.log("Something went wrong.", err)
      setIsLoading(false);
    })
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="rounded-xl border bg-white p-4 hover:shadow-sm transition flex flex-row gap-3 md:flex-col"
          >
            <img
              src={p.images?.[0] ?? "https://placehold.co/600x400"}
              alt={p.title}
              className="h-40 w-full rounded-lg object-cover"
              loading="lazy"
            />
            <div className="mt-3 flex flex-col items-start justify-between gap-3">
              <div  className="flex items-center justify-between w-full">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
