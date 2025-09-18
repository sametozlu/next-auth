"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold mb-2">Giriş Yap</h1>
        <p className="text-sm text-gray-600 mb-6">
          Auth0 ile oturum açmak için aşağıdaki butona tıkla.
        </p>
        <button
          className="w-full rounded bg-black py-2.5 text-white hover:bg-gray-800"
          onClick={() => signIn("auth0")}
        >
          Auth0 ile Giriş Yap
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          <Link href="/">Ana sayfa</Link>
        </div>
      </div>
    </div>
  );
}


