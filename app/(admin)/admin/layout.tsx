// app/(admin)/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const res = await api.get("/auth/user/");
        if (res.data.is_staff || res.data.is_superuser) {
          setAuthorized(true);
        } else {
          router.push("/unauthorized");
        }
      } catch (err) {
        router.push("/login");
      }
    }
    verifyAdmin();
  }, [router]);

  if (!authorized) return <div className="p-8 text-center">Checking credentials...</div>;

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Console</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block px-3 py-2 rounded hover:bg-slate-800">Overview</a>
          <a href="/admin/users" className="block px-3 py-2 rounded hover:bg-slate-800">Users</a>
          <a href="/admin/settings" className="block px-3 py-2 rounded hover:bg-slate-800">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}