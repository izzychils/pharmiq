"use client";

import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { DataTable, EmptyState } from "@/components/dashboard/page-parts";
import { medicines } from "@/lib/data";
import { cn, naira } from "@/lib/utils";

export function CatalogTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(medicines.map((medicine) => medicine.category))).sort()],
    [],
  );

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return medicines.filter((medicine) => {
      const matchesCategory = category === "All" || medicine.category === category;
      const matchesQuery =
        !needle ||
        [medicine.name, medicine.generic, medicine.brand, medicine.manufacturer]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="space-y-3">
      <div className="glass rounded-2xl p-3">
        <label className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-[11.5px] text-fog-faint">
          <Search className="size-3.5" aria-hidden />
          <span className="sr-only">Search the medicine catalog</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by brand, generic name or manufacturer…"
            className="min-w-0 flex-1 bg-transparent text-bone placeholder:text-fog-faint focus:outline-none"
          />
        </label>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {categories.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setCategory(entry)}
              aria-pressed={category === entry}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[10.5px] font-semibold transition-colors",
                category === entry
                  ? "bg-mint-500/15 text-mint-200"
                  : "text-fog-faint hover:text-fog",
              )}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        {rows.length === 0 ? (
          <EmptyState message="Nothing in the catalog matches that. Add the medicine or try its generic name." />
        ) : (
          <DataTable
            columns={[
              { label: "Brand / medicine" },
              { label: "Generic" },
              { label: "Strength" },
              { label: "Form" },
              { label: "Manufacturer" },
              { label: "Unit price", className: "text-right" },
            ]}
          >
            {rows.map((medicine) => (
              <tr key={medicine.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03] text-[8px] font-bold text-fog-dim">
                      <BookOpen className="size-3" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[11.5px] font-semibold text-bone">{medicine.brand}</p>
                      <p className="text-[9.5px] text-fog-faint">{medicine.name}</p>
                    </div>
                  </div>
                </td>
                <td className="max-w-[220px] px-4 py-2.5">
                  <p className="truncate text-[10.5px] text-fog">{medicine.generic}</p>
                </td>
                <td className="px-4 py-2.5 text-[10.5px] tnum text-fog">{medicine.strength}</td>
                <td className="px-4 py-2.5 text-[10.5px] text-fog">{medicine.form}</td>
                <td className="px-4 py-2.5 text-[10.5px] text-fog-dim">{medicine.manufacturer}</td>
                <td className="px-4 py-2.5 text-right text-[10.5px] font-semibold tnum text-bone">
                  {naira(medicine.price)}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  );
}
