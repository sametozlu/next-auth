import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const revalidate = 60;

async function fetchProducts() {
	const res = await fetch("https://fakestoreapi.com/products?limit=4", { next: { revalidate: 60 } });
	if (!res.ok) throw new Error("Failed to fetch products");
	return res.json() as Promise<Array<{ id: number; title: string; price: number; image: string }>>;
}

export default async function Home({ params }: { params: { locale: string } }) {
	const t = await getTranslations("home");
	const products = await fetchProducts();
	return (
		<main className="p-6 max-w-7xl mx-auto">
			<h1 className="text-2xl font-semibold mb-4">{t("title")}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				{products.map((p) => (
					<Link key={p.id} href={`/${params.locale}/products/${p.id}`} className="border rounded p-4 hover:shadow">
                <Image src={p.image} alt={p.title} width={400} height={400} className="h-40 w-full object-contain" />
						<div className="mt-2 text-sm line-clamp-2">{p.title}</div>
						<div className="font-medium mt-1">${p.price.toFixed(2)}</div>
					</Link>
				))}
			</div>
		</main>
	);
}
