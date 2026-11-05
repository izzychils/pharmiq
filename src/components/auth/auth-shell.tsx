import Link from "next/link";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const POINTS = [
  "Batch and expiry control that survives an inspection.",
  "FEFO on every dispense, with an audit trail.",
  "An assistant that cites its sources.",
];

export function AuthShell({
  children,
  title,
  subtitle,
  footer,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer: React.ReactNode;
}) {
  return (
    <div className="ambient flex min-h-dvh flex-col lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden border-r border-white/[0.06] lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="aurora left-[-10%] top-[8%] h-[24rem] w-[24rem] bg-mint-500/[0.16]" />
          <div className="grid-tile absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_30%_30%,black,transparent_70%)]" />
        </div>

        <Link href="/" aria-label="Pharmiq home" className="relative">
          <Logo />
        </Link>

        <div className="relative max-w-sm">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-mint-300/80">
            <Sparkles className="size-3.5" aria-hidden />
            Pharmacy operations
          </div>
          <p className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-bone">
            The calm way to
            <br />
            run <span className="display-italic text-mint-300">the shelf</span>.
          </p>
          <ul className="mt-6 space-y-2.5">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[12px] text-fog">
                <Check className="mt-0.5 size-3.5 shrink-0 text-mint-400" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
          <ShieldCheck className="size-3.5 shrink-0 text-mint-500/70" aria-hidden />
          <p className="text-[9.5px] leading-relaxed text-fog-faint">
            Supports pharmacists and healthcare professionals. Never diagnoses or
            prescribes.
          </p>
        </div>
      </aside>

      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[380px]">
          <Link href="/" className="mb-8 inline-flex lg:hidden" aria-label="Pharmiq home">
            <Logo />
          </Link>
          <h1 className="text-[26px] font-semibold tracking-tight text-bone">{title}</h1>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-fog-dim">{subtitle}</p>
          <div className="mt-7">{children}</div>
          <div className="mt-6 text-center text-[11.5px] text-fog-dim">{footer}</div>
        </div>
      </div>
    </div>
  );
}
