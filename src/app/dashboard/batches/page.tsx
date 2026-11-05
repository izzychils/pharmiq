import Link from "next/link";
import { ArrowRight, Layers, ScanLine } from "lucide-react";
import { DataTable, PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import { batches, medicines } from "@/lib/data";
import { cn, daysUntil, naira, shortDate } from "@/lib/utils";

export const metadata = { title: "Batches" };

export default function BatchesPage() {
  const ordered = [...batches]
    .filter((batch) => batch.qty > 0)
    .sort((a, b) => a.expiry.localeCompare(b.expiry));

  const inStock = ordered.reduce((sum, batch) => sum + batch.qty, 0);
  const quarantined = batches.filter((batch) => daysUntil(batch.expiry) < 0);
  const coldChain = ordered.filter((batch) => batch.location.toLowerCase().includes("cold"));

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Traceability"
        title="Batches"
        description="Every unit on a shelf belongs to a batch with a supplier, a receipt date and an expiry. The queue is already ranked FEFO."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[11.5px] font-bold text-ink-950 hover:bg-mint-400"
          >
            <ScanLine className="size-3.5" aria-hidden />
            Scan a pack
          </button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active batches", value: `${ordered.length}`, note: `${inStock} units on shelf` },
          { label: "Earliest expiry", value: shortDate(ordered[0].expiry), note: `${daysUntil(ordered[0].expiry)} days left` },
          { label: "Cold chain", value: `${coldChain.length}`, note: "temperature logged" },
          { label: "Quarantined", value: `${quarantined.length}`, note: "expired · cannot dispense" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl px-4 py-3">
            <p className="text-[9.5px] uppercase tracking-[0.1em] text-fog-faint">{stat.label}</p>
            <p className="mt-1.5 text-[16px] font-bold tracking-tight tnum text-bone">{stat.value}</p>
            <p className="mt-0.5 text-[9.5px] text-fog-faint">{stat.note}</p>
          </div>
        ))}
      </div>

      <Panel
        title="FEFO queue"
        subtitle="Earliest valid expiry first · Ikeja City and transfers"
        action={
          <Link
            href="/dashboard/expiry"
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-mint-300 hover:text-mint-200"
          >
            Expiry view
            <ArrowRight className="size-3" aria-hidden />
          </Link>
        }
      >
        <DataTable
          columns={[
            { label: "Rank" },
            { label: "Batch" },
            { label: "Medicine" },
            { label: "Qty" },
            { label: "Expiry" },
            { label: "Supplier" },
            { label: "Value", className: "text-right" },
          ]}
        >
          {ordered.map((batch, index) => {
            const days = daysUntil(batch.expiry);
            return (
              <tr key={batch.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-2.5">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-md text-[9.5px] font-bold",
                      index < 3 ? "bg-mint-500/15 text-mint-300" : "bg-white/[0.04] text-fog-dim",
                    )}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="font-mono text-[10px] text-bone">{batch.batchNo}</span>
                  <p className="text-[9px] text-fog-faint">{batch.location}</p>
                </td>
                <td className="px-4 py-2.5">
                  <p className="text-[11px] font-semibold text-bone">{batch.medicine}</p>
                  <p className="text-[9.5px] text-fog-faint">{batch.strength}</p>
                </td>
                <td className="px-4 py-2.5">
                  <p className="text-[11px] tnum text-fog">{batch.qty}</p>
                  <Meter
                    value={batch.qty}
                    max={Math.max(...ordered.map((entry) => entry.qty))}
                    tone={days <= 30 ? "amber" : "mint"}
                    className="mt-1 w-16"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <p className="text-[10.5px] tnum text-bone">{shortDate(batch.expiry)}</p>
                  <p
                    className={cn(
                      "text-[9px]",
                      days <= 30 ? "text-rose-soft" : days <= 60 ? "text-amber-soft" : "text-fog-faint",
                    )}
                  >
                    {days} days
                  </p>
                </td>
                <td className="px-4 py-2.5 text-[10px] text-fog-dim">{batch.supplier}</td>
                <td className="px-4 py-2.5 text-right text-[10.5px] font-semibold tnum text-bone">
                  {naira(batch.qty * batch.cost)}
                </td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <Layers className="size-3.5 text-mint-400" aria-hidden />
            <p className="text-[11.5px] font-semibold text-bone">Quarantine</p>
          </div>
          {quarantined.length === 0 ? (
            <p className="mt-2 text-[10.5px] text-fog-dim">Nothing expired. Good.</p>
          ) : (
            quarantined.map((batch) => (
              <div key={batch.id} className="mt-2 flex items-center justify-between rounded-lg border border-rose/20 bg-rose/[0.05] px-3 py-2">
                <div>
                  <p className="text-[10.5px] font-semibold text-rose-soft">
                    {batch.batchNo} · {batch.medicine}
                  </p>
                  <p className="text-[9px] text-fog-faint">
                    Expired {shortDate(batch.expiry)} · {batch.location}
                  </p>
                </div>
                <span className="rounded bg-rose/15 px-1.5 py-0.5 text-[8.5px] font-bold text-rose-soft">
                  blocked
                </span>
              </div>
            ))
          )}
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="text-[11.5px] font-semibold text-bone">Batch integrity</p>
          <div className="mt-3 space-y-2">
            {[
              { label: "Batch number captured", value: 100 },
              { label: "Expiry verified at intake", value: 100 },
              { label: "Cold-chain log complete", value: 96 },
              { label: "Supplier invoice attached", value: 92 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-fog-dim">{item.label}</span>
                  <span className="tnum text-bone">{item.value}%</span>
                </div>
                <Meter
                  value={item.value}
                  tone={item.value >= 96 ? "mint" : "amber"}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9.5px] text-fog-faint">
            {medicines.length} catalog items linked to {batches.length} batch records.
          </p>
        </div>
      </div>
    </div>
  );
}
