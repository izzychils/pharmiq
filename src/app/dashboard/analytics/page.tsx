import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { AreaChart, BarChart, Donut } from "@/components/dashboard/charts";
import { DataTable, PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import {
  branchPerformance,
  categoryMix,
  monthlyDispensing,
  slowMovers,
  topMovers,
} from "@/lib/data";
import { cn, naira, percent } from "@/lib/utils";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Performance"
        title="Analytics"
        description="Revenue, cover and margin by branch. The same numbers the owner sees on the board export — no separate spreadsheet required."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-fog hover:text-bone"
          >
            <Download className="size-3.5" aria-hidden />
            Export board pack
          </button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Revenue MTD", value: "₦4.06m", change: "+11.4%" },
          { label: "Scripts MTD", value: "634", change: "+8.2%" },
          { label: "Gross margin", value: "31.2%", change: "−0.6 pts" },
          { label: "Expiry losses", value: "₦48k", change: "−62%" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl px-4 py-3">
            <p className="text-[9.5px] uppercase tracking-[0.1em] text-fog-faint">{stat.label}</p>
            <p className="mt-1.5 text-[19px] font-bold tracking-tight tnum text-bone">{stat.value}</p>
            <p className="mt-0.5 text-[9.5px] text-mint-300">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]">
        <Panel title="Revenue by month" subtitle="Last six months · all branches" bodyClassName="p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[26px] font-extrabold leading-none tracking-tight tnum text-bone">
                ₦52.1m
              </p>
              <p className="mt-1.5 text-[10.5px] text-fog-dim">6-month total · 10,900 scripts</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-mint-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-mint-300">
              <TrendingUp className="size-3" aria-hidden />
              +32% since June
            </span>
          </div>
          <AreaChart
            id="analytics-revenue"
            data={monthlyDispensing.map((month) => ({ label: month.month, value: month.revenue }))}
            height={180}
            className="mt-4"
          />
        </Panel>

        <Panel title="Category mix" subtitle="Units dispensed · last 30 days" bodyClassName="p-4">
          <Donut segments={categoryMix} size={124} thickness={11} centerValue="1.9k" centerLabel="units" />
        </Panel>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Fast movers" subtitle="30-day units and revenue" bodyClassName="p-4">
          <div className="flex h-36 items-end gap-2">
            {[
              { label: "Para", value: 318 },
              { label: "ORS", value: 214 },
              { label: "Ibu", value: 187 },
              { label: "AL", value: 142 },
              { label: "VitC", value: 122 },
              { label: "Amox", value: 96 },
            ].map((item) => (
              <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-1.5">
                <div className="relative flex-1">
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-t bg-[linear-gradient(180deg,#a9f5d2,#3ddc97)]"
                    style={{ height: `${(item.value / 318) * 100}%` }}
                  />
                </div>
                <span className="text-center text-[9px] text-fog-faint">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3">
            {topMovers.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[10.5px]">
                <span className="truncate text-fog">{item.name}</span>
                <span className="flex items-center gap-2">
                  <span className="tnum text-fog-faint">{item.units} u</span>
                  <span className={cn("tnum", item.change >= 0 ? "text-mint-300" : "text-rose-soft")}>
                    {percent(item.change)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Slow movers" subtitle="Cover is high relative to dispensing" bodyClassName="p-4">
          <div className="space-y-2">
            {slowMovers.map((item) => (
              <div key={item.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10.5px] font-semibold text-bone">{item.name}</p>
                  <span className="flex items-center gap-1 text-[9.5px] text-amber-soft">
                    <TrendingDown className="size-3" aria-hidden />
                    {item.units} units
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Meter value={Math.min(item.cover, 52)} max={52} tone="amber" />
                  <span className="shrink-0 text-[9px] text-fog-faint">{item.note}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9.5px] leading-relaxed text-fog-faint">
            Consider a shelf review or a small transfer before the next expiry window.
          </p>
        </Panel>
      </div>

      <Panel title="Branch scorecard" subtitle="Month to date">
        <DataTable
          columns={[
            { label: "Branch" },
            { label: "Revenue", className: "text-right" },
            { label: "Scripts", className: "text-right" },
            { label: "Cover", className: "text-right" },
            { label: "Low stock", className: "text-right" },
          ]}
        >
          {branchPerformance.map((branch) => (
            <tr key={branch.branch} className="hover:bg-white/[0.02]">
              <td className="px-4 py-3">
                <p className="text-[11.5px] font-semibold text-bone">{branch.branch}</p>
                <p className="text-[9.5px] text-fog-faint">Ikeja · Lagos</p>
              </td>
              <td className="px-4 py-3 text-right text-[10.5px] font-semibold tnum text-bone">
                {naira(branch.revenue)}
              </td>
              <td className="px-4 py-3 text-right text-[10.5px] tnum text-fog">{branch.scripts}</td>
              <td className="px-4 py-3 text-right">
                <span className={cn("text-[10.5px] tnum", branch.cover >= 90 ? "text-mint-300" : "text-amber-soft")}>
                  {branch.cover}%
                </span>
              </td>
              <td className="px-4 py-3 text-right text-[10.5px] tnum text-amber-soft">
                {branch.lowStock}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>

      <Panel title="Revenue rhythm" subtitle="Day of week · this week" bodyClassName="p-4">
        <BarChart
          height={130}
          data={[
            { label: "Mon", value: 412 },
            { label: "Tue", value: 386 },
            { label: "Wed", value: 468 },
            { label: "Thu", value: 441 },
            { label: "Fri", value: 522 },
            { label: "Sat", value: 611 },
            { label: "Sun", value: 298 },
          ]}
        />
        <p className="mt-2 text-[9.5px] text-fog-faint">
          Thousands of naira. Saturday remains the peak dispensing day across all branches.
        </p>
      </Panel>
    </div>
  );
}
