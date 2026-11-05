import { Download, Plus } from "lucide-react";
import { InventoryTable } from "@/features/inventory/components/inventory-table";
import { PageHeader } from "@/components/dashboard/page-parts";

export const metadata = { title: "Inventory" };

export default function InventoryPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Stock control"
        title="Inventory"
        description="Batch-level stock across Ikeja City. Quantities update the moment a prescription is dispensed."
        actions={
          <>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-fog hover:text-bone"
            >
              <Download className="size-3.5" aria-hidden />
              Export CSV
            </button>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[11.5px] font-bold text-ink-950 hover:bg-mint-400"
            >
              <Plus className="size-3.5" aria-hidden />
              Add stock
            </button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active SKUs", value: "1,284", note: "across the catalog" },
          { label: "On shelf", value: "₦12.8m", note: "at cost" },
          { label: "Short-dated", value: "6 batches", note: "within 60 days" },
          { label: "Stock-outs", value: "2", note: "needs ordering" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl px-4 py-3">
            <p className="text-[9.5px] uppercase tracking-[0.1em] text-fog-faint">{stat.label}</p>
            <p className="mt-1.5 text-[18px] font-bold tracking-tight tnum text-bone">{stat.value}</p>
            <p className="mt-0.5 text-[9.5px] text-fog-faint">{stat.note}</p>
          </div>
        ))}
      </div>

      <InventoryTable />

      <p className="px-1 text-[9.5px] text-fog-faint">
        Status is derived from the reorder point and 30-day dispensing velocity, not a
        manually set label. Short-dated means the remaining stock will not clear before
        expiry at the current rate.
      </p>
    </div>
  );
}
