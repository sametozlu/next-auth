"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type CartItem = { id: number; title: string; price: number; image: string; quantity: number };

export default function CartWidget() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) {
        const items: Record<string, CartItem> = JSON.parse(raw);
        const total = Object.values(items).reduce((s, i) => s + i.quantity, 0);
        setCount(total);
      }
    } catch {}
    const onStorage = () => {
      try {
        const raw = localStorage.getItem("cart:v1");
        if (raw) {
          const items: Record<string, CartItem> = JSON.parse(raw);
          const total = Object.values(items).reduce((s, i) => s + i.quantity, 0);
          setCount(total);
        }
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border bg-white">
      <Image src="/vercel.svg" alt="Cart" width={16} height={16} />
      <span className="text-sm">Cart: {count}</span>
    </div>
  );
}


