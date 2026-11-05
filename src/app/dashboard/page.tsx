import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CircleAlert,
  Download,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AreaChart, Donut } from "@/components/dashboard/charts";
import { KpiCard, StatusPill } from "@/components/dashboard/kpi";
import { DataTable, PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import {
  branchPerformance,
  categoryMix,
  dispensingSeries,
  expiringBatches,
  medicines,
  monthlyDispensing,
  prescriptions,
} from "@/lib/data";
import { lowStockCount, stockStatus, stockValue, weeksOfCover } from "@/lib/inventory";
import { cn, daysUntil, naira, shortDate } from "@/lib/utils";
import type { Medicine } from "@/lib/data";

function reorderSuggestion(medicine: Medicine) {
  // Target six weeks of cover, net of what is already on the shelf.
  const target = Math.ceil((medicine.dispensing30d / 4.3) * 6);
  return Math.max(medicine.reorderLevel, target - medicine.stock);
}

const ACTION_ITEMS = [
  { label: "Dispense", href: "/dashboard/prescriptions", icon: Plus },
  { label: "Review expiry", href: "/dashboard/expiry", icon: CalendarClock },
  { label: "Draft reorder", href: "/dashboard/reorders", icon: TrendingUp },
];

export default function OverviewPage() {
  const lowStock = medicines
    .filter((medicine) => stockStatus(medicine) !== "healthy")
    .sort((a, b) => a.stock / a.reorderLevel - b.stock / b.reorderLevel)
    .slice(0, 5);

  const queue = prescriptions.filter((script) => script.status !== "collected").slice(0, 4);
  const expiringSoon = expiringBatches.slice(0, 5);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Thursday, 5 November 2026"
        title="Good morning, Adaeze"
        description="Three branches are trading. Four batches need attention inside 60 days, and two items are already out of stock."
        actions={
          <>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-fog transition-colors hover:text-bone"
            >
              <Download className="size-3.5" aria-hidden />
              Export
            </button>
            <Link
              href="/dashboard/prescriptions"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[11.5px] font-bold text-ink-950 transition-colors hover:bg-mint-400"
            >
              <Plus className="size-3.5" aria-hidden />
              Dispense
            </Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Stock value"
          value={naira(stockValue())}
          detail="Across 3 branches"
          change={2.4}
          icon={<TrendingUp className="size-3.5" aria-hidden />}
        />
        <KpiCard
          label="Expiring in 60 days"
          value="₦404,400"
          detail="6 batches"
          tone="amber"
          icon={<CalendarClock className="size-3.5" aria-hidden />}
        />
        <KpiCard
          label="Below reorder point"
          value={`${lowStockCount()} items`}
          detail="2 stock-outs"
          tone="rose"
          icon={<CircleAlert className="size-3.5" aria-hidden />}
        />
        <KpiCard
          label="Scripts today"
          value="34"
          detail="+18.2% vs average"
          change={18.2}
          icon={<Sparkles className="size-3.5" aria-hidden />}
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Dispensing revenue"
          subtitle="Last 7 days · all branches"
          action={
            <div className="flex items-center gap-1">
              {["7d", "30d", "90d"].map((range) => (
                <span
                  key={range}
                  className={cn(
                    "rounded-md px-2 py-1 text-[9.5px] font-semibold",
                    range === "7d" ? "bg-white/[0.08] text-bone" : "text-fog-faint",
                  )}
                >
                  {range}
                </span>
              ))}
            </div>
          }
          bodyClassName="p-4"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[26px] font-extrabold leading-none tracking-tight tnum text-bone">
                ₦3,138,000
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-mint-300">
                <ArrowUpRight className="size-3" aria-hidden />
                9.4% vs previous week
              </p>
            </div>
            <div className="flex gap-5 text-right">
              <div>
                <p className="text-[9px] uppercase tracking-wide text-fog-faint">Units</p>
                <p className="text-[13px] font-bold tnum text-bone">634</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wide text-fog-faint">Basket</p>
                <p className="text-[13px] font-bold tnum text-bone">₦4,950</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wide text-fog-faint">Margin</p>
                <p className="text-[13px] font-bold tnum text-bone">31.2%</p>
              </div>
            </div>
          </div>
          <AreaChart
            id="overview-revenue"
            data={dispensingSeries}
            height={168}
            className="mt-4"
          />
        </Panel>

        <Panel
          title="Expiry watchlist"
          subtitle="FEFO-ranked · next 60 days"
          action={
            <Link
              href="/dashboard/expiry"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-mint-300 hover:text-mint-200"
            >
              Open
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          }
          bodyClassName="divide-y divide-white/[0.045]"
        >
          {expiringSoon.map((batch) => {
            const days = daysUntil(batch.expiry);
            return (
              <div key={batch.id} className="flex items-center gap-3 px-4 py-2.5">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold",
                    days <= 30
                      ? "bg-rose/10 text-rose-soft"
                      : days <= 60
                        ? "bg-amber/10 text-amber-soft"
                        : "bg-mint-500/10 text-mint-300",
                  )}
                >
                  {days}d
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-bone">
                    {batch.medicine} {batch.strength}
                  </p>
                  <p className="truncate text-[9.5px] text-fog-faint">
                    {batch.batchNo} · {batch.qty} units · {batch.location}
                  </p>
                </div>
                <p className="shrink-0 text-[10px] font-semibold tnum text-fog-dim">
                  {naira(batch.qty * batch.cost)}
                </p>
              </div>
            );
          })}
          <div className="flex items-center justify-between bg-amber/[0.05] px-4 py-2.5">
            <span className="text-[10px] text-amber-soft">Value at risk in 60 days</span>
            <span className="text-[11px] font-bold tnum text-amber-soft">₦404,400</span>
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Reorder recommendations"
          subtitle="Based on 30-day dispensing velocity and 6 weeks of cover"
          action={
            <Link
              href="/dashboard/reorders"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-mint-300 hover:text-mint-200"
            >
              Review all
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          }
        >
          <DataTable
            columns={[
              { label: "Medicine" },
              { label: "On hand", className: "text-right" },
              { label: "Cover", className: "text-right" },
              { label: "Suggest", className: "text-right" },
              { label: "Status", className: "text-right" },
            ]}
          >
            {lowStock.map((medicine) => {
              const cover = weeksOfCover(medicine);
              return (
                <tr key={medicine.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5">
                    <p className="text-[11.5px] font-semibold text-bone">
                      {medicine.name} {medicine.strength}
                    </p>
                    <p className="text-[9.5px] text-fog-faint">
                      {medicine.form} · reorder at {medicine.reorderLevel}
                    </p>
                  </td>
                  <td className="px-4 py-2.5 text-right text-[11px] tnum text-fog">
                    {medicine.stock}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span
                      className={cn(
                        "text-[11px] tnum",
                        cover < 1 ? "text-rose-soft" : "text-amber-soft",
                      )}
                    >
                      {cover.toFixed(1)} wks
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-[11px] font-semibold tnum text-mint-300">
                    {reorderSuggestion(medicine)}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <StatusPill status={stockStatus(medicine)} />
                  </td>
                </tr>
              );
            })}
          </DataTable>
        </Panel>

        <div className="space-y-3">
          <Panel title="Category mix" subtitle="Units dispensed · 30 days" bodyClassName="p-4">
            <Donut segments={categoryMix} size={104} thickness={10} centerValue="1.9k" centerLabel="units" />
          </Panel>

          <Panel title="Branch performance" subtitle="Month to date" bodyClassName="divide-y divide-white/[0.045]">
            {branchPerformance.map((branch) => (
              <div key={branch.branch} className="px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-bone">{branch.branch}</p>
                  <p className="text-[10.5px] font-semibold tnum text-fog">{naira(branch.revenue)}</p>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Meter
                    value={branch.revenue}
                    max={Math.max(...branchPerformance.map((entry) => entry.revenue))}
                    tone={branch.lowStock > 3 ? "amber" : "mint"}
                    className="flex-1"
                  />
                  <span className="text-[9px] text-fog-faint">{branch.lowStock} low</span>
                </div>
              </div>
            ))}
          </Panel>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Prescription queue"
          subtitle="Awaiting verification and handover"
          action={
            <Link
              href="/dashboard/prescriptions"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-mint-300 hover:text-mint-200"
            >
              Open queue
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          }
        >
          <DataTable
            columns={[
              { label: "Patient" },
              { label: "Items" },
              { label: "Received", className: "text-right" },
              { label: "Status", className: "text-right" },
            ]}
          >
            {queue.map((script) => (
              <tr key={script.id}>
                <td className="px-4 py-2.5">
                  <p className="text-[11.5px] font-semibold text-bone">{script.patient}</p>
                  <p className="text-[9.5px] text-fog-faint">
                    {script.id} · {script.insurance}
                  </p>
                </td>
                <td className="max-w-[260px] px-4 py-2.5">
                  <p className="truncate text-[10.5px] text-fog">{script.items.join(" · ")}</p>
                  {script.flag ? (
                    <p className="mt-0.5 truncate text-[9px] text-amber-soft">{script.flag}</p>
                  ) : null}
                </td>
                <td className="px-4 py-2.5 text-right text-[10.5px] tnum text-fog-dim">
                  {script.received}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <StatusPill status={script.status} />
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>

        <div className="space-y-3">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg border border-mint-500/25 bg-mint-500/10 text-mint-300">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              <p className="text-[11.5px] font-semibold text-bone">This morning&apos;s insight</p>
            </div>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-fog">
              Ceftriaxone has been out for two days and is still being requested. Raising a
              40-vial order now keeps cover above four weeks at the current rate.
            </p>
            <Link
              href="/dashboard/reorders"
              className="mt-3 inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-mint-500/25 bg-mint-500/10 px-2.5 text-[10px] font-semibold text-mint-300"
            >
              Draft the order
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          </div>

          <Panel title="Quick actions" bodyClassName="p-2">
            {ACTION_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex min-h-9 items-center gap-2 rounded-lg px-2.5 text-[11px] text-fog transition-colors hover:bg-white/[0.04] hover:text-bone"
              >
                <item.icon className="size-3.5 text-fog-faint" aria-hidden />
                {item.label}
                <ArrowRight className="ml-auto size-3 text-fog-faint" aria-hidden />
              </Link>
            ))}
          </Panel>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {monthlyDispensing.slice(-3).map((month) => (
          <div key={month.month} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-fog-faint">{month.month} 2026</p>
              <p className="mt-1 text-[14px] font-bold tnum text-bone">₦{month.revenue.toFixed(1)}m</p>
            </div>
            <p className="text-[10px] text-fog-dim">{month.scripts.toLocaleString()} scripts</p>
          </div>
        ))}
      </div>

      <p className="px-1 pb-2 text-[9.5px] text-fog-faint">
        Sample data from a demonstration pharmacy. Expiry dates shown against 5 November
        2026. Last synced just now.
      </p>
    </div>
  );
}
