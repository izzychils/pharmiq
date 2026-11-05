"use client";

import { useState } from "react";
import {
  ArrowRight,
  Boxes,
  CalendarClock,
  ClipboardList,
  Search,
  Sparkles,
} from "lucide-react";
import { BrowserFrame } from "@/components/dashboard/console-preview";
import { StatusPill } from "@/components/dashboard/kpi";
import { Meter } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import {
  expiringBatches,
  medicines,
  prescriptions,
} from "@/lib/data";
import { cn, daysUntil, naira, shortDate } from "@/lib/utils";

const TABS = [
  {
    id: "inventory",
    label: "Inventory",
    icon: Boxes,
    title: "Every pack, every shelf, one source of truth",
    copy: "Stock levels update as you dispense. Reorder points are set per medicine, not per category, so a fast-moving antibiotic flags long before it disappears.",
    points: ["Batch-level quantities", "Shelf and branch locations", "Live low-stock flags"],
  },
  {
    id: "expiry",
    label: "Expiry",
    icon: CalendarClock,
    title: "See the write-off before it happens",
    copy: "Every batch carries its expiry date. Pharmiq groups them into 30, 60 and 90-day windows, values the risk at cost, and tells you which branch to act on first.",
    points: ["Value at risk by branch", "30 / 60 / 90-day windows", "Return and transfer suggestions"],
  },
  {
    id: "scripts",
    label: "Prescriptions",
    icon: ClipboardList,
    title: "A dispensing queue that keeps its place",
    copy: "Scripts arrive from walk-ins, WhatsApp and referrals into one queue. Each step is logged: intake, verification, dispensing, handover.",
    points: ["Interaction and allergy flags", "Insurance and HMO capture", "Full audit trail"],
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Platform() {
  const [active, setActive] = useState<TabId>("inventory");
  const tab = TABS.find((entry) => entry.id === active) ?? TABS[0];

  return (
    <section id="platform" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-mint-500/50" />
          <span className="mono-label !text-mint-300/80">The workspace</span>
          <span className="h-px w-8 bg-mint-500/50" />
        </div>
        <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-bone">
          Three views. <span className="display-italic text-fog">One record.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-fog">
          The counter, the stockroom and the back office have never shared a screen
          properly. Pharmiq gives each one the view it needs, over the same ledger.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <div
          role="tablist"
          aria-label="Workspace views"
          className="mx-auto flex w-fit items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={cn(
                "inline-flex min-h-9 items-center gap-2 rounded-full px-4 text-[12.5px] font-semibold transition-all",
                active === id
                  ? "bg-mint-500 text-ink-950 shadow-[0_8px_20px_-8px_rgba(61,220,151,0.8)]"
                  : "text-fog hover:text-bone",
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div className="lg:sticky lg:top-28">
          <Reveal key={`${active}-copy`}>
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-bone">
              {tab.title}
            </h3>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fog">{tab.copy}</p>
            <ul className="mt-6 space-y-2.5">
              {tab.points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-[13px] text-bone/80">
                  <span className="flex size-5 items-center justify-center rounded-full border border-mint-500/25 bg-mint-500/10">
                    <span className="size-1.5 rounded-full bg-mint-400" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <a
              href="/dashboard"
              className="mt-7 inline-flex min-h-10 items-center gap-2 text-[13px] font-semibold text-mint-300 transition-colors hover:text-mint-200"
            >
              Explore this view in the demo
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </Reveal>
        </div>

        <Reveal delay={80} key={`${active}-panel`}>
          <BrowserFrame
            url={`app.pharmiq.online/${active === "scripts" ? "prescriptions" : active}`}
            className="shadow-[0_50px_120px_-50px_rgba(0,0,0,1)]"
          >
            {active === "inventory" ? <InventoryPanel /> : null}
            {active === "expiry" ? <ExpiryPanel /> : null}
            {active === "scripts" ? <ScriptsPanel /> : null}
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  );
}

function InventoryPanel() {
  return (
    <div className="bg-[#050d0a] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Inventory</p>
          <p className="mt-1 text-[13px] font-bold text-bone">Ikeja City · 1,284 SKUs</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-fog-dim">
          <Search className="size-3" aria-hidden />
          Search medicines
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "On shelf", value: "₦12.8m" },
          { label: "Below reorder", value: "6 items" },
          { label: "Expiring 30d", value: "4 batches" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <p className="text-[9px] uppercase tracking-wide text-fog-faint">{stat.label}</p>
            <p className="mt-1 text-[13px] font-bold tnum text-bone">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-white/[0.06]">
        <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.6fr] gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[8.5px] uppercase tracking-wide text-fog-faint">
          <span>Medicine</span>
          <span className="text-right">On hand</span>
          <span className="hidden text-right sm:block">Reorder at</span>
          <span className="text-right">Status</span>
        </div>
        {medicines.slice(0, 6).map((medicine) => {
          const ratio = Math.min(100, (medicine.stock / (medicine.reorderLevel * 2)) * 100);
          const status =
            medicine.stock === 0
              ? "out"
              : medicine.stock <= medicine.reorderLevel
                ? "low"
                : "healthy";
          return (
            <div
              key={medicine.id}
              className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.6fr] items-center gap-2 border-b border-white/[0.04] px-3 py-2.5 last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-bone">
                  {medicine.name} <span className="text-fog-faint">{medicine.strength}</span>
                </p>
                <p className="text-[9px] text-fog-faint">
                  {medicine.form} · {medicine.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold tnum text-bone">{medicine.stock}</p>
                <Meter
                  value={ratio}
                  tone={status === "low" || status === "out" ? "amber" : "mint"}
                  className="mt-1"
                />
              </div>
              <p className="hidden text-right text-[10px] tnum text-fog-dim sm:block">
                {medicine.reorderLevel}
              </p>
              <div className="flex justify-end">
                <StatusPill status={status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExpiryPanel() {
  return (
    <div className="bg-[#050d0a] p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Expiry</p>
          <p className="mt-1 text-[13px] font-bold text-bone">Value at risk · this quarter</p>
        </div>
        <span className="rounded-full bg-rose/10 px-2 py-0.5 text-[9px] font-bold text-rose-soft">
          ₦296,600
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "0–30 days", value: "₦296.6k", tone: "text-rose-soft", border: "border-rose/20" },
          { label: "31–60 days", value: "₦107.8k", tone: "text-amber-soft", border: "border-amber/20" },
          { label: "61–90 days", value: "₦189.4k", tone: "text-mint-300", border: "border-mint-500/20" },
        ].map((bucket) => (
          <div key={bucket.label} className={cn("rounded-lg border bg-white/[0.02] p-2.5", bucket.border)}>
            <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">{bucket.label}</p>
            <p className={cn("mt-1 text-[13px] font-bold tnum", bucket.tone)}>{bucket.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-white/[0.06]">
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <span className="text-[8.5px] uppercase tracking-wide text-fog-faint">
            FEFO queue · earliest first
          </span>
          <span className="flex items-center gap-1 text-[8.5px] text-mint-300">
            <Sparkles className="size-2.5" aria-hidden />
            auto-ranked
          </span>
        </div>
        {expiringBatches.slice(0, 4).map((batch, index) => {
          const days = daysUntil(batch.expiry);
          return (
            <div
              key={batch.id}
              className="flex items-center gap-2.5 border-b border-white/[0.04] px-3 py-2.5 last:border-0"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-[9px] font-bold text-fog-dim">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10.5px] font-semibold text-bone">
                  {batch.medicine} · {batch.strength}
                </p>
                <p className="text-[9px] text-fog-faint">
                  {batch.batchNo} · {batch.qty} units · {batch.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold tnum text-bone">{shortDate(batch.expiry)}</p>
                <p
                  className={cn(
                    "text-[9px]",
                    days <= 30 ? "text-rose-soft" : "text-amber-soft",
                  )}
                >
                  {days} days left
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScriptsPanel() {
  return (
    <div className="bg-[#050d0a] p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Prescriptions</p>
          <p className="mt-1 text-[13px] font-bold text-bone">Today&apos;s queue · 8 scripts</p>
        </div>
        <div className="flex gap-1">
          {["All", "Mine", "HMO"].map((filter, index) => (
            <span
              key={filter}
              className={cn(
                "rounded-md px-2 py-1 text-[9px] font-semibold",
                index === 0 ? "bg-white/[0.08] text-bone" : "text-fog-faint",
              )}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        {prescriptions.slice(0, 5).map((script) => (
          <div
            key={script.id}
            className="flex items-start gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] p-2.5"
          >
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-mint-500/10 text-[8.5px] font-bold text-mint-300">
              {script.patient
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-[10.5px] font-semibold text-bone">{script.patient}</p>
                <span className="shrink-0 text-[8.5px] text-fog-faint">{script.received}</span>
              </div>
              <p className="truncate text-[9px] text-fog-faint">
                {script.items.join(" · ")}
              </p>
              {script.flag ? (
                <p className="mt-1 inline-flex items-center gap-1 rounded bg-amber/10 px-1.5 py-0.5 text-[8px] font-semibold text-amber-soft">
                  {script.flag}
                </p>
              ) : null}
            </div>
            <StatusPill status={script.status} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-mint-500/15 bg-mint-500/[0.05] px-3 py-2">
        <p className="text-[9.5px] text-mint-200">
          2 scripts worth {naira(18400)} are waiting on stock confirmation.
        </p>
        <span className="text-[9px] font-bold text-mint-300">Review</span>
      </div>
    </div>
  );
}
