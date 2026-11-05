import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="ambient flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Logo />
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-mint-300/70">
        404 · shelf not found
      </p>
      <h1 className="mt-4 max-w-md text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
        This page is not in the catalog.
      </h1>
      <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-fog">
        The link may be out of date. Head back to the pharmacy or open the assistant and
        ask where to find something.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-mint-500 px-5 text-[13px] font-bold text-ink-950"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to Pharmiq
      </Link>
    </main>
  );
}
