"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type CartItem = { id: number; title: string; price: number; image: string; quantity: number };

export default function CartMicroFrontend() {
	const [items, setItems] = useState<CartItem[]>([]);
	useEffect(() => {
		try {
			const raw = localStorage.getItem("cart:v1");
			if (raw) setItems(Object.values(JSON.parse(raw)));
		} catch {}
	}, []);
	const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
	return (
		<main className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-semibold mb-4">Cart (Micro‑Frontend)</h1>
			{items.length === 0 ? (
				<div className="text-gray-600">Your cart is empty.</div>
			) : (
				<div className="space-y-4">
					{items.map((i) => (
						<div key={i.id} className="flex items-center gap-4 border rounded p-3">
							<Image src={i.image} alt={i.title} width={64} height={64} className="h-16 w-16 object-contain" />
							<div className="flex-1">
								<div className="font-medium line-clamp-1">{i.title}</div>
								<div className="text-gray-600">${i.price.toFixed(2)} × {i.quantity}</div>
							</div>
						</div>
					))}
					<div className="flex items-center justify-between font-semibold">
						<div>Total</div>
						<div>${total.toFixed(2)}</div>
					</div>
				</div>
			)}
		</main>
	);
}
