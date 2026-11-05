import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ------------------------------------------------------------------ badge */

export function Badge({
  children,
  className,
  tone = "mint",
}: {
  children: ReactNode;
  className?: string;
  tone?: "mint" | "amber" | "rose" | "neutral" | "violet";
}) {
  const tones = {
    mint: "border-mint-500/25 bg-mint-500/10 text-mint-300",
    amber: "border-amber/25 bg-amber/10 text-amber-soft",
    rose: "border-rose/25 bg-rose/10 text-rose-soft",
    violet: "border-violet/25 bg-violet/10 text-violet",
    neutral: "border-white/12 bg-white/[0.04] text-fog",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- button */

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm" | "lg";
  className?: string;
} & ComponentPropsWithoutRef<"a">;

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-mint-500 text-ink-950 shadow-[0_16px_40px_-14px_rgba(61,220,151,0.6)] hover:bg-mint-400",
    secondary:
      "border border-white/12 bg-white/[0.04] text-bone hover:border-white/25 hover:bg-white/[0.07]",
    ghost: "text-fog hover:text-bone",
  } as const;

  const sizes = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-[15px]",
  } as const;

  return (
    <a
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------ section head */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-mint-500/50" />
        <span className="mono-label !text-mint-300/80">{eyebrow}</span>
      </div>
      <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-relaxed text-fog",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- icon tile */

export function IconTile({
  children,
  tone = "mint",
  className,
}: {
  children: ReactNode;
  tone?: "mint" | "amber" | "rose" | "neutral" | "violet";
  className?: string;
}) {
  const tones = {
    mint: "border-mint-500/25 bg-mint-500/10 text-mint-300",
    amber: "border-amber/25 bg-amber/10 text-amber-soft",
    rose: "border-rose/25 bg-rose/10 text-rose-soft",
    violet: "border-violet/25 bg-violet/10 text-violet",
    neutral: "border-white/10 bg-white/[0.04] text-fog",
  } as const;

  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl border",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ meter */

export function Meter({
  value,
  max = 100,
  tone = "mint",
  className,
}: {
  value: number;
  max?: number;
  tone?: "mint" | "amber" | "rose";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const tones = {
    mint: "bg-mint-500",
    amber: "bg-amber",
    rose: "bg-rose",
  } as const;

  return (
    <span className={cn("block h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]", className)}>
      <span
        className={cn("block h-full rounded-full transition-all duration-700", tones[tone])}
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

/* ----------------------------------------------------------------- footer */

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {children}
    </section>
  );
}
