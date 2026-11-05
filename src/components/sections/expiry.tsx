import {
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  CalendarClock,
  Check,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge, ButtonLink, IconTile, SectionHeading } from "@/components/ui";
import { GlassCard } from "@/components/ui/glass-card";
import { Meter } from "@/components/ui";
import { expiryBuckets, valueAtRisk } from "@/lib/data";
import { cn, daysUntil, naira, shortDate } from "@/lib/utils";

const TONES = {
  rose: {
    text: "text-rose-soft",
    border: "border-rose/20",
    bg: "bg-rose/[0.07]",
    bar: "bg-rose",
  },
  amber: {
    text: "text-amber-soft",
    border: "border-amber/20",
    bg: "bg-amber/[0.07]",
    bar: "bg-amber",
  },
  mint: {
    text: "text-mint-300",
    border: "border-mint-500/20",
    bg: "bg-mint-500/[0.07]",
    bar: "bg-mint-500",
  },
} as const;

export function ExpiryControl() {
  return (
    <>
      {/* ------------------------------------------------------ expiry section */}
      <section id="expiry" className="relative overflow-hidden border-y border-white/[0.06] bg-[#050c09]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/3 size-[28rem] rounded-full bg-rose/[0.06] blur-[100px]"
        />
        <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <Badge tone="amber">
              <span className="size-1.5 rounded-full bg-amber" />
              Expiry command centre
            </Badge>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-bone">
              Expiry is not a date
              <br />
              on a pack. It is <span className="display-italic text-amber-soft">money</span>.
            </h2>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-fog">
              A short-dated batch is a write-off waiting to be discovered. Pharmiq prices
              every one of them at cost, groups them by the action window, and tells you
              which branch should act first.
            </p>

            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-[clamp(2rem,4vw,2.8rem)] font-semibold tracking-tight tnum text-bone">
                {naira(valueAtRisk)}
              </span>
              <span className="text-[12px] text-fog-dim">value at risk in 60 days</span>
            </div>

            <ul className="mt-7 space-y-3">
              {[
                "Return window tracked per supplier, per batch.",
                "Transfer suggestions to branches where the batch will actually move.",
                "Discount planner that protects margin instead of guessing.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-bone/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-mint-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <ButtonLink href="/dashboard/expiry" variant="secondary" className="mt-8">
              Open expiry control
              <ArrowRight className="size-3.5" aria-hidden />
            </ButtonLink>
          </Reveal>

          <Reveal delay={100}>
            <GlassCard intensity="strong" className="overflow-hidden p-0" hairline>
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">
                    All branches · live
                  </p>
                  <p className="mt-1 text-[14px] font-semibold text-bone">Expiry risk by window</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/25 bg-amber/10 px-2.5 py-1 text-[10px] font-semibold text-amber-soft">
                  <AlertTriangle className="size-3" aria-hidden />
                  Action needed
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 p-5 pb-3">
                {expiryBuckets.map((bucket) => {
                  const tone = TONES[bucket.tone];
                  return (
                    <div
                      key={bucket.id}
                      className={cn("rounded-xl border p-3", tone.border, tone.bg)}
                    >
                      <p className="text-[9px] uppercase tracking-wide text-fog-dim">
                        {bucket.label}
                      </p>
                      <p className={cn("mt-1.5 text-[16px] font-bold tnum", tone.text)}>
                        {naira(bucket.value)}
                      </p>
                      <p className="mt-0.5 text-[9.5px] text-fog-faint">{bucket.units} units</p>
                      <Meter
                        value={bucket.units}
                        max={expiryBuckets[0].units * 1.4}
                        tone={bucket.tone === "rose" ? "rose" : bucket.tone === "amber" ? "amber" : "mint"}
                        className="mt-2.5"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="px-5 pb-5">
                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <div className="grid grid-cols-[1.5fr_0.8fr_0.6fr] gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[8.5px] uppercase tracking-wide text-fog-faint">
                    <span>Batch</span>
                    <span>Expiry</span>
                    <span className="text-right">At cost</span>
                  </div>
                  {expiryBuckets[0].batches.map((batch) => (
                    <div
                      key={batch.id}
                      className="grid grid-cols-[1.5fr_0.8fr_0.6fr] items-center gap-2 border-b border-white/[0.04] px-3 py-2.5 last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-bone">
                          {batch.medicine}
                        </p>
                        <p className="text-[9px] text-fog-faint">
                          {batch.batchNo} · {batch.qty} packs · {batch.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] tnum text-bone">{shortDate(batch.expiry)}</p>
                        <p className="text-[9px] text-rose-soft">{daysUntil(batch.expiry)} days</p>
                      </div>
                      <p className="text-right text-[10px] font-semibold tnum text-bone">
                        {naira(batch.qty * batch.cost)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-mint-500/15 bg-mint-500/[0.06] p-3">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-mint-300" aria-hidden />
                  <p className="text-[10.5px] leading-relaxed text-mint-200/90">
                    <span className="font-semibold">Suggested action:</span> move AMX-4471
                    (64 packs, 18 Nov) to the front of the FEFO queue and raise a return
                    request for anything not dispensed by 12 Nov.
                  </p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- FEFO section */}
      <section id="fefo" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <GlassCard intensity="strong" className="p-5 sm:p-6" hairline>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <IconTile tone="mint" className="size-9">
                    <ScanLine className="size-4" aria-hidden />
                  </IconTile>
                  <div>
                    <p className="text-[12px] font-semibold text-bone">Dispense · Amoxicillin 500 mg</p>
                    <p className="text-[10px] text-fog-faint">RX-20931 · Adaeze Nwosu</p>
                  </div>
                </div>
                <span className="rounded-full bg-mint-500/10 px-2 py-0.5 text-[9px] font-bold text-mint-300">
                  FEFO on
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {[
                  {
                    rank: 1,
                    batch: "AMX-4471",
                    expiry: "18 Nov 2026",
                    qty: 64,
                    note: "Earliest valid batch",
                    active: true,
                  },
                  {
                    rank: 2,
                    batch: "AMX-4488",
                    expiry: "19 Jan 2027",
                    qty: 64,
                    note: "Next in queue",
                    active: false,
                  },
                  {
                    rank: 3,
                    batch: "AMX-4510",
                    expiry: "29 Oct 2026",
                    qty: 0,
                    note: "Expired · quarantined",
                    active: false,
                  },
                ].map((row) => (
                  <div
                    key={row.batch}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors",
                      row.active
                        ? "border-mint-500/30 bg-mint-500/[0.08]"
                        : "border-white/[0.06] bg-white/[0.02]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold",
                        row.active
                          ? "bg-mint-500 text-ink-950"
                          : "bg-white/[0.05] text-fog-dim",
                      )}
                    >
                      {row.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11.5px] font-semibold text-bone">{row.batch}</p>
                      <p className="text-[9.5px] text-fog-faint">
                        Exp {row.expiry} · {row.qty} packs
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-[9px] font-semibold",
                        row.active ? "text-mint-300" : "text-fog-faint",
                      )}
                    >
                      {row.note}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-black/30 px-3.5 py-3">
                <span className="text-[10px] text-fog-dim">
                  Picking AMX-4471 saves{" "}
                  <span className="font-semibold text-mint-300">₦188,800</span> from the
                  write-off queue.
                </span>
                <span className="rounded-lg bg-mint-500 px-3 py-1.5 text-[10px] font-bold text-ink-950">
                  Confirm pick
                </span>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={80} className="order-1 lg:order-2">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-mint-300/80">
              <ArrowRightLeft className="size-3.5" aria-hidden />
              FEFO dispensing
            </div>
            <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-bone">
              First expired,
              <br />
              first out — <span className="display-italic text-mint-300">enforced</span>.
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-fog">
              Most stock loss is not a forecasting problem. It is a picking problem: the
              newest pack goes out because it is easiest to reach. Pharmiq ranks batches
              by expiry at the moment of dispensing.
            </p>
            <ul className="mt-6 space-y-3 text-[13px] text-bone/80">
              {[
                "Earliest valid expiry is selected automatically.",
                "Expired batches are quarantined and cannot be dispensed.",
                "Overrides require a reason and are written to the audit trail.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-mint-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
