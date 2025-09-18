import { ProductCard } from "@/components/ProductCard";

export const revalidate = 60;

type Product = { id: number; title: string; price: number; image: string; category: string };

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<Product[]>;
}

async function fetchCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories", { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json() as Promise<string[]>;
}

export default async function ProductsPage({ searchParams, params }: { searchParams: Record<string, string | string[] | undefined>; params: { locale: string } }) {
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

  const category = typeof searchParams.category === "string" ? searchParams.category : "";
  const min = parseFloat((searchParams.min as string) || "0");
  const max = parseFloat((searchParams.max as string) || "999999");
  const sort = (searchParams.sort as string) || ""; // "asc" | "desc"

  let filtered = products.filter((p) => (category ? p.category === category : true)).filter((p) => p.price >= min && p.price <= max);
  if (sort === "asc") filtered = filtered.sort((a, b) => a.price - b.price);
  if (sort === "desc") filtered = filtered.sort((a, b) => b.price - a.price);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <form className="mb-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        <select name="category" defaultValue={category} className="border rounded px-2 py-2">
          <option value="">Tüm Kategoriler</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input name="min" type="number" step="0.01" placeholder="Min" defaultValue={isFinite(min) ? String(min) : ""} className="border rounded px-2 py-2" />
        <input name="max" type="number" step="0.01" placeholder="Max" defaultValue={isFinite(max) ? String(max) : ""} className="border rounded px-2 py-2" />
        <select name="sort" defaultValue={sort} className="border rounded px-2 py-2">
          <option value="">Sıralama</option>
          <option value="asc">Fiyat: Artan</option>
          <option value="desc">Fiyat: Azalan</option>
        </select>
        <button className="rounded bg-black text-white px-4 py-2">Uygula</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} image={p.image} href={`/${params.locale}/products/${p.id}`} />
        ))}
      </div>
    </main>
  );
}


