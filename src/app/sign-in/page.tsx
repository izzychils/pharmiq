"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("adaeze@cedarpharmacy.example");
  const [password, setPassword] = useState("demo-workspace");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to the Pharmiq workspace for Cedar Pharmacy."
      footer={
        <>
          New to Pharmiq?{" "}
          <Link href="/sign-up" className="font-semibold text-mint-300 hover:text-mint-200">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-3.5"
        onSubmit={(event) => {
          event.preventDefault();
          setLoading(true);
          setTimeout(() => router.push("/dashboard"), 550);
        }}
      >
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-fog-dim">
            Work email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-white/[0.08] bg-black/25 px-3.5 text-[12.5px] text-bone placeholder:text-fog-faint focus:border-mint-500/40 focus:outline-none"
            placeholder="you@pharmacy.com"
          />
        </label>

        <label className="block">
          <span className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-fog-dim">
            Password
            <span className="text-[9px] font-normal normal-case text-fog-faint">
              Demo: any value works
            </span>
          </span>
          <span className="relative mt-1.5 block">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/25 px-3.5 pr-11 text-[12.5px] text-bone focus:border-mint-500/40 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShow((value) => !value)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-1.5 top-1.5 flex size-8 items-center justify-center rounded-lg text-fog-faint hover:text-bone"
            >
              {show ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-mint-500 text-[12.5px] font-bold text-ink-950 transition-colors hover:bg-mint-400 disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {loading ? "Opening workspace…" : "Sign in"}
          {!loading ? <ArrowRight className="size-3.5" aria-hidden /> : null}
        </button>

        <div className="relative py-1 text-center">
          <span className="relative z-10 bg-[#050c09] px-2 text-[9.5px] uppercase tracking-wide text-fog-faint">
            or
          </span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-white/[0.07]" />
        </div>

        <Link
          href="/dashboard"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[12px] font-semibold text-bone transition-colors hover:border-white/25"
        >
          Continue to the demo workspace
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>

        <p className="pt-1 text-center text-[9.5px] leading-relaxed text-fog-faint">
          This is a demonstration sign-in. No credentials are stored or checked, and the
          workspace contains sample data only.
        </p>
      </form>
    </AuthShell>
  );
}
