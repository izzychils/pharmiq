import { Plus } from "lucide-react";
import { RxBoard } from "@/features/prescriptions/components/rx-board";
import { PageHeader } from "@/components/dashboard/page-parts";
import { prescriptionFlow, prescriptions } from "@/lib/data";

export const metadata = { title: "Prescriptions" };

export default function PrescriptionsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Dispensing"
        title="Prescriptions"
        description="One queue for walk-ins, WhatsApp scripts and referrals. Every status change is attributed and timed."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[11.5px] font-bold text-ink-950 hover:bg-mint-400"
          >
            <Plus className="size-3.5" aria-hidden />
            New script
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {prescriptionFlow.map((stage) => (
          <div key={stage.key} className="glass rounded-xl px-4 py-3">
            <p className="text-[9.5px] uppercase tracking-[0.1em] text-fog-faint">
              {stage.label}
            </p>
            <p className="mt-1.5 text-[20px] font-bold tracking-tight tnum text-bone">
              {stage.count}
            </p>
            <p className="mt-0.5 text-[9px] text-fog-faint">today</p>
          </div>
        ))}
      </div>

      <RxBoard />

      <div className="glass rounded-2xl p-4">
        <p className="text-[11px] font-semibold text-bone">Audit trail preview</p>
        <div className="mt-2 space-y-1.5">
          {prescriptions.slice(0, 4).map((script, index) => (
            <p key={script.id} className="text-[10px] text-fog-dim">
              <span className="font-mono text-[9px] text-fog-faint">
                {`09:${42 - index * 7}`}
              </span>{" "}
              · {script.id} · status set to{" "}
              <span className="text-bone">{script.status}</span> by Adaeze Nwankwo
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
