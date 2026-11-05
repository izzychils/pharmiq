import {
  ArrowRight,
  Barcode,
  Bell,
  Boxes,
  Building2,
  CalendarClock,
  ClipboardCheck,
  FileSearch,
  Lock,
  PackageCheck,
  ScanLine,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { BarChart } from "@/components/dashboard/charts";
import { Badge, IconTile, SectionHeading } from "@/components/ui";

const NUMBERS = [
  {
    value: "100%",
    label: "batch traceability",
    note: "Every pack links to a batch, supplier, receipt date and shelf.",
  },
  {
    value: "90",
    label: "day expiry horizon",
    note: "Thirty, sixty and ninety-day windows, valued at cost.",
  },
  {
    value: "3",
    label: "branches in one ledger",
    note: "Stock moves between branches without a spreadsheet.",
  },
];

const FEATURES = [
  {
    icon: CalendarClock,
    title: "Expiry command centre",
    copy: "Batches grouped by urgency, priced at cost, and ranked by branch. The write-off becomes a decision instead of a surprise.",
    span: "lg:col-span-2",
  },
  {
    icon: ScanLine,
    title: "FEFO by default",
    copy: "The earliest-expiring valid batch is always offered first at the counter.",
  },
  {
    icon: TrendingUp,
    title: "Reorder intelligence",
    copy: "Suggested quantities from dispensing velocity, cover days and supplier lead time.",
  },
  {
    icon: ClipboardCheck,
    title: "Dispensing workflow",
    copy: "Intake, verification, dispensing and handover, each step signed and timed.",
  },
  {
    icon: Bell,
    title: "Alerts that respect you",
    copy: "One digest, not forty pings. Low stock, expiring batches and recalls in a single list.",
  },
  {
    icon: Building2,
    title: "Multi-branch view",
    copy: "See stock, cover and expiry across every branch — then move what is needed.",
  },
  {
    icon: Barcode,
    title: "Barcode intake",
    copy: "Scan a pack to add a batch. Batch number, expiry and pack size land in the right fields.",
  },
  {
    icon: FileSearch,
    title: "Audit trail",
    copy: "Who dispensed what, when, and which batch left the shelf. Exportable for inspections.",
  },
];

export function Capabilities() {
  return (
    <>
      {/* -------------------------------------------------- product numbers */}
      <section id="trust" className="relative border-y border-white/[0.06] bg-black/20">
        <div className="mx-auto grid w-full max-w-[1200px] gap-px px-5 sm:px-8 md:grid-cols-3">
          {NUMBERS.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 70}
              className="px-0 py-10 md:px-8 md:py-12"
            >
              <p className="text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.05em] text-bone">
                {item.value}
                <span className="text-mint-400">.</span>
              </p>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-mint-300/80">
                {item.label}
              </p>
              <p className="mt-2 max-w-[16rem] text-[12.5px] leading-relaxed text-fog-dim">
                {item.note}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- feature grid */}
      <section id="features" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                Built around the way a pharmacy
                <br className="hidden sm:block" /> actually <span className="display-italic text-mint-300">works</span>
              </>
            }
            subtitle="Not a generic stock system with a pharmacy label. Every screen starts from a batch, an expiry date and a patient waiting at the counter."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={(index % 4) * 50}
              className={feature.span ?? ""}
            >
              <GlassCard
                className="group h-full p-5 transition-colors duration-300 hover:border-mint-500/20 hover:bg-white/[0.05]"
                glow={feature.title === "Expiry command centre"}
              >
                <IconTile tone={feature.title === "Expiry command centre" ? "amber" : "mint"}>
                  <feature.icon className="size-4.5" aria-hidden />
                </IconTile>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-bone">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-fog-dim">{feature.copy}</p>

                {feature.title === "Expiry command centre" ? (
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {[
                      { range: "0–30 days", value: "₦296.6k", width: 92, tone: "bg-rose" },
                      { range: "31–60 days", value: "₦107.8k", width: 54, tone: "bg-amber" },
                      { range: "61–90 days", value: "₦189.4k", width: 36, tone: "bg-mint-500" },
                    ].map((bucket) => (
                      <div key={bucket.range} className="rounded-lg border border-white/[0.06] bg-black/25 p-2.5">
                        <p className="text-[9px] uppercase tracking-wide text-fog-faint">
                          {bucket.range}
                        </p>
                        <p className="mt-1 text-[12px] font-bold tnum text-bone">{bucket.value}</p>
                        <span className="mt-2 block h-1 rounded-full bg-white/[0.07]">
                          <span
                            className={`block h-full rounded-full ${bucket.tone}`}
                            style={{ width: `${bucket.width}%` }}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {feature.title === "Reorder intelligence" ? (
                  <div className="mt-5">
                    <BarChart
                      height={58}
                      data={[
                        { label: "M", value: 34 },
                        { label: "T", value: 41 },
                        { label: "W", value: 28 },
                        { label: "T", value: 52 },
                        { label: "F", value: 61 },
                        { label: "S", value: 74 },
                        { label: "S", value: 39 },
                      ]}
                    />
                    <p className="mt-2 text-[10px] text-fog-faint">
                      60 packs suggested · 12 days cover
                    </p>
                  </div>
                ) : null}

                {feature.title === "FEFO by default" ? (
                  <div className="mt-5 space-y-1">
                    {[
                      { rank: "1", label: "EXP 18 Nov", active: true },
                      { rank: "2", label: "EXP 02 Dec", active: false },
                      { rank: "3", label: "EXP 19 Jan", active: false },
                    ].map((row) => (
                      <div
                        key={row.rank}
                        className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-[9.5px] ${
                          row.active
                            ? "border-mint-500/30 bg-mint-500/10 text-mint-200"
                            : "border-white/[0.06] bg-white/[0.02] text-fog-dim"
                        }`}
                      >
                        <span className="font-bold">{row.rank}</span>
                        {row.label}
                        {row.active ? <span className="ml-auto text-[8px]">pick this</span> : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60} className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard className="flex items-start gap-4 p-5">
              <IconTile tone="neutral">
                <Boxes className="size-4.5" aria-hidden />
              </IconTile>
              <div>
                <h3 className="text-[14px] font-semibold text-bone">Transfers without guesswork</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-fog-dim">
                  Move stock to the branch that needs it — with the batch and expiry intact.
                </p>
              </div>
            </GlassCard>
            <GlassCard className="flex items-start gap-4 p-5">
              <IconTile tone="neutral">
                <Lock className="size-4.5" aria-hidden />
              </IconTile>
              <div>
                <h3 className="text-[14px] font-semibold text-bone">Roles that match the pharmacy</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-fog-dim">
                  Owner, superintendent, locum and counter staff each see what they should.
                </p>
              </div>
            </GlassCard>
          </div>
        </Reveal>

        <Reveal delay={40} className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[12px] text-fog-dim">
            <PackageCheck className="size-4 text-mint-500" aria-hidden />
            Every capability works out of the box on the 14-day trial.
          </p>
          <a
            href="/dashboard"
            className="inline-flex min-h-10 items-center gap-2 text-[13px] font-semibold text-mint-300 hover:text-mint-200"
          >
            Walk through the workspace
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </section>
    </>
  );
}

// Kept local: the expiry badge only appears in this section's copy.
export function ExpiryBadge() {
  return <Badge tone="amber">30-day window</Badge>;
}
