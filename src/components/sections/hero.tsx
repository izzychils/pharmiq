import Link from "next/link";
import { ArrowRight, Check, Play, ShieldCheck, Sparkles } from "lucide-react";
import { ConsolePreview } from "@/components/dashboard/console-preview";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-10 sm:pt-16">
      {/* The horizon: a wide, low glow under the console, like light through a
          dispensary window. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora left-1/2 top-[-16rem] h-[34rem] w-[52rem] -translate-x-1/2 bg-mint-500/[0.16]" />
        <div
          className="aurora right-[-10rem] top-[6rem] h-[24rem] w-[24rem] bg-teal-500/[0.12]"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute left-1/2 top-[30rem] h-[26rem] w-[64rem] -translate-x-1/2 rounded-[50%] bg-mint-500/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 backdrop-blur">
              <span className="flex items-center gap-1.5 rounded-full bg-mint-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-mint-300">
                <Sparkles className="size-3" aria-hidden />
                New
              </span>
              <span className="text-[12px] text-fog">
                Clinical assistant with auditable sources
              </span>
              <ArrowRight className="size-3 text-fog-faint" aria-hidden />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[clamp(2.6rem,6.4vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-bone">
              Your pharmacy,
              <br />
              <span className="display-italic text-mint-300">finally</span> in order.
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-fog sm:text-[16.5px]">
              Pharmiq is the AI operating system for pharmacies. Track every batch, see
              expiry before it costs you, dispense FEFO by default — and ask your stock
              anything in plain language.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mint-500 px-6 text-[14px] font-bold text-ink-950 shadow-[0_20px_50px_-16px_rgba(61,220,151,0.7)] transition-all hover:bg-mint-400 sm:w-auto"
              >
                Open the demo workspace
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <a
                href="#platform"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-[14px] font-semibold text-bone backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.07] sm:w-auto"
              >
                <Play className="size-3.5 fill-current" aria-hidden />
                See it in action
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-fog-dim">
              {["14-day trial, no card", "Built with pharmacists", "Your data stays yours"].map(
                (item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <Check className="size-3 text-mint-500" aria-hidden />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>

        {/* product shot */}
        <Reveal delay={120} className="relative mt-14 sm:mt-16">
          <div
            aria-hidden
            className="absolute inset-x-8 -top-8 h-24 rounded-[50%] bg-mint-500/20 blur-3xl"
          />
          <div className="relative rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-1.5 shadow-[0_80px_160px_-70px_rgba(0,0,0,1)] sm:p-2">
            <ConsolePreview />
          </div>

          {/* floating cards */}
          <div className="absolute -left-2 top-[38%] hidden w-[15.5rem] animate-float lg:block">
            <div className="glass-strong rounded-xl p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-amber/25 bg-amber/10 text-amber-soft">
                  <ShieldCheck className="size-3.5" aria-hidden />
                </span>
                <div>
                  <p className="text-[10.5px] font-bold text-bone">Expiry flagged</p>
                  <p className="text-[9px] text-fog-dim">AMX-4471 · 13 days left</p>
                </div>
              </div>
              <p className="mt-2 rounded-lg bg-black/30 px-2 py-1.5 text-[9.5px] leading-relaxed text-fog">
                Pull 64 packs to the front of the FEFO queue at Ikeja City.
              </p>
            </div>
          </div>

          <div
            className="absolute -right-2 top-[58%] hidden w-[15rem] animate-float lg:block"
            style={{ animationDelay: "-3.2s" }}
          >
            <div className="glass-strong rounded-xl p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-mint-500/25 bg-mint-500/10 text-mint-300">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                <p className="text-[10.5px] font-bold text-bone">Assistant</p>
              </div>
              <p className="mt-2 text-[9.5px] leading-relaxed text-fog">
                “Reorder 40 vials of ceftriaxone — 44 dispensed in 30 days, 5-day lead
                time.”
              </p>
              <p className="mt-1.5 text-[8.5px] text-mint-300/80">Source-backed · 3 refs</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* trust strip */}
      <div className="relative mt-20 border-y border-white/[0.06] bg-black/20 py-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-5 sm:px-8 lg:flex-row lg:gap-10">
          <p className="shrink-0 text-center text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-fog-faint lg:text-left">
            Trusted behind the counter at
            <br className="hidden lg:block" /> independent pharmacies and groups
          </p>
          <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-10 pr-10">
              {[...Array(2)].map((_, pass) => (
                <div key={pass} className="flex items-center gap-10">
                  {[
                    "Cedar Pharmacy",
                    "Wellspring Chemists",
                    "Atlas Care",
                    "Bloom Health Mart",
                    "Northline Pharmacy",
                    "Meridian Drugs",
                  ].map((name) => (
                    <span
                      key={name}
                      className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-fog-dim/70"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
