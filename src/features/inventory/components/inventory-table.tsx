"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { DataTable, EmptyState } from "@/components/dashboard/page-parts";
import { StatusPill } from "@/components/dashboard/kpi";
import { Meter } from "@/components/ui";
import { medicines, type Medicine } from "@/lib/data";
import { stockStatus, weeksOfCover } from "@/lib/inventory";
import { cn, naira } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "low", label: "Needs attention" },
  { id: "critical", label: "Critical" },
  { id: "expiring", label: "Short-dated" },
] as const;

type Filter = (typeof FILTERS)[number]["id"];

export function InventoryTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(medicines.map((medicine) => medicine.category))).sort()],
    [],
  );

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return medicines.filter((medicine) => {
      const status = stockStatus(medicine);
      const matchesQuery =
        !needle ||
        medicine.name.toLowerCase().includes(needle) ||
        medicine.generic.toLowerCase().includes(needle) ||
        medicine.brand.toLowerCase().includes(needle) ||
        medicine.id.includes(needle) ||
        medicine.shelf.toLowerCase().includes(needle);

      const matchesCategory = category === "All" || medicine.category === category;

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "low"
            ? status !== "healthy"
            : filter === "critical"
              ? status === "critical" || status === "out"
              : medicine.dispensing30d > 0 && medicine.stock / medicine.dispensing30d < 1.2;

      return matchesQuery && matchesCategory && matchesFilter;
    });
  }, [query, filter, category]);

  const totalValue = rows.reduce((sum, medicine) => sum + medicine.stock * medicine.cost, 0);

  return (
    <div className="space-y-3">
      <div className="glass rounded-2xl p-3">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-[11.5px] text-fog-faint">
            <Search className="size-3.5" aria-hidden />
            <span className="sr-only">Search inventory</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by medicine, brand, generic or shelf…"
              className="min-w-0 flex-1 bg-transparent text-bone placeholder:text-fog-faint focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[10px] text-fog-dim hover:text-bone"
              >
                Clear
              </button>
            ) : null}
          </label>

          <label className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/25 px-2.5 py-2 text-[11px] text-fog-dim">
            <SlidersHorizontal className="size-3.5" aria-hidden />
            <span className="sr-only">Filter by category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="bg-transparent text-bone focus:outline-none [&>option]:bg-ink-900"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {FILTERS.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setFilter(entry.id)}
                aria-pressed={filter === entry.id}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[10.5px] font-semibold transition-colors",
                  filter === entry.id
                    ? "bg-mint-500/15 text-mint-200"
                    : "text-fog-faint hover:text-fog",
                )}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-fog-faint">
            {rows.length} items · {naira(totalValue)} at cost
          </p>
        </div>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        {rows.length === 0 ? (
          <EmptyState message="No medicines match that search. Try a generic name or a shelf code." />
        ) : (
          <DataTable
            columns={[
              { label: "Medicine" },
              { label: "Shelf" },
              { label: "On hand", className: "text-right" },
              { label: "Cover", className: "text-right" },
              { label: "Unit price", className: "text-right" },
              { label: "Status", className: "text-right" },
            ]}
          >
            {rows.map((medicine) => {
              const status = stockStatus(medicine);
              const ratio = Math.min(100, (medicine.stock / Math.max(1, medicine.reorderLevel * 2)) * 100);
              return (
                <tr key={medicine.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <p className="text-[11.5px] font-semibold text-bone">
                        {medicine.name} <span className="font-normal text-fog-dim">{medicine.strength}</span>
                      </p>
                      {medicine.rxOnly ? (
                        <span className="rounded border border-violet/25 bg-violet/10 px-1 py-px text-[8px] font-bold uppercase text-violet">
                          Rx
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[9.5px] text-fog-faint">
                      {medicine.brand} · {medicine.generic}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[9px] text-fog-dim">
                      {medicine.shelf}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="text-[11.5px] font-semibold tnum text-bone">
                      {medicine.stock} <span className="text-[9px] font-normal text-fog-faint">{medicine.unit}</span>
                    </p>
                    <Meter
                      value={ratio}
                      tone={status === "healthy" ? "mint" : status === "low" ? "amber" : "rose"}
                      className="mt-1.5 ml-auto max-w-[90px]"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        "text-[10.5px] tnum",
                        weeksOfCover(medicine) < 1
                          ? "text-rose-soft"
                          : weeksOfCover(medicine) < 2
                            ? "text-amber-soft"
                            : "text-fog",
                      )}
                    >
                      {weeksOfCover(medicine).toFixed(1)} wks
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-[10.5px] tnum text-fog">
                    {naira(medicine.price)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <StatusPill status={status} />
                  </td>
                </tr>
              );
            })}
          </DataTable>
        )}
      </div>
    </div>
  );
}

export type { Medicine };
