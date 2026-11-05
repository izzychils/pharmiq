import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function KpiCard({
  label,
  value,
  detail,
  change,
  icon,
  tone = "mint",
  className,
}: {
  label: string;
  value: string;
  detail?: string;
  change?: number;
  icon?: ReactNode;
  tone?: "mint" | "amber" | "rose" | "neutral";
  className?: string;
}) {
  const tones = {
    mint: "text-mint-300 bg-mint-500/10 border-mint-500/20",
    amber: "text-amber-soft bg-amber/10 border-amber/20",
    rose: "text-rose-soft bg-rose/10 border-rose/20",
    neutral: "text-fog bg-white/[0.04] border-white/10",
  } as const;

  return (
    <div className={cn("glass rounded-2xl p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fog-dim">
          {label}
        </span>
        {icon ? (
          <span className={cn("flex size-7 items-center justify-center rounded-lg border", tones[tone])}>
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-[26px] font-extrabold leading-none tracking-tight tnum text-bone">
        {value}
      </p>
      <div className="mt-2.5 flex items-center gap-2 text-[11px]">
        {typeof change === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
              change >= 0 ? "bg-mint-500/10 text-mint-300" : "bg-rose/10 text-rose-soft",
            )}
          >
            {change >= 0 ? (
              <ArrowUpRight className="size-3" aria-hidden />
            ) : (
              <ArrowDownRight className="size-3" aria-hidden />
            )}
            {Math.abs(change).toFixed(1)}%
          </span>
        ) : null}
        {detail ? <span className="truncate text-fog-faint">{detail}</span> : null}
      </div>
    </div>
  );
}

export function StatusPill({
  status,
  className,
}: {
  status: "healthy" | "low" | "critical" | "out" | "expiring" | "awaiting" | "verifying" | "ready" | "collected";
  className?: string;
}) {
  const map = {
    healthy: { label: "Healthy", className: "border-mint-500/25 bg-mint-500/10 text-mint-300" },
    low: { label: "Low", className: "border-amber/25 bg-amber/10 text-amber-soft" },
    critical: { label: "Critical", className: "border-rose/25 bg-rose/10 text-rose-soft" },
    out: { label: "Out of stock", className: "border-rose/30 bg-rose/15 text-rose-soft" },
    expiring: { label: "Expiring", className: "border-amber/25 bg-amber/10 text-amber-soft" },
    awaiting: { label: "Awaiting", className: "border-white/12 bg-white/[0.04] text-fog" },
    verifying: { label: "Verifying", className: "border-amber/25 bg-amber/10 text-amber-soft" },
    ready: { label: "Ready", className: "border-mint-500/25 bg-mint-500/10 text-mint-300" },
    collected: { label: "Collected", className: "border-white/12 bg-white/[0.04] text-fog-dim" },
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10.5px] font-semibold",
        map[status].className,
        className,
      )}
    >
      <span className="size-1 rounded-full bg-current" />
      {map[status].label}
    </span>
  );
}
