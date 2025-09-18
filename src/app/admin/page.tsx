import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = (await auth()) as Session & { user?: Session["user"] & { roles?: string[] } } | null;
  const roles: string[] = session?.user?.roles ?? [];
  if (!roles.includes("admin")) {
    redirect("/403");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-gray-600 mt-2">Sadece admin rolü olan kullanıcılar erişebilir.</p>
    </main>
  );
}


