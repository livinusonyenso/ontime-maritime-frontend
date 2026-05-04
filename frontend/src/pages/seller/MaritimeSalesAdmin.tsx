import React, { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

/* ===================== TYPES ===================== */

type SaleStatus = "paid" | "pending" | "failed";

interface SaleOrder {
  id: string;
  customer: string;
  service: string;
  route: string;
  amount: number;
  currency: string;
  status: SaleStatus;
  date: string;
}

interface KpiCardProps {
  title: string;
  value: number | string;
  note?: string;
}

/* ===================== MAPPER ===================== */

function toSaleOrder(tx: any): SaleOrder {
  const buyer = tx.buyer ?? {};
  const listing = tx.listing ?? {};

  const customerName =
    [buyer.first_name, buyer.last_name].filter(Boolean).join(" ").trim() ||
    buyer.email ||
    tx.buyer_email ||
    "Unknown";

  const origin = listing.origin_port ?? "";
  const destination = listing.destination_port ?? "";
  const route =
    origin && destination ? `${origin} → ${destination}` : origin || destination || "—";

  const payoutStatus: string = tx.payout_status ?? "pending";
  const status: SaleStatus =
    payoutStatus === "completed" ? "paid" : payoutStatus === "failed" ? "failed" : "pending";

  return {
    id: tx.id ?? "",
    customer: customerName,
    service: listing.title ?? listing.marketplace_category ?? "—",
    route,
    amount: Number(tx.amount ?? 0),
    currency: listing.currency ?? "USD",
    status,
    date: tx.created_at ? new Date(tx.created_at).toISOString().slice(0, 10) : "—",
  };
}

/* ===================== COMPONENT ===================== */

const MaritimeSalesAdmin: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<SaleStatus | "all">("all");
  const [orders, setOrders] = useState<SaleOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ===================== FETCH ===================== */

  useEffect(() => {
    api
      .get("/transactions/my-sales?take=200")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setOrders(data.map(toSaleOrder));
      })
      .catch(() => setError("Could not load sales data."))
      .finally(() => setLoading(false));
  }, []);

  /* ===================== DERIVED ===================== */

  const filteredOrders = useMemo(() => {
    const q = query.toLowerCase();
    return orders
      .filter((o) => statusFilter === "all" || o.status === statusFilter)
      .filter((o) =>
        `${o.id} ${o.customer} ${o.service} ${o.route}`
          .toLowerCase()
          .includes(q)
      );
  }, [orders, query, statusFilter]);

  const kpis = useMemo(() => {
    const paid    = orders.filter((o) => o.status === "paid");
    const pending = orders.filter((o) => o.status === "pending");
    const failed  = orders.filter((o) => o.status === "failed");
    const paidRevenue = paid.reduce((sum, o) => sum + o.amount, 0);
    return {
      total: orders.length,
      paid: paid.length,
      pending: pending.length,
      failed: failed.length,
      paidRevenue,
    };
  }, [orders]);

  /* ===================== HELPERS ===================== */

  const formatMoney = (amount: number, currency: string): string => {
    const sym = currency === "NGN" ? "₦" : "$";
    return `${sym}${amount.toLocaleString()}`;
  };

  const badgeClass = (s: SaleStatus): string => {
    if (s === "paid")    return "bg-emerald-50 text-emerald-700";
    if (s === "pending") return "bg-amber-50 text-amber-700";
    return "bg-rose-50 text-rose-700";
  };

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-xl font-semibold text-slate-900">Sales</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard title="Total Orders" value={loading ? "—" : kpis.total} />
        <KpiCard
          title="Paid"
          value={loading ? "—" : kpis.paid}
          note={loading ? undefined : `${formatMoney(kpis.paidRevenue, "USD")} revenue`}
        />
        <KpiCard title="Pending" value={loading ? "—" : kpis.pending} />
        <KpiCard title="Failed"  value={loading ? "—" : kpis.failed} />
      </div>

      <div className="mt-6 flex gap-3">
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Search by order, customer, service, route…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded-lg border px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as SaleStatus | "all")}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Route</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  Loading…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-rose-500">
                  {error}
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  No sales found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.id} className="border-t hover:bg-slate-50">
                  <td className="p-3 font-mono text-xs">{o.id.slice(0, 8).toUpperCase()}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3">{o.service}</td>
                  <td className="p-3 text-slate-500">{o.route}</td>
                  <td className="p-3 text-slate-500">{o.date}</td>
                  <td className="p-3 font-medium">{formatMoney(o.amount, o.currency)}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${badgeClass(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ===================== SMALL COMPONENTS ===================== */

const KpiCard: React.FC<KpiCardProps> = ({ title, value, note }) => (
  <div className="rounded-xl bg-white p-4 shadow">
    <div className="text-sm text-slate-600">{title}</div>
    <div className="text-2xl font-semibold">{value}</div>
    {note && <div className="text-xs text-slate-500">{note}</div>}
  </div>
);

export default MaritimeSalesAdmin;
