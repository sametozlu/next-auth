import { auth, signOut } from "@/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-600 mt-2">Korumalı alan.</p>
      <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
      <form action={async () => { "use server"; await signOut(); }}>
        <button className="mt-4 rounded bg-black py-2.5 px-4 text-white hover:bg-gray-800">
          Çıkış Yap
        </button>
      </form>
    </main>
  );
}


