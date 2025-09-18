"use client";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { useEffect } from "react";
import { useStore } from "react-redux";
import type { AppStore } from "@/store";
import { serializeCart } from "@/store/cartSlice";

const store = makeStore();

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistCart />
			{children}
		</Provider>
	);
}

function PersistCart() {
	const s = useStore() as AppStore;
	useEffect(() => {
		const unsubscribe = s.subscribe(() => {
			const state = s.getState();
			try {
				localStorage.setItem("cart:v1", serializeCart(state.cart.items));
			} catch {}
		});
		return unsubscribe;
	}, [s]);
	return null;
}
