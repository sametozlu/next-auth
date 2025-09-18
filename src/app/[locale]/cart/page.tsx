"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import Image from "next/image";
import { removeFromCart, setQuantity, clearCart } from "@/store/cartSlice";

export default function CartPage() {
  const items = useAppSelector((s) => Object.values(s.cart.items));
  const dispatch = useAppDispatch();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sepet</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Sepetin boş</div>
      ) : (
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-4 border rounded p-3">
              <Image src={i.image} alt={i.title} width={64} height={64} className="h-16 w-16 object-contain" />
              <div className="flex-1">
                <div className="font-medium line-clamp-1">{i.title}</div>
                <div className="text-gray-600">${i.price.toFixed(2)}</div>
              </div>
              <input
                type="number"
                min={1}
                value={i.quantity}
                onChange={(e) => dispatch(setQuantity({ id: i.id, quantity: Number(e.target.value) }))}
                className="w-20 border rounded px-2 py-1"
              />
              <button className="text-red-600" onClick={() => dispatch(removeFromCart({ id: i.id }))}>Sil</button>
            </div>
          ))}
          <div className="flex items-center justify-between font-semibold">
            <div>Toplam</div>
            <div>${total.toFixed(2)}</div>
          </div>
          <div className="flex gap-3">
            <button className="rounded bg-black text-white px-4 py-2">Ödeme Yap (Mock)</button>
            <button className="rounded border px-4 py-2" onClick={() => dispatch(clearCart())}>Sepeti Temizle</button>
          </div>
        </div>
      )}
    </main>
  );
}


