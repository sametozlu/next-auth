import type { Metadata } from "next";
import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store";
import Link from "next/link";
import Image from "next/image";

type Product = { id: number; title: string; price: number; image: string; description: string; category: string };

export const revalidate = 60;

async function fetchProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json() as Promise<Product>;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await fetchProduct(params.id);
  return {
    title: p.title,
    description: p.description.slice(0, 150),
    openGraph: { title: p.title, description: p.description.slice(0, 150), images: [p.image] },
  };
}

export default async function ProductDetail({ params }: { params: { id: string; locale: string } }) {
  const p = await fetchProduct(params.id);
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image src={p.image} alt={p.title} width={600} height={600} className="w-full h-96 object-contain border rounded" />
        <div>
          <h1 className="text-2xl font-semibold">{p.title}</h1>
          <div className="mt-2 text-gray-600">{p.category}</div>
          <div className="mt-3 text-xl font-bold">${p.price.toFixed(2)}</div>
          <p className="mt-4 text-gray-700 leading-relaxed">{p.description}</p>
          <AddButton id={p.id} title={p.title} price={p.price} image={p.image} />
        </div>
      </div>
      <div className="mt-6"><Link href={`/${params.locale}/products`} className="underline">← Tüm ürünler</Link></div>
    </main>
  );
}

function AddButton(props: { id: number; title: string; price: number; image: string }) {
  "use client";
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(addToCart(props))} className="mt-6 rounded bg-black text-white px-4 py-2 hover:bg-gray-800">
      Sepete Ekle
    </button>
  );
}


