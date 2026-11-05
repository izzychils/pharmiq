"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Open your workspace"
      subtitle="Fourteen days free. No card, no implementation fee, no lock-in."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-mint-300 hover:text-mint-200">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-3.5"
        onSubmit={(event) => {
          event.preventDefault();
          setLoading(true);
          setTimeout(() => router.push("/dashboard"), 650);
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-fog-dim">
              First name
            </span>
            <input
              required
              defaultValue="Adaeze"
              className="mt-1.5 h-11 w-full rounded-xl border border-white/[0.08] bg-black/25 px-3.5 text-[12.5px] text-bone focus:border-mint-500/40 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-fog-dim">
              Last name
            </span>
            <input
              required
              defaultValue="Nwankwo"
              className="mt-1.5 h-11 w-full rounded-xl border border-white/[0.08] bg-black/25 px-3.5 text-[12.5px] text-bone focus:border-mint-500/40 focus:outline-none"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-fog-dim">
            Pharmacy name
          </span>
          <input
            required
            defaultValue="Cedar Pharmacy"
            className="mt-1.5 h-11 w-full rounded-xl border border-white/[0.08] bg-black/25 px-3.5 text-[12.5px] text-bone focus:border-mint-500/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-fog-dim">
            Work email
          </span>
          <input
            type="email"
            required
            defaultValue="adaeze@cedarpharmacy.example"
            className="mt-1.5 h-11 w-full rounded-xl border border-white/[0.08] bg-black/25 px-3.5 text-[12.5px] text-bone focus:border-mint-500/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-fog-dim">
            Password
          </span>
          <input
            type="password"
            required
            defaultValue="demo-workspace"
            className="mt-1.5 h-11 w-full rounded-xl border border-white/[0.08] bg-black/25 px-3.5 text-[12.5px] text-bone focus:border-mint-500/40 focus:outline-none"
          />
        </label>

        <label className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <input type="checkbox" required defaultChecked className="mt-0.5 accent-mint-500" />
          <span className="text-[10px] leading-relaxed text-fog-dim">
            I am a licensed pharmacy professional or authorised pharmacy staff, and I accept
            the terms of use.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-mint-500 text-[12.5px] font-bold text-ink-950 transition-colors hover:bg-mint-400 disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {loading ? "Preparing workspace…" : "Create account"}
          {!loading ? <ArrowRight className="size-3.5" aria-hidden /> : null}
        </button>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-[9.5px] text-fog-faint">
          <Check className="size-3 text-mint-500" aria-hidden />
          Demo only — nothing is submitted or stored.
        </p>
      </form>
    </AuthShell>
  );
}
