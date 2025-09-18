"use client";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";

type Props = { id: number; title: string; price: number; image: string; href: string };

function ProductCardBase({ id, title, price, image, href }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="border rounded p-4 hover:shadow transition">
      <Link href={href} className="block">
        <Image src={image} alt={title} width={400} height={400} sizes="(max-width: 768px) 50vw, 25vw" priority className="h-40 w-full object-contain" />
        <div className="mt-2 text-sm line-clamp-2">{title}</div>
        <div className="font-medium mt-1">${price.toFixed(2)}</div>
      </Link>
      <button
        onClick={() => dispatch(addToCart({ id, title, price, image }))}
        className="mt-3 w-full rounded bg-black text-white py-2 hover:bg-gray-800"
      >
        Sepete Ekle
      </button>
    </div>
  );
}

export const ProductCard = memo(ProductCardBase);


