"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ArrowRight, Check, ClipboardList, MessageSquare } from "lucide-react";
import { StatusPill } from "@/components/dashboard/kpi";
import { prescriptions, type Prescription } from "@/lib/data";
import { cn, initials } from "@/lib/utils";

const STATUSES = [
  { id: "all", label: "All scripts" },
  { id: "awaiting", label: "Awaiting" },
  { id: "verifying", label: "Verifying" },
  { id: "ready", label: "Ready" },
  { id: "collected", label: "Collected" },
] as const;

type StatusFilter = (typeof STATUSES)[number]["id"];

export function RxBoard() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selectedId, setSelectedId] = useState(prescriptions[0].id);
  const [dispensed, setDispensed] = useState<string[]>([]);

  const rows = useMemo(
    () => prescriptions.filter((script) => filter === "all" || script.status === filter),
    [filter],
  );

  const selected = prescriptions.find((script) => script.id === selectedId) ?? prescriptions[0];
  const isDispensed = dispensed.includes(selected.id);

  return (
    <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex flex-wrap items-center gap-1 border-b border-white/[0.06] px-3 py-2.5">
          {STATUSES.map((status) => (
            <button
              key={status.id}
              type="button"
              onClick={() => setFilter(status.id)}
              aria-pressed={filter === status.id}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[10.5px] font-semibold transition-colors",
                filter === status.id
                  ? "bg-mint-500/15 text-mint-200"
                  : "text-fog-faint hover:text-fog",
              )}
            >
              {status.label}
            </button>
          ))}
          <span className="ml-auto text-[9.5px] text-fog-faint">{rows.length} shown</span>
        </div>

        <ul className="divide-y divide-white/[0.045]">
          {rows.map((script) => (
            <li key={script.id}>
              <button
                type="button"
                onClick={() => setSelectedId(script.id)}
                className={cn(
                  "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                  selected.id === script.id ? "bg-mint-500/[0.06]" : "hover:bg-white/[0.02]",
                )}
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[10px] font-bold text-fog">
                  {initials(script.patient)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[11.5px] font-semibold text-bone">
                      {script.patient}
                    </span>
                    <span className="shrink-0 text-[9px] text-fog-faint">{script.received}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-[9.5px] text-fog-faint">
                    {script.id} · {script.prescriber} · {script.channel}
                  </span>
                  <span className="mt-1 block truncate text-[10px] text-fog">
                    {script.items.join(" · ")}
                  </span>
                  {script.flag ? (
                    <span className="mt-1 inline-flex items-center gap-1 rounded bg-amber/10 px-1.5 py-0.5 text-[8.5px] font-semibold text-amber-soft">
                      <AlertCircle className="size-2.5" aria-hidden />
                      {script.flag}
                    </span>
                  ) : null}
                </span>
                <StatusPill status={script.status} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                {selected.id}
              </p>
              <p className="mt-1 text-[15px] font-semibold text-bone">{selected.patient}</p>
              <p className="text-[10px] text-fog-faint">
                {selected.age} years · {selected.insurance}
              </p>
            </div>
            <StatusPill status={selected.status} />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Detail label="Prescriber" value={selected.prescriber} />
            <Detail label="Facility" value={selected.facility} />
            <Detail label="Channel" value={selected.channel} />
            <Detail label="Received" value={selected.received} />
          </div>

          <div className="mt-3 rounded-xl border border-white/[0.07] bg-black/20 p-3">
            <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-fog-faint">
              <ClipboardList className="size-3" aria-hidden />
              Items on this script
            </p>
            <ul className="mt-2 space-y-1.5">
              {selected.items.map((item) => (
                <li key={item} className="flex items-center justify-between gap-2 text-[10.5px]">
                  <span className="min-w-0 truncate text-bone/85">{item}</span>
                  <span className="shrink-0 rounded bg-mint-500/10 px-1.5 py-0.5 text-[8px] font-bold text-mint-300">
                    FEFO
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {selected.flag ? (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber/20 bg-amber/[0.06] p-2.5">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-amber-soft" aria-hidden />
              <p className="text-[9.5px] leading-relaxed text-amber-soft">{selected.flag}</p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setDispensed((current) => [...current, selected.id])}
            disabled={isDispensed || selected.status === "collected"}
            className={cn(
              "mt-3 flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg text-[11px] font-bold transition-colors",
              isDispensed || selected.status === "collected"
                ? "border border-white/[0.08] bg-white/[0.03] text-fog-faint"
                : "bg-mint-500 text-ink-950 hover:bg-mint-400",
            )}
          >
            {isDispensed || selected.status === "collected" ? (
              <>
                <Check className="size-3.5" aria-hidden />
                Dispensed
              </>
            ) : (
              <>
                Confirm dispensing
                <ArrowRight className="size-3.5" aria-hidden />
              </>
            )}
          </button>

          <p className="mt-2 text-center text-[8.5px] text-fog-faint">
            Demo only. No stock is moved by this button.
          </p>
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-bone">
            <MessageSquare className="size-3.5 text-mint-300" aria-hidden />
            Counselling note
          </p>
          <p className="mt-1.5 text-[10px] leading-relaxed text-fog-dim">
            Confirm the patient understands the dosing schedule and finish the full course.
            For antibiotics, record any reported allergy before handover.
          </p>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
      <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">{label}</p>
      <p className="mt-0.5 truncate text-[10px] font-medium text-bone">{value}</p>
    </div>
  );
}

export type { Prescription };
