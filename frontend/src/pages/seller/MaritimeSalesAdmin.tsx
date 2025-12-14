import React, { useMemo, useState } from "react";

/* ===================== TYPES ===================== */

type Currency = "NGN" | "USD";
type SaleStatus = "paid" | "pending" | "failed";

interface SaleOrder {
  id: string;
  customer: string;
  service: string;
  route: string;
  amount: number;
  currency: Currency;
  status: SaleStatus;
  date: string;
  agent: string;
}

interface NewSaleForm {
  customer: string;
  service: string;
  route: string;
  amount: string;
  currency: Currency;
  status: SaleStatus;
  agent: string;
  date: string;
}

interface KpiCardProps {
  title: string;
  value: number;
  note?: string;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

/* ===================== COMPONENT ===================== */

const MaritimeSalesAdmin: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [status, setStatus] = useState<SaleStatus | "all">("all");
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const [orders, setOrders] = useState<SaleOrder[]>([
    {
      id: "MS-10021",
      customer: "Atlantic Traders Ltd",
      service: "Port Clearance",
      route: "Lagos → Apapa",
      amount: 450000,
      currency: "NGN",
      status: "paid",
      date: "2025-12-10",
      agent: "Ekene",
    },
    {
      id: "MS-10022",
      customer: "BlueWave Shipping",
      service: "Vessel Tracking",
      route: "Bonny → Lagos",
      amount: 1200,
      currency: "USD",
      status: "pending",
      date: "2025-12-11",
      agent: "Ada",
    },
  ]);

  const [newSale, setNewSale] = useState<NewSaleForm>({
    customer: "",
    service: "Port Clearance",
    route: "",
    amount: "",
    currency: "NGN",
    status: "pending",
    agent: "",
    date: new Date().toISOString().slice(0, 10),
  });

  /* ===================== DERIVED ===================== */

  const filteredOrders = useMemo(() => {
    const q = query.toLowerCase();
    return orders
      .filter((o) => (status === "all" ? true : o.status === status))
      .filter((o) =>
        `${o.id} ${o.customer} ${o.service} ${o.route} ${o.agent}`
          .toLowerCase()
          .includes(q)
      );
  }, [orders, query, status]);

  const kpis = useMemo(() => {
    const paid = orders.filter((o) => o.status === "paid");
    const pending = orders.filter((o) => o.status === "pending");
    const failed = orders.filter((o) => o.status === "failed");

    const sum = (list: SaleOrder[], currency: Currency) =>
      list
        .filter((o) => o.currency === currency)
        .reduce((acc, o) => acc + o.amount, 0);

    return {
      total: orders.length,
      paid: paid.length,
      pending: pending.length,
      failed: failed.length,
      paidNGN: sum(paid, "NGN"),
      paidUSD: sum(paid, "USD"),
    };
  }, [orders]);

  /* ===================== HELPERS ===================== */

  const formatMoney = (amount: number, currency: Currency): string =>
    currency === "NGN"
      ? `₦${amount.toLocaleString()}`
      : `$${amount.toLocaleString()}`;

  const badgeClass = (s: SaleStatus): string => {
    if (s === "paid") return "bg-emerald-50 text-emerald-700";
    if (s === "pending") return "bg-amber-50 text-amber-700";
    return "bg-rose-50 text-rose-700";
  };

  /* ===================== ACTIONS ===================== */

  const addSale = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(newSale.amount);

    if (!newSale.customer || !newSale.route || amount <= 0) return;

    const next: SaleOrder = {
      id: `MS-${10000 + orders.length + 1}`,
      customer: newSale.customer,
      service: newSale.service,
      route: newSale.route,
      amount,
      currency: newSale.currency,
      status: newSale.status,
      date: newSale.date,
      agent: newSale.agent || "Unassigned",
    };

    setOrders((prev) => [next, ...prev]);
    setIsAddOpen(false);
  };

  const updateStatus = (id: string, next: SaleStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: next } : o))
    );
  };

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-xl font-semibold text-slate-900">
         Sales 
      </h1>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard title="Total Orders" value={kpis.total} />
        <KpiCard
          title="Paid"
          value={kpis.paid}
          note={`₦${kpis.paidNGN.toLocaleString()} • $${kpis.paidUSD.toLocaleString()}`}
        />
        <KpiCard title="Pending" value={kpis.pending} />
        <KpiCard title="Failed" value={kpis.failed} />
      </div>

      <div className="mt-6 flex gap-3">
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Search sales..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded-lg border px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value as SaleStatus | "all")}
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
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3">
                  {formatMoney(o.amount, o.currency)}
                </td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${badgeClass(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => updateStatus(o.id, "paid")}
                    className="text-xs text-emerald-700"
                  >
                    Mark Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 p-6">
          <form
            onSubmit={addSale}
            className="mx-auto max-w-lg rounded-xl bg-white p-4"
          >
            <h2 className="mb-4 font-semibold">Add Sale</h2>

            <Field label="Customer">
              <input
                className="w-full rounded border px-3 py-2 text-sm"
                onChange={(e) =>
                  setNewSale({ ...newSale, customer: e.target.value })
                }
              />
            </Field>

            <Field label="Amount">
              <input
                className="w-full rounded border px-3 py-2 text-sm"
                onChange={(e) =>
                  setNewSale({ ...newSale, amount: e.target.value })
                }
              />
            </Field>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="rounded border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
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

const Field: React.FC<FieldProps> = ({ label, children }) => (
  <label className="block space-y-1">
    <span className="text-xs font-medium text-slate-600">{label}</span>
    {children}
  </label>
);

export default MaritimeSalesAdmin;
