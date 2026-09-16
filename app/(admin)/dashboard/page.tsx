"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import { GuestRSVP } from "@/lib/types";
import RsvpTable from "@/components/admin/RsvpTable";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  Download, 
  RefreshCw 
} from "lucide-react";

export default function AdminDashboardPage() {
  const [guests, setGuests] = useState<GuestRSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "yes" | "no">("all");

  const fetchGuests = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await api.get<GuestRSVP[]>("/rsvp/");
      setGuests(res.data);
    } catch (err) {
      console.error("Failed to load guests", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this response?")) return;
    try {
      await api.delete(`/rsvp/${id}/`);
      setGuests((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      alert("Failed to delete response.");
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const name = guest.fullName || guest.full_name || guest.name || "";
      const matchesSearch = name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || guest.attendance === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [guests, searchQuery, statusFilter]);

  const attendingCount = useMemo(
    () => guests.filter((g) => g.attendance === "yes").length,
    [guests]
  );
  const declinedCount = useMemo(
    () => guests.filter((g) => g.attendance === "no").length,
    [guests]
  );

  const exportToCSV = () => {
    if (guests.length === 0) return;

    const headers = ["ID", "Full Name", "Attendance", "Submitted At"];
    const rows = filteredGuests.map((g) => [
      g.id,
      `"${g.fullName || g.full_name || g.name || ""}"`,
      g.attendance === "yes" ? "Attending" : "Declined",
      g.submittedAt || g.submitted_at || g.created_at || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `rsvp_guests_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight font-serif">
            RSVP Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Monitor attendance responses and manage guest details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchGuests(true)}
            disabled={refreshing || loading}
            className="p-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl transition flex items-center gap-2 text-xs font-semibold shadow-sm disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            disabled={guests.length === 0}
            className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-black text-white rounded-xl transition flex items-center gap-2 text-xs font-semibold shadow-sm disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Total Responses
            </p>
            <p className="text-3xl font-bold text-stone-900 mt-1">
              {loading ? "-" : guests.length}
            </p>
          </div>
          <div className="p-3 bg-stone-100 rounded-xl text-stone-700">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
              Joyfully Attending
            </p>
            <p className="text-3xl font-bold text-emerald-700 mt-1">
              {loading ? "-" : attendingCount}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <UserCheck size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-rose-600 uppercase tracking-wider">
              Regretfully Declined
            </p>
            <p className="text-3xl font-bold text-rose-700 mt-1">
              {loading ? "-" : declinedCount}
            </p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <UserX size={22} />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search guest name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "yes" | "no")}
            className="w-full sm:w-auto px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="all">All Statuses</option>
            <option value="yes">Attending Only</option>
            <option value="no">Declined Only</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw size={24} className="animate-spin text-stone-400 mx-auto" />
            <p className="text-xs text-stone-500 font-medium">
              Loading guest responses...
            </p>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Users size={32} className="text-stone-300 mx-auto" />
            <p className="text-sm font-semibold text-stone-700">No responses found</p>
            <p className="text-xs text-stone-400">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter parameters."
                : "RSVP responses will appear here as guests submit them."}
            </p>
          </div>
        ) : (
          <RsvpTable guests={filteredGuests} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}