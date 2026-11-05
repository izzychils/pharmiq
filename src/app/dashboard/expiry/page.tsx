import Link from "next/link";
import { AlertTriangle, ArrowRight, CalendarClock, Download, RotateCcw } from "lucide-react";
import { DataTable, PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import { expiryBuckets, valueAtRisk } from "@/lib/data";
import { cn, daysUntil, naira, shortDate } from "@/lib/utils";

export const metadata = { title: "Expiry" };

const RETURN_WINDOWS = [
  { supplier: "Emzor Distribution", window: "30 days before expiry", items: 2, value: 296600, status: "Eligible" },
  { supplier: "Novartis Direct", window: "21 days before expiry", items: 1, value: 107800, status: "Eligible" },
  { supplier: "Fidson Healthcare", window: "14 days before expiry", items: 1, value: 23600, status: "Review" },
];

export default function ExpiryPage() {
  const totalUnits = expiryBuckets.reduce((sum, bucket) => sum + bucket.units, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Expiry command centre"
        title="Expiry"
        description="Every batch inside the 90-day horizon, priced at cost and ranked by the action it needs. FEFO is switched on for all three branches."
        actions={
          <>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-fog hover:text-bone"
            >
              <Download className="size-3.5" aria-hidden />
              Export list
            </button>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[11.5px] font-bold text-ink-950 hover:bg-mint-400"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Plan return
            </button>
          </>
        }
      />

      <div className="grid gap-3 lg:grid-cols-3">
        {expiryBuckets.map((bucket, index) => {
          const tones = [
            { border: "border-rose/20", bg: "bg-rose/[0.05]", text: "text-rose-soft", bar: "bg-rose" },
            { border: "border-amber/20", bg: "bg-amber/[0.05]", text: "text-amber-soft", bar: "bg-amber" },
            { border: "border-mint-500/20", bg: "bg-mint-500/[0.05]", text: "text-mint-300", bar: "bg-mint-500" },
          ][index];

          return (
            <div
              key={bucket.id}
              className={cn("rounded-2xl border p-4", tones.border, tones.bg)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.12em] text-fog-dim">
                    {bucket.label}
                  </p>
                  <p className="mt-2 text-[24px] font-extrabold tracking-tight tnum text-bone">
                    {naira(bucket.value)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-fog-faint">
                    {bucket.units} units · {bucket.batches.length} batches
                  </p>
                </div>
                <span className={cn("flex size-7 items-center justify-center rounded-lg bg-white/[0.04]", tones.text)}>
                  <CalendarClock className="size-3.5" aria-hidden />
                </span>
              </div>
              <Meter
                value={bucket.units}
                max={Math.max(...expiryBuckets.map((entry) => entry.units))}
                tone={index === 0 ? "rose" : index === 1 ? "amber" : "mint"}
                className="mt-3"
              />
              <p className="mt-2 text-[10px] text-fog-dim">{bucket.note}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Batches inside 60 days"
          subtitle="Ordered by expiry. Values are at cost, not retail."
          action={
            <span className="rounded-full bg-amber/10 px-2 py-0.5 text-[9.5px] font-semibold text-amber-soft">
              {naira(valueAtRisk)} at risk
            </span>
          }
        >
          <DataTable
            columns={[
              { label: "Batch" },
              { label: "Medicine" },
              { label: "Qty" },
              { label: "Expiry" },
              { label: "Action" },
              { label: "Value", className: "text-right" },
            ]}
          >
            {expiryBuckets
              .slice(0, 2)
              .flatMap((bucket) => bucket.batches)
              .sort((a, b) => a.expiry.localeCompare(b.expiry))
              .map((batch) => {
                const days = daysUntil(batch.expiry);
                return (
                  <tr key={batch.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-2.5">
                      <span className="font-mono text-[10px] text-bone">{batch.batchNo}</span>
                      <p className="text-[9px] text-fog-faint">{batch.location}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <p className="text-[11px] font-semibold text-bone">{batch.medicine}</p>
                      <p className="text-[9.5px] text-fog-faint">{batch.strength}</p>
                    </td>
                    <td className="px-4 py-2.5 text-[10.5px] tnum text-fog">{batch.qty}</td>
                    <td className="px-4 py-2.5">
                      <p className="text-[10.5px] tnum text-bone">{shortDate(batch.expiry)}</p>
                      <p className="text-[9px] text-rose-soft">{days} days</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-[9.5px] text-amber-soft">
                        {days <= 21 ? "Pull & return" : days <= 45 ? "Front of FEFO" : "Plan promotion"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-[10.5px] font-semibold tnum text-bone">
                      {naira(batch.qty * batch.cost)}
                    </td>
                  </tr>
                );
              })}
          </DataTable>
        </Panel>

        <div className="space-y-3">
          <Panel title="Supplier return windows" subtitle="Terms on file" bodyClassName="divide-y divide-white/[0.045]">
            {RETURN_WINDOWS.map((entry) => (
              <div key={entry.supplier} className="px-4 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[10.5px] font-semibold text-bone">{entry.supplier}</p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-1.5 py-0.5 text-[8.5px] font-bold",
                      entry.status === "Eligible"
                        ? "bg-mint-500/10 text-mint-300"
                        : "bg-amber/10 text-amber-soft",
                    )}
                  >
                    {entry.status}
                  </span>
                </div>
                <p className="mt-0.5 text-[9.5px] text-fog-faint">
                  {entry.window} · {entry.items} batches · {naira(entry.value)}
                </p>
              </div>
            ))}
          </Panel>

          <div className="rounded-2xl border border-amber/20 bg-amber/[0.05] p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-3.5 text-amber-soft" aria-hidden />
              <p className="text-[11px] font-semibold text-amber-soft">One action today</p>
            </div>
            <p className="mt-2 text-[10.5px] leading-relaxed text-fog">
              Amoxicillin batch AMX-4471 (64 packs) expires in 13 days. Move it to the front
              of the Ikeja City FEFO queue and raise a return for anything left by 12
              November.
            </p>
            <Link
              href="/dashboard/batches"
              className="mt-3 inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-amber/25 bg-amber/10 px-2.5 text-[10px] font-semibold text-amber-soft"
            >
              Open the batch
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11.5px] font-semibold text-bone">90-day horizon</p>
            <p className="mt-1 max-w-xl text-[10.5px] leading-relaxed text-fog-dim">
              {totalUnits} units are inside the horizon. At current dispensing velocity,{" "}
              {Math.round(totalUnits * 0.62)} will clear before expiry; the rest should be
              transferred, discounted or returned.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-fog-faint">Will clear</p>
              <p className="text-[15px] font-bold tnum text-mint-300">62%</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wide text-fog-faint">At risk</p>
              <p className="text-[15px] font-bold tnum text-rose-soft">38%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
