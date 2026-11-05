"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, Minus, Plus, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn, naira } from "@/lib/utils";
import { faqs, pricing } from "@/lib/data";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mono-label !text-mint-300/80">Pricing</p>
        <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-bone">
          Priced per branch.
          <br />
          <span className="display-italic text-fog">Paid back in one batch.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-fog">
          Every plan includes the full inventory, expiry and FEFO engine. No per-seat
          pricing, no charge for pharmacy assistants at the counter.
        </p>

        <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={cn(
              "rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors",
              !annual ? "bg-white/[0.09] text-bone" : "text-fog-dim hover:text-fog",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors",
              annual ? "bg-white/[0.09] text-bone" : "text-fog-dim hover:text-fog",
            )}
          >
            Annual
            <span className="rounded-full bg-mint-500/15 px-1.5 py-0.5 text-[9px] font-bold text-mint-300">
              −17%
            </span>
          </button>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {pricing.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 70} className="h-full">
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-6",
                plan.featured
                  ? "border-mint-500/35 bg-[linear-gradient(180deg,rgba(61,220,151,0.1),rgba(61,220,151,0.02))] shadow-[0_40px_100px_-50px_rgba(61,220,151,0.35)]"
                  : "border-white/[0.08] bg-white/[0.02]",
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-mint-500 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-ink-950">
                  Most chosen
                </span>
              ) : null}

              <div className="flex items-baseline justify-between">
                <h3 className="text-[15px] font-semibold text-bone">{plan.name}</h3>
                {plan.price > 0 ? (
                  <span className="text-[10px] text-fog-faint">
                    per branch / month
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 min-h-[40px] text-[12px] leading-relaxed text-fog-dim">
                {plan.description}
              </p>

              <div className="mt-5 flex items-baseline gap-1.5">
                {plan.price > 0 ? (
                  <>
                    <span className="text-[32px] font-semibold tracking-tight tnum text-bone">
                      {naira(annual ? plan.annual : plan.price)}
                    </span>
                    <span className="text-[11px] text-fog-faint">
                      {annual ? "/mo, billed yearly" : "/month"}
                    </span>
                  </>
                ) : (
                  <span className="text-[28px] font-semibold tracking-tight text-bone">
                    Let&apos;s scope it
                  </span>
                )}
              </div>

              <a
                href={plan.featured ? "/sign-up" : plan.price > 0 ? "/sign-up" : "mailto:hello@pharmiq.online"}
                className={cn(
                  "mt-6 flex min-h-11 items-center justify-center gap-2 rounded-full text-[12.5px] font-bold transition-all",
                  plan.featured
                    ? "bg-mint-500 text-ink-950 hover:bg-mint-400"
                    : "border border-white/12 bg-white/[0.04] text-bone hover:border-white/25",
                )}
              >
                {plan.cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </a>

              <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[12px] text-bone/80">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-mint-400" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={40} className="mt-8 flex items-center justify-center gap-2 text-[11.5px] text-fog-faint">
        <ShieldCheck className="size-3.5 text-mint-500/70" aria-hidden />
        14-day trial on Counter and Group. Cancel before day 14 and pay nothing.
      </Reveal>
    </section>
  );
}

export function Faq() {
  const id = useId();

  return (
    <section id="faq" className="relative border-t border-white/[0.06]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="mono-label !text-mint-300/80">Questions</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-bone">
            The things
            <br />
            pharmacists <span className="display-italic text-mint-300">ask</span>.
          </h2>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-fog-dim">
            Still unsure? Write to{" "}
            <a href="mailto:hello@pharmiq.online" className="text-mint-300 underline decoration-mint-500/30 underline-offset-4">
              hello@pharmiq.online
            </a>{" "}
            and a pharmacist on our team will reply.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {faqs.map((faq, index) => (
              <details key={faq.q} className="group" open={index === 0}>
                <summary className="flex min-h-[64px] cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-[13.5px] font-semibold leading-snug text-bone">
                    {faq.q}
                  </span>
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-fog-dim transition-colors group-open:border-mint-500/30 group-open:text-mint-300">
                    <Plus className="size-3 group-open:hidden" aria-hidden />
                    <Minus className="hidden size-3 group-open:block" aria-hidden />
                  </span>
                </summary>
                <p
                  id={`${id}-${index}`}
                  className="max-w-2xl pb-5 pr-10 text-[12.5px] leading-relaxed text-fog"
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
