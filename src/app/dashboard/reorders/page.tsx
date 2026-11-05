import { ReorderBoard } from "@/features/reorders/components/reorder-board";
import { PageHeader } from "@/components/dashboard/page-parts";
import { alerts } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata = { title: "Reorders" };

export default function ReordersPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Procurement"
        title="Reorders"
        description="Purchase suggestions from dispensing velocity, cover days and supplier lead time. Nothing is ordered without your approval."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Below reorder", value: "6 items", tone: "text-amber-soft" },
          { label: "Stock-outs", value: "2 items", tone: "text-rose-soft" },
          { label: "Draft value", value: "₦412,800", tone: "text-bone" },
          { label: "Average lead time", value: "4.0 days", tone: "text-bone" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl px-4 py-3">
            <p className="text-[9.5px] uppercase tracking-[0.1em] text-fog-faint">{stat.label}</p>
            <p className={cn("mt-1.5 text-[18px] font-bold tracking-tight tnum", stat.tone)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <ReorderBoard />

      <div className="glass rounded-2xl p-4">
        <p className="text-[11px] font-semibold text-bone">Other alerts in the queue</p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {alerts
            .filter((alert) => alert.type === "expiring" || alert.type === "recall")
            .map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
              >
                <span
                  className={cn(
                    "mt-1 size-1.5 shrink-0 rounded-full",
                    alert.severity === "high" ? "bg-rose" : "bg-amber",
                  )}
                />
                <div>
                  <p className="text-[10px] font-semibold text-bone">
                    {alert.medicine} · {alert.strength}
                  </p>
                  <p className="text-[9.5px] text-fog-faint">{alert.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
