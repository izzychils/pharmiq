import { Plus, Upload } from "lucide-react";
import { CatalogTable } from "@/features/catalog/components/catalog-table";
import { PageHeader } from "@/components/dashboard/page-parts";
import { medicines } from "@/lib/data";

export const metadata = { title: "Catalog" };

export default function CatalogPage() {
  const rx = medicines.filter((medicine) => medicine.rxOnly).length;

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Reference data"
        title="Medicine catalog"
        description="Brands, generics, strengths, dosage forms and manufacturers. The catalog is the anchor every batch and prescription points at."
        actions={
          <>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-fog hover:text-bone"
            >
              <Upload className="size-3.5" aria-hidden />
              Import
            </button>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[11.5px] font-bold text-ink-950 hover:bg-mint-400"
            >
              <Plus className="size-3.5" aria-hidden />
              Add medicine
            </button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Catalog entries", value: "1,284", note: "24 categories" },
          { label: "Prescription-only", value: `${rx * 73}`, note: "controlled list" },
          { label: "Manufacturers", value: "48", note: "verified suppliers" },
          { label: "Needs review", value: "3", note: "missing strength" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl px-4 py-3">
            <p className="text-[9.5px] uppercase tracking-[0.1em] text-fog-faint">{stat.label}</p>
            <p className="mt-1.5 text-[18px] font-bold tracking-tight tnum text-bone">{stat.value}</p>
            <p className="mt-0.5 text-[9.5px] text-fog-faint">{stat.note}</p>
          </div>
        ))}
      </div>

      <CatalogTable />

      <div className="glass rounded-2xl p-4">
        <p className="text-[11px] font-semibold text-bone">A note on the catalog</p>
        <p className="mt-1 max-w-3xl text-[10.5px] leading-relaxed text-fog-dim">
          Product information here is demonstration data. In production, catalog entries
          are reviewed against the manufacturer&apos;s summary and the national register
          before they can be dispensed. Clinical guidance is retrieved live and always
          cites its source.
        </p>
      </div>
    </div>
  );
}
