// app/(admin)/admin/page.tsx
"use client";

import { useState } from "react";
import RsvpTable from "@/components/admin/RsvpTable";
import { GuestRSVP } from "@/lib/types";

export default function AdminPage() {
  const [guests, setGuests] = useState<GuestRSVP[]>([]);

  const handleDelete = (id: number) => {
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  return (
    <main className="min-h-screen bg-stone-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-serif text-[#4A121A]">RSVP Management</h1>
        <RsvpTable guests={guests} onDelete={handleDelete} />
      </div>
    </main>
  );
}