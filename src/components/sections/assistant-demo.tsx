"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  BookOpen,
  Check,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { assistantAnswers, assistantPrompts } from "@/lib/data";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "assistant";
  body?: string[];
  sources?: string[];
  meta?: string;
  pending?: boolean;
};

const OPENING: Message = {
  id: 0,
  role: "assistant",
  body: [
    "Good morning. I can see all three branches, 1,284 SKUs and today's dispensing queue. Ask me about stock, expiry or a medicine — I will show you the source I used.",
  ],
  meta: "Pharmiq assistant · read-only access to your live stock",
};

export function AssistantDemo() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const node = threadRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const ask = (question: string) => {
    if (thinking) return;
    const trimmed = question.trim();
    if (!trimmed) return;

    setInput("");
    setMessages((current) => [
      ...current,
      { id: current.length, role: "user", body: [trimmed] },
    ]);
    setThinking(true);

    timerRef.current = setTimeout(() => {
      const answer =
        assistantAnswers[trimmed] ?? {
          body: [
            "I can only answer from this pharmacy's records and the clinical reference set. Try one of the suggested questions, or open the workspace to query live stock.",
          ],
          meta: "No reliable source matched · not answered",
        };

      setMessages((current) => [
        ...current,
        {
          id: current.length,
          role: "assistant",
          body: answer.body,
          sources: answer.sources,
          meta: answer.meta,
        },
      ]);
      setThinking(false);
    }, 950);
  };

  return (
    <section id="assistant" className="relative border-y border-white/[0.06] bg-[#050c09]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora left-[12%] top-[-6rem] h-[22rem] w-[26rem] bg-teal-500/[0.12]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-mint-300/80">
            <Sparkles className="size-3.5" aria-hidden />
            The assistant
          </div>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-bone">
            Ask your shelves
            <br />
            a <span className="display-italic text-mint-300">question</span>.
          </h2>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-fog">
            “What expires in 30 days?” “What should I reorder?” “Is this safe for a
            penicillin allergy?” The assistant answers from your live stock and a
            curated clinical reference set — and shows its working.
          </p>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            {[
              { icon: MessageSquare, label: "Plain language", note: "No query syntax" },
              { icon: BookOpen, label: "Cited answers", note: "Sources on every claim" },
              { icon: ShieldAlert, label: "Knows its limits", note: "Abstains when unsure" },
              { icon: ShieldCheck, label: "Human signs off", note: "Never auto-dispenses" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <item.icon className="mt-0.5 size-3.5 shrink-0 text-mint-300" aria-hidden />
                <div>
                  <p className="text-[11.5px] font-semibold text-bone">{item.label}</p>
                  <p className="text-[10px] text-fog-faint">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-[0_50px_120px_-50px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <span className="relative flex size-8 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#3ddc97,#0d8f60)]">
                <Sparkles className="size-4 text-ink-950" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-bone">Pharmiq assistant</p>
                <p className="flex items-center gap-1.5 text-[9.5px] text-mint-300/80">
                  <span className="size-1.5 rounded-full bg-mint-500" />
                  Connected to 3 branches
                </p>
              </div>
              <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[8.5px] uppercase tracking-wide text-fog-faint">
                demo
              </span>
            </div>

            <div
              ref={threadRef}
              className="max-h-[25rem] min-h-[22rem] space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[11.5px] leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-md bg-mint-500 text-ink-950"
                        : "rounded-bl-md border border-white/[0.07] bg-white/[0.03] text-bone/90",
                    )}
                  >
                    {message.body?.map((paragraph, index) => (
                      <p key={index} className={cn(index > 0 && "mt-2")}>
                        {paragraph}
                      </p>
                    ))}

                    {message.sources ? (
                      <div className="mt-2.5 border-t border-white/10 pt-2">
                        <p className="mb-1 flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wide text-fog-faint">
                          <BookOpen className="size-2.5" aria-hidden />
                          Sources
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {message.sources.map((source) => (
                            <span
                              key={source}
                              className="rounded border border-white/10 bg-black/25 px-1.5 py-0.5 text-[8.5px] text-fog"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {message.role === "assistant" && message.meta ? (
                      <p className="mt-2 flex items-start gap-1 text-[8.5px] leading-snug text-fog-faint">
                        <Check className="mt-0.5 size-2.5 shrink-0" aria-hidden />
                        {message.meta}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}

              {thinking ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.03] px-3.5 py-3">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="typing-dot size-1.5 rounded-full bg-fog"
                        style={{ animationDelay: `${dot * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/[0.07] px-3.5 py-3">
              <div className="flex flex-wrap gap-1.5">
                {assistantPrompts.slice(0, 3).map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => ask(prompt)}
                    disabled={thinking}
                    className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 text-[9.5px] text-fog transition-colors hover:border-mint-500/30 hover:text-mint-300 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                className="mt-2.5 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/25 py-1.5 pl-3 pr-1.5"
                onSubmit={(event) => {
                  event.preventDefault();
                  ask(input);
                }}
              >
                <label htmlFor="assistant-input" className="sr-only">
                  Ask the pharmacy assistant
                </label>
                <input
                  id="assistant-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about stock, expiry or a medicine…"
                  className="min-w-0 flex-1 bg-transparent text-[11.5px] text-bone placeholder:text-fog-faint focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send question"
                  disabled={thinking || !input.trim()}
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-mint-500 text-ink-950 transition-opacity disabled:opacity-40"
                >
                  <ArrowUp className="size-3.5" aria-hidden />
                </button>
              </form>
              <p className="mt-2 text-center text-[8.5px] text-fog-faint">
                Demonstration only. Clinical decisions require a licensed professional.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- sources */

export function Sources() {
  return (
    <section id="sources" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <p className="mono-label !text-mint-300/80">Clinical trust</p>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-bone">
            Answers you can
            <br />
            <span className="display-italic text-mint-300">audit</span>.
          </h2>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-fog">
            A pharmacy assistant that invents a contraindication is worse than no
            assistant at all. Pharmiq retrieves from a curated reference set, names the
            source behind each statement, and declines when the evidence is not there.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["BNF", "WHO Model Formulary", "Manufacturer SmPC", "NAFDAC register", "RxNorm"].map(
              (source) => (
                <span
                  key={source}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10.5px] text-fog"
                >
                  <BookOpen className="size-3 text-mint-400/80" aria-hidden />
                  {source}
                </span>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="space-y-3">
            <div className="rounded-2xl border border-mint-500/20 bg-mint-500/[0.05] p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-mint-300" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-mint-300">
                  What it does
                </p>
              </div>
              <ul className="mt-3 space-y-2 text-[12.5px] text-bone/80">
                {[
                  "Retrieves indications, dosing, interactions and contraindications.",
                  "Cites the reference behind every clinical claim.",
                  "Flags allergy and interaction risks against the patient profile.",
                  "Logs every query for the superintendent's review.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-mint-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-4 text-amber-soft" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-amber-soft">
                  What it never does
                </p>
              </div>
              <ul className="mt-3 space-y-2 text-[12.5px] text-fog">
                {[
                  "Diagnose a patient or propose a treatment plan.",
                  "Prescribe, substitute or adjust a dose on its own.",
                  "Dispense without a licensed professional's confirmation.",
                  "Answer from a source it cannot show.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-fog-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="px-1 text-[10.5px] leading-relaxed text-fog-faint">
              Pharmiq supports pharmacists and healthcare professionals. It is not a
              diagnostic device, does not replace professional judgement, and must not be
              used as the sole basis for a clinical decision.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
