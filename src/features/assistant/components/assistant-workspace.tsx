"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, BookOpen, Check, FileText, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";
import { assistantAnswers, assistantPrompts } from "@/lib/data";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "assistant";
  body: string[];
  sources?: string[];
  meta?: string;
};

const SUGGESTIONS = [
  ...assistantPrompts,
  "Show me slow-moving stock",
  "What is my value at risk this month?",
];

const OPENING: Message = {
  id: 0,
  role: "assistant",
  body: [
    "I have live access to stock, expiry and dispensing records across Ikeja City, Yaba Central and Lekki Phase 1.",
    "Ask about a quantity, a batch, a supplier or a medicine. I will always show the record or reference I used — and I will tell you when I do not know.",
  ],
  meta: "Read-only · 1,284 SKUs · 3 branches · last synced 2 minutes ago",
};

export function AssistantWorkspace() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const node = threadRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const ask = (value: string) => {
    const question = value.trim();
    if (!question || thinking) return;

    setInput("");
    setMessages((current) => [
      ...current,
      { id: current.length, role: "user", body: [question] },
    ]);
    setThinking(true);

    timerRef.current = setTimeout(() => {
      const answer = assistantAnswers[question] ?? {
        body: [
          "I could not find that in the pharmacy's records or in the clinical reference set I am allowed to use.",
          "Try naming a medicine, a batch number or a branch. For anything outside stock and verified references, I will hand you to the superintendent pharmacist instead of guessing.",
        ],
        meta: "No cited source · not answered",
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
    }, 900);
  };

  return (
    <div className="grid gap-3 lg:grid-cols-[1.65fr_1fr]">
      <div className="glass flex min-h-[34rem] flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#3ddc97,#0d8f60)]">
            <Sparkles className="size-4 text-ink-950" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-bone">Pharmiq assistant</p>
            <p className="flex items-center gap-1.5 text-[9.5px] text-mint-300/80">
              <span className="size-1.5 rounded-full bg-mint-500" />
              Live stock · clinical references · audit logging on
            </p>
          </div>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-white/[0.08] px-2 py-0.5 text-[8.5px] text-fog-faint sm:flex">
            <ShieldCheck className="size-2.5" aria-hidden />
            read-only
          </span>
        </div>

        <div ref={threadRef} className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[90%] rounded-2xl px-4 py-3 text-[11.5px] leading-relaxed",
                  message.role === "user"
                    ? "rounded-br-md bg-mint-500 text-ink-950"
                    : "rounded-bl-md border border-white/[0.07] bg-white/[0.03] text-bone/90",
                )}
              >
                {message.role === "assistant" ? (
                  <p className="mb-1.5 flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.1em] text-fog-faint">
                    <Sparkles className="size-2.5" aria-hidden />
                    Pharmiq
                  </p>
                ) : null}

                {message.body.map((paragraph, index) => (
                  <p key={index} className={cn(index > 0 && "mt-2")}>
                    {paragraph}
                  </p>
                ))}

                {message.sources ? (
                  <div className="mt-2.5 border-t border-white/10 pt-2">
                    <p className="mb-1 flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wide text-fog-faint">
                      <BookOpen className="size-2.5" aria-hidden />
                      Sources used
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
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.03] px-4 py-3">
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

        <div className="border-t border-white/[0.06] px-3.5 py-3">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/25 py-1.5 pl-3 pr-1.5"
          >
            <label htmlFor="workspace-assistant" className="sr-only">
              Ask the assistant
            </label>
            <input
              id="workspace-assistant"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about stock, batches, expiry or a medicine…"
              className="min-w-0 flex-1 bg-transparent text-[11.5px] text-bone placeholder:text-fog-faint focus:outline-none"
            />
            <button
              type="submit"
              disabled={thinking || !input.trim()}
              aria-label="Send"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-mint-500 text-ink-950 disabled:opacity-40"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </form>
          <p className="mt-2 text-center text-[8.5px] text-fog-faint">
            Demonstration assistant with sample data. Not for diagnosis or prescribing.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="glass rounded-2xl p-4">
          <p className="text-[10.5px] font-semibold text-bone">Try a question</p>
          <div className="mt-2 flex flex-col gap-1">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => ask(suggestion)}
                disabled={thinking}
                className="flex min-h-8 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 text-left text-[10px] text-fog transition-colors hover:border-mint-500/25 hover:text-bone disabled:opacity-50"
              >
                <span className="size-1 shrink-0 rounded-full bg-mint-500" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-bone">
            <FileText className="size-3.5 text-mint-300" aria-hidden />
            Context in use
          </p>
          <ul className="mt-2 space-y-1.5 text-[9.5px] text-fog-dim">
            <li className="flex justify-between gap-2">
              <span>Stock records</span>
              <span className="text-bone">1,284 SKUs</span>
            </li>
            <li className="flex justify-between gap-2">
              <span>Batches in scope</span>
              <span className="text-bone">19 active</span>
            </li>
            <li className="flex justify-between gap-2">
              <span>Branches</span>
              <span className="text-bone">3</span>
            </li>
            <li className="flex justify-between gap-2">
              <span>Clinical references</span>
              <span className="text-bone">verified set</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-bone">
            <ShieldAlert className="size-3.5 text-amber-soft" aria-hidden />
            Scope and limits
          </p>
          <p className="mt-1.5 text-[9.5px] leading-relaxed text-fog-dim">
            The assistant supports pharmacy professionals. It does not diagnose, prescribe
            or replace clinical judgement, and every clinical answer must be checked against
            the source shown before it informs a decision.
          </p>
        </div>
      </div>
    </div>
  );
}
