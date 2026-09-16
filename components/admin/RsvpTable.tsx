"use client";

import { GuestRSVP } from "@/lib/types";

interface RsvpTableProps {
  guests: GuestRSVP[];
  onDelete: (id: number) => void;
}

export default function RsvpTable({ guests, onDelete }: RsvpTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-stone-200">
      <table className="w-full text-left text-sm text-stone-700">
        <thead className="bg-stone-50 border-b border-stone-200 text-xs font-semibold uppercase text-stone-500">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Status</th>
            <th className="p-4">Submitted At</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {guests.map((guest) => (
            <tr key={guest.id} className="hover:bg-stone-50/50">
              <td className="p-4 font-medium text-stone-900">{guest.full_name}</td>
              <td className="p-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    guest.attendance === "yes"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {guest.attendance === "yes" ? "Attending" : "Declined"}
                </span>
              </td>
              <td className="p-4 text-xs text-stone-500">
                {new Date(guest.created_at).toLocaleString()}
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={() => onDelete(guest.id)}
                  className="text-rose-600 hover:text-rose-800 text-xs font-medium"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}