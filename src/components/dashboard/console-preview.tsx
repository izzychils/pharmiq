import {
  Bell,
  Boxes,
  CalendarClock,
  ClipboardList,
  LayoutDashboard,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { AreaChart, Donut } from "@/components/dashboard/charts";
import { KpiCard, StatusPill } from "@/components/dashboard/kpi";
import {
  categoryMix,
  dispensingSeries,
  expiringBatches,
  prescriptions,
} from "@/lib/data";
import { cn, daysUntil, naira, shortDate } from "@/lib/utils";

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Boxes, label: "Inventory" },
  { icon: CalendarClock, label: "Expiry", badge: "4" },
  { icon: ClipboardList, label: "Prescriptions", badge: "3" },
  { icon: TrendingUp, label: "Reorders" },
  { icon: Sparkles, label: "Assistant" },
];

/** The browser chrome every product shot on the marketing site sits in. */
export function BrowserFrame({
  children,
  url = "app.pharmiq.online/dashboard",
  className,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-[0_60px_140px_-60px_rgba(0,0,0,1)]",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.07] bg-black/30 px-3.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="mx-auto hidden max-w-[18rem] flex-1 truncate rounded-full bg-black/40 px-3 py-1 text-center text-[10px] text-white/40 sm:block">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/**
 * The hero product shot.
 *
 * It is static markup rather than a screenshot: it stays sharp on every display,
 * adds no image weight, and the numbers come from the same data the dashboard
 * uses, so the marketing page never drifts from the product.
 */
export function ConsolePreview() {
  const upcoming = expiringBatches.slice(0, 3);

  return (
    <BrowserFrame>
      <div className="flex min-h-[30rem] bg-[#050d0a]">
        {/* rail */}
        <aside className="hidden w-[178px] shrink-0 flex-col border-r border-white/[0.06] bg-black/20 p-3 lg:flex">
          <div className="flex items-center gap-2 px-1.5 py-1">
            <LogoMark className="size-6 rounded-md" />
            <span className="text-[12px] font-bold tracking-tight">pharmiq</span>
            <span className="ml-auto rounded border border-white/10 px-1 py-0.5 text-[8px] uppercase tracking-wide text-fog-faint">
              demo
            </span>
          </div>

          <div className="mt-4 space-y-0.5">
            {NAV.map(({ icon: Icon, label, active, badge }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px]",
                  active ? "bg-mint-500/10 text-mint-200" : "text-fog-dim",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
                <span className="font-medium">{label}</span>
                {badge ? (
                  <span className="ml-auto rounded-full bg-amber/15 px-1.5 py-px text-[8.5px] font-bold text-amber-soft">
                    {badge}
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
            <p className="text-[8.5px] uppercase tracking-[0.12em] text-fog-faint">Branch</p>
            <p className="mt-1 flex items-center gap-1.5 text-[10.5px] font-semibold text-bone">
              <span className="size-1.5 rounded-full bg-mint-500" />
              Ikeja City
            </p>
            <p className="mt-0.5 text-[9.5px] text-fog-faint">+ 2 more branches</p>
          </div>

          <div className="mt-auto flex items-center gap-2 rounded-lg px-1.5 py-1.5">
            <span className="flex size-6 items-center justify-center rounded-full bg-mint-500/15 text-[9px] font-bold text-mint-300">
              AN
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-semibold">Adaeze Nwankwo</span>
              <span className="block truncate text-[9px] text-fog-faint">Superintendent</span>
            </span>
          </div>
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1 p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">
                Thursday, 5 November 2026
              </p>
              <h3 className="mt-0.5 text-[15px] font-bold tracking-tight">Good morning, Adaeze</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="hidden items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 text-[9.5px] text-fog-dim sm:flex">
                <Search className="size-3" aria-hidden />
                Search stock
                <kbd className="ml-1 rounded border border-white/10 px-1 text-[8px] text-fog-faint">⌘K</kbd>
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                <Bell className="size-3.5 text-fog-dim" aria-hidden />
              </span>
              <span className="flex items-center gap-1 rounded-lg bg-mint-500 px-2 py-1.5 text-[9.5px] font-bold text-ink-950">
                <Plus className="size-3" aria-hidden />
                Dispense
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            <KpiCard label="Stock value" value="₦12.8m" detail="3 branches" change={2.4} />
            <KpiCard
              label="Expiring 30d"
              value="₦296k"
              detail="4 batches"
              tone="amber"
              icon={<CalendarClock className="size-3.5" aria-hidden />}
            />
            <KpiCard
              label="Below reorder"
              value="6"
              detail="2 stock-outs"
              tone="amber"
            />
            <KpiCard label="Scripts today" value="34" detail="+18% vs avg" change={18.2} />
          </div>

          <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[1.35fr_1fr]">
            <div className="glass-quiet rounded-xl p-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                    Dispensing revenue · 7 days
                  </p>
                  <p className="mt-1 text-lg font-extrabold tracking-tight tnum">₦3,138,000</p>
                </div>
                <span className="rounded-full bg-mint-500/10 px-2 py-0.5 text-[9px] font-bold text-mint-300">
                  +9.4%
                </span>
              </div>
              <AreaChart
                id="console-dispensing"
                data={dispensingSeries.map((point) => ({ label: point.label, value: point.value }))}
                height={104}
                className="mt-2"
              />
            </div>

            <div className="glass-quiet rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                  Expiry watchlist
                </p>
                <span className="text-[9px] text-mint-300">FEFO on</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {upcoming.map((batch) => {
                  const days = daysUntil(batch.expiry);
                  return (
                    <li
                      key={batch.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-1.5"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[10px] font-semibold text-bone">
                          {batch.medicine} · {batch.strength}
                        </span>
                        <span className="block text-[8.5px] text-fog-faint">
                          {batch.batchNo} · {batch.qty} units
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-1.5 py-0.5 text-[8.5px] font-bold",
                          days <= 30
                            ? "bg-rose/15 text-rose-soft"
                            : "bg-amber/15 text-amber-soft",
                        )}
                      >
                        {days}d
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 flex items-center justify-between rounded-lg bg-mint-500/[0.07] px-2 py-1.5">
                <span className="flex items-center gap-1.5 text-[9px] text-mint-200">
                  <Sparkles className="size-2.5" aria-hidden />
                  Reorder drafted for 3 items
                </span>
                <span className="text-[9px] font-bold tnum text-mint-300">₦412k</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[1.35fr_1fr]">
            <div className="glass-quiet rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                  Prescription queue
                </p>
                <span className="text-[9px] text-fog-faint">3 waiting</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {prescriptions.slice(0, 4).map((script) => (
                  <div
                    key={script.id}
                    className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-2"
                  >
                    <p className="truncate text-[9.5px] font-semibold text-bone">
                      {script.patient}
                    </p>
                    <p className="mt-0.5 truncate text-[8px] text-fog-faint">{script.id}</p>
                    <StatusPill
                      status={script.status}
                      className="mt-1.5 scale-90 origin-left !text-[8px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-quiet rounded-xl p-3.5">
              <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                Category mix · units
              </p>
              <div className="mt-2">
                <Donut segments={categoryMix} size={86} thickness={9} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** Compact status card used in the platform tab panels. */
export function StockRow({
  medicine,
  strength,
  qty,
  expiry,
}: {
  medicine: string;
  strength: string;
  qty: number;
  expiry: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.05] px-3 py-2.5 last:border-0">
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold text-bone">{medicine}</p>
        <p className="text-[10px] text-fog-faint">
          {strength} · exp {shortDate(expiry)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[12px] font-bold tnum text-bone">{qty}</p>
        <p className="text-[9px] text-fog-faint">{daysUntil(expiry)} days</p>
      </div>
    </div>
  );
}
