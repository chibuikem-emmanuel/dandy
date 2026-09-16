// app/(admin)/admin/page.tsx

import RsvpTable from "@/components/admin/RsvpTable";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-stone-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-serif text-[#4A121A]">RSVP Management</h1>
        <RsvpTable />
      </div>
    </main>
  );
}