import { ArrowRight, Boxes, Camera, Quote, Star, Upload, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { IconTile, SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/data";

const STEPS = [
  {
    icon: Upload,
    step: "01",
    title: "Bring your stock in",
    copy: "Upload a CSV or scan your shelves. Pharmiq maps medicines, strengths and batches, and flags anything ambiguous for review.",
  },
  {
    icon: Boxes,
    step: "02",
    title: "Set your thresholds",
    copy: "Reorder points, branches, suppliers and FEFO rules. Sensible defaults are already in place for a typical community pharmacy.",
  },
  {
    icon: Users,
    step: "03",
    title: "Put the counter on it",
    copy: "Staff dispense from the queue. Every pick updates the batch, the expiry queue and the reorder forecast at once.",
  },
  {
    icon: Camera,
    step: "04",
    title: "Watch the losses fall",
    copy: "Expiry risk, stock-outs and cover days become a Monday morning list instead of a month-end surprise.",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative border-y border-white/[0.06] bg-black/20">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Getting started"
            title={
              <>
                Live in a day, not a
                <br className="hidden sm:block" /> <span className="display-italic">quarter</span>.
              </>
            }
            subtitle="No consultant, no six-week migration. The first branch is usually counting real stock before lunch."
          />
        </Reveal>

        <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(61,220,151,0.35),rgba(61,220,151,0.35),transparent)] lg:block"
          />
          {STEPS.map((step, index) => (
            <Reveal key={step.step} delay={index * 80} className="relative">
              <div className="relative z-10 flex size-[52px] items-center justify-center rounded-2xl border border-mint-500/20 bg-[#07120e]">
                <step.icon className="size-5 text-mint-400" aria-hidden />
              </div>
              <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-mint-300/60">
                {step.step}
              </p>
              <h3 className="mt-1.5 text-[15px] font-semibold text-bone">{step.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-fog-dim">{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="stories" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mono-label !text-mint-300/80">From the counter</p>
          <h2 className="mt-5 max-w-lg text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-bone">
            Pharmacists are the
            <br />
            hardest <span className="display-italic text-mint-300">reviewers</span>.
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-3 fill-mint-400 text-mint-400" aria-hidden />
            ))}
          </div>
          <span className="text-[11.5px] text-fog">4.9 average from 62 pharmacies</span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 70}>
            <GlassCard className="flex h-full flex-col p-6">
              <Quote className="size-5 text-mint-500/40" aria-hidden />
              <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-bone/85">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                <span className="flex size-9 items-center justify-center rounded-full border border-mint-500/20 bg-mint-500/10 text-[11px] font-bold text-mint-300">
                  {testimonial.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-bone">{testimonial.name}</p>
                  <p className="truncate text-[10.5px] text-fog-faint">{testimonial.role}</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={60} className="mt-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[12.5px] leading-relaxed text-fog-dim">
            <span className="font-semibold text-bone">A note on honesty:</span> quotes
            above are representative of pilot feedback. We publish named case studies only
            with the pharmacy&apos;s written permission.
          </p>
          <a
            href="#pricing"
            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 text-[12px] font-semibold text-mint-300 hover:text-mint-200"
          >
            Read the pilot notes
            <ArrowRight className="size-3" aria-hidden />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function LogoBand() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-10 sm:px-8">
      {["Cedar Pharmacy", "Wellspring Chemists", "Atlas Care", "Bloom Health Mart"].map(
        (name) => (
          <span key={name} className="text-[12px] font-semibold tracking-tight text-fog-faint">
            {name}
          </span>
        ),
      )}
    </div>
  );
}

export { IconTile };
