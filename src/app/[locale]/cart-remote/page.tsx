"use client";
import dynamic from "next/dynamic";

// Remote component loaded via Module Federation
const CartWidget = dynamic(() => (window as any).cart?.get("./CartWidget").then((factory: any) => factory()), {
  ssr: false,
  loading: () => <div>Loading cart…</div>,
}) as any;

export default function CartRemotePage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Cart (Module Federation)</h1>
      <CartWidget />
    </main>
  );
}


