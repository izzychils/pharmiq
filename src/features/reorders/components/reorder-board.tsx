"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileText, Send, Sparkles } from "lucide-react";
import { StatusPill } from "@/components/dashboard/kpi";
import { medicines } from "@/lib/data";
import { stockStatus, weeksOfCover } from "@/lib/inventory";
import { cn, naira } from "@/lib/utils";

type Row = {
  id: string;
  medicine: string;
  strength: string;
  supplier: string;
  onHand: number;
  cover: number;
  suggested: number;
  cost: number;
  status: "low" | "critical" | "out";
};

const SUPPLIERS: Record<string, string> = {
  "amox-500": "Emzor Distribution",
  "coartem-80": "Novartis Direct",
  "metformin-500": "Merck Distribution",
  salbutamol: "GSK Nigeria",
  "omeprazole-20": "Fidson Healthcare",
  "ceftriaxone-1g": "Roche Nigeria",
  "azithro-500": "Pfizer Nigeria",
  "insulin-glargine": "Sanofi Direct",
};

function buildRows(): Row[] {
  return medicines
    .filter((medicine) => stockStatus(medicine) !== "healthy")
    .map((medicine) => {
      const target = Math.ceil((medicine.dispensing30d / 4.3) * 6);
      const suggested = Math.max(medicine.reorderLevel, target - medicine.stock);
      return {
        id: medicine.id,
        medicine: medicine.name,
        strength: medicine.strength,
        supplier: SUPPLIERS[medicine.id] ?? "Preferred supplier",
        onHand: medicine.stock,
        cover: weeksOfCover(medicine),
        suggested,
        cost: suggested * medicine.cost,
        status: stockStatus(medicine) as "low" | "critical" | "out",
      };
    });
}

const INITIAL = buildRows();

export function ReorderBoard() {
  const [selected, setSelected] = useState<string[]>(
    INITIAL.filter((row) => row.status !== "low").map((row) => row.id),
  );
  const [drafted, setDrafted] = useState(false);

  const rows = INITIAL;
  const totals = useMemo(() => {
    const chosen = rows.filter((row) => selected.includes(row.id));
    return {
      count: chosen.length,
      units: chosen.reduce((sum, row) => sum + row.suggested, 0),
      value: chosen.reduce((sum, row) => sum + row.cost, 0),
    };
  }, [rows, selected]);

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );

  return (
    <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr]">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div>
            <p className="text-[11.5px] font-semibold text-bone">Suggested purchases</p>
            <p className="mt-0.5 text-[9.5px] text-fog-faint">
              Six weeks of cover at current velocity
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full border border-mint-500/20 bg-mint-500/10 px-2 py-0.5 text-[9px] font-semibold text-mint-300">
            <Sparkles className="size-2.5" aria-hidden />
            AI ranked
          </span>
        </div>

        <ul className="divide-y divide-white/[0.045]">
          {rows.map((row) => {
            const checked = selected.includes(row.id);
            return (
              <li key={row.id} className="flex items-start gap-3 px-4 py-3">
                <label className="mt-0.5 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded border border-white/15 bg-white/[0.03]">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(row.id)}
                    className="sr-only"
                    aria-label={`Include ${row.medicine} in purchase order`}
                  />
                  {checked ? <CheckCircle2 className="size-4 text-mint-400" aria-hidden /> : null}
                </label>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11.5px] font-semibold text-bone">
                      {row.medicine} {row.strength}
                    </p>
                    <StatusPill status={row.status} />
                  </div>
                  <p className="mt-0.5 text-[9.5px] text-fog-faint">
                    {row.onHand} on hand · {row.cover.toFixed(1)} weeks cover · {row.supplier}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-semibold tnum text-mint-300">+{row.suggested}</p>
                  <p className="text-[9px] text-fog-faint">{naira(row.cost)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-3">
        <div className="glass rounded-2xl p-4">
          <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">Draft order</p>
          <p className="mt-2 text-[26px] font-extrabold leading-none tracking-tight tnum text-bone">
            {naira(totals.value)}
          </p>
          <p className="mt-1 text-[10px] text-fog-dim">
            {totals.count} items · {totals.units} units
          </p>

          <div className="mt-3 space-y-1.5">
            {rows
              .filter((row) => selected.includes(row.id))
              .map((row) => (
                <div key={row.id} className="flex items-center justify-between gap-2 text-[10px]">
                  <span className="min-w-0 truncate text-fog">{row.medicine}</span>
                  <span className="shrink-0 tnum text-bone">{row.suggested}</span>
                </div>
              ))}
            {totals.count === 0 ? (
              <p className="text-[10px] text-fog-faint">Select at least one item to draft an order.</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setDrafted(true)}
            disabled={totals.count === 0}
            className={cn(
              "mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg text-[11px] font-bold transition-colors",
              drafted
                ? "border border-mint-500/25 bg-mint-500/10 text-mint-300"
                : "bg-mint-500 text-ink-950 hover:bg-mint-400 disabled:opacity-40",
            )}
          >
            {drafted ? (
              <>
                <CheckCircle2 className="size-3.5" aria-hidden />
                Draft saved · awaiting approval
              </>
            ) : (
              <>
                <FileText className="size-3.5" aria-hidden />
                Draft purchase order
              </>
            )}
          </button>

          <p className="mt-2 text-center text-[8.5px] text-fog-faint">
            Demo only. No order is sent to a supplier.
          </p>
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="text-[10.5px] font-semibold text-bone">Why these quantities</p>
          <p className="mt-1.5 text-[10px] leading-relaxed text-fog-dim">
            Pharmiq targets six weeks of cover: 30-day dispensing velocity, divided across
            the days in the month, minus stock on hand. Supplier lead time is added where it
            exceeds three days, so the shelf does not empty while the order travels.
          </p>
          <button
            type="button"
            className="mt-3 inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 text-[9.5px] font-semibold text-fog hover:text-bone"
          >
            <Send className="size-3" aria-hidden />
            Send to suppliers
          </button>
        </div>
      </div>
    </div>
  );
}
