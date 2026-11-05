import { ArrowUpRight, Mail, Plus, Truck } from "lucide-react";
import { DataTable, PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import { suppliers } from "@/lib/data";
import { cn, naira, shortDate } from "@/lib/utils";

export const metadata = { title: "Suppliers" };

const PURCHASE_ORDERS = [
  { id: "PO-1084", supplier: "Emzor Distribution", items: 4, value: 684000, status: "Delivered", placed: "2026-10-28" },
  { id: "PO-1083", supplier: "GSK Nigeria", items: 2, value: 312000, status: "In transit", placed: "2026-10-30" },
  { id: "PO-1082", supplier: "Novartis Direct", items: 3, value: 940000, status: "Awaiting approval", placed: "2026-11-02" },
  { id: "PO-1081", supplier: "Fidson Healthcare", items: 5, value: 228000, status: "Delivered", placed: "2026-10-21" },
  { id: "PO-1080", supplier: "Roche Nigeria", items: 1, value: 128000, status: "Cancelled", placed: "2026-10-18" },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Procurement"
        title="Suppliers"
        description="Lead times, reliability scores and outstanding balances. Purchase orders and delivery records stay attached to the batch that arrived."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[11.5px] font-bold text-ink-950 hover:bg-mint-400"
          >
            <Plus className="size-3.5" aria-hidden />
            Add supplier
          </button>
        }
      />

      <div className="grid gap-3 lg:grid-cols-3">
        {suppliers.slice(0, 3).map((supplier) => (
          <div key={supplier.id} className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-semibold text-bone">{supplier.name}</p>
                <p className="mt-0.5 text-[9.5px] text-fog-faint">
                  {supplier.leadTime}-day lead time
                </p>
              </div>
              <span className="flex size-7 items-center justify-center rounded-lg border border-mint-500/20 bg-mint-500/10 text-mint-300">
                <Truck className="size-3.5" aria-hidden />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Meter value={supplier.reliability} tone={supplier.reliability >= 92 ? "mint" : "amber"} />
              <span className="text-[10px] tnum text-bone">{supplier.reliability}%</span>
            </div>
            <p className="mt-1 text-[9px] text-fog-faint">on-time delivery, last 90 days</p>
            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
              <span className="text-[9.5px] text-fog-dim">Outstanding</span>
              <span className="text-[10.5px] font-semibold tnum text-bone">
                {supplier.outstanding ? naira(supplier.outstanding) : "Settled"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Panel title="Supplier directory" subtitle="5 active suppliers · 48 catalog manufacturers">
        <DataTable
          columns={[
            { label: "Supplier" },
            { label: "Categories" },
            { label: "Lead time" },
            { label: "Reliability" },
            { label: "Outstanding", className: "text-right" },
            { label: "Last order", className: "text-right" },
          ]}
        >
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="hover:bg-white/[0.02]">
              <td className="px-4 py-3">
                <p className="text-[11.5px] font-semibold text-bone">{supplier.name}</p>
                <p className="flex items-center gap-1 text-[9.5px] text-fog-faint">
                  <Mail className="size-2.5" aria-hidden />
                  {supplier.contact}
                </p>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {supplier.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[8.5px] text-fog-dim"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-[10.5px] tnum text-fog">{supplier.leadTime} days</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "text-[10.5px] tnum",
                    supplier.reliability >= 92 ? "text-mint-300" : "text-amber-soft",
                  )}
                >
                  {supplier.reliability}%
                </span>
              </td>
              <td className="px-4 py-3 text-right text-[10.5px] tnum text-bone">
                {supplier.outstanding ? naira(supplier.outstanding) : "—"}
              </td>
              <td className="px-4 py-3 text-right text-[10px] tnum text-fog-dim">
                {shortDate(supplier.lastOrder)}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>

      <Panel
        title="Purchase orders"
        subtitle="Recent activity"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-mint-300 hover:text-mint-200"
          >
            View all
            <ArrowUpRight className="size-3" aria-hidden />
          </button>
        }
      >
        <DataTable
          columns={[
            { label: "Order" },
            { label: "Supplier" },
            { label: "Items", className: "text-right" },
            { label: "Value", className: "text-right" },
            { label: "Status", className: "text-right" },
            { label: "Placed", className: "text-right" },
          ]}
        >
          {PURCHASE_ORDERS.map((order) => (
            <tr key={order.id} className="hover:bg-white/[0.02]">
              <td className="px-4 py-2.5 font-mono text-[10px] text-bone">{order.id}</td>
              <td className="px-4 py-2.5 text-[10.5px] text-fog">{order.supplier}</td>
              <td className="px-4 py-2.5 text-right text-[10.5px] tnum text-fog">{order.items}</td>
              <td className="px-4 py-2.5 text-right text-[10.5px] tnum text-bone">{naira(order.value)}</td>
              <td className="px-4 py-2.5 text-right">
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[8.5px] font-bold",
                    order.status === "Delivered"
                      ? "bg-mint-500/10 text-mint-300"
                      : order.status === "In transit"
                        ? "bg-blue-400/10 text-blue-300"
                        : order.status === "Cancelled"
                          ? "bg-rose/10 text-rose-soft"
                          : "bg-amber/10 text-amber-soft",
                  )}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog-faint">
                {shortDate(order.placed)}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
