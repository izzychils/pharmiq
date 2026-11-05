import { cn } from "@/lib/utils";

/**
 * The Pharmiq mark: a cross inside a rounded capsule, drawn as an SVG so it
 * stays crisp at 16px in the favicon and 40px in the header.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[11px]",
        "bg-[linear-gradient(145deg,#3ddc97,#0d8f60)] shadow-[0_6px_18px_-6px_rgba(61,220,151,0.65)] ring-1 ring-white/20",
        className,
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_55%)]" />
      <svg viewBox="0 0 24 24" fill="none" className="relative size-[18px] text-ink-950">
        <path
          d="M9.4 3.6h5.2v5.8h5.8v5.2h-5.8v5.8H9.4v-5.8H3.6V9.4h5.8V3.6Z"
          fill="currentColor"
          opacity="0.92"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {showText ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="text-[17px] font-extrabold tracking-[-0.02em] text-bone">
            pharmiq<span className="text-mint-500">.</span>
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-fog-dim">
            Pharmacy OS
          </span>
        </span>
      ) : null}
    </span>
  );
}
