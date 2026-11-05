import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function Cta() {
  return (
    <section id="cta" className="relative mx-auto w-full max-w-[1200px] px-5 pb-8 pt-4 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-mint-500/20 bg-[linear-gradient(160deg,rgba(61,220,151,0.13),rgba(6,15,12,0.6)_55%)] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-500/[0.13] blur-[100px]" />
            <div className="grid-tile absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_50%_20%,black,transparent_70%)]" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-500/25 bg-mint-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-mint-300">
              <Sparkles className="size-3" aria-hidden />
              Start today
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-bone">
              Put your shelves
              <br />
              on a <span className="display-italic text-mint-300">system</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-fog">
              Open the demo workspace and click around a real pharmacy. No signup, no sales
              call, no credit card.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mint-500 px-6 text-[14px] font-bold text-ink-950 shadow-[0_20px_50px_-16px_rgba(61,220,151,0.7)] transition-all hover:bg-mint-400 sm:w-auto"
              >
                Open the demo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-[14px] font-semibold text-bone transition-colors hover:border-white/30 sm:w-auto"
              >
                Create an account
              </Link>
            </div>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-fog-dim">
              {["Free 14-day trial", "Your data, exportable", "No implementation fee"].map(
                (item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <Check className="size-3 text-mint-500" aria-hidden />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
