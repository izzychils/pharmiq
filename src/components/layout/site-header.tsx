"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CalendarClock,
  ClipboardList,
  Menu,
  ScanLine,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MARKETING_NAV, PLATFORM_MENU } from "@/lib/site";
import { cn } from "@/lib/utils";

const MENU_ICONS = {
  boxes: Boxes,
  calendar: CalendarClock,
  scan: ScanLine,
  clipboard: ClipboardList,
  trending: TrendingUp,
  sparkles: Sparkles,
} as const;

/**
 * Sticky glass header with one product mega-menu.
 *
 * The panel is a sibling of the header bar, not a child: the bar's backdrop
 * filter creates a containing block, and nesting the panel inside it would trap
 * it behind the glass. It stays out of flow so opening it never changes the
 * header's height.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-white/10 bg-ink-950/85 backdrop-blur-2xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center gap-4 px-5 sm:px-8">
          <Link href="/" aria-label="Pharmiq home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="ml-6 hidden items-center gap-0.5 lg:flex">
            <div className="relative" ref={panelRef}>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="platform-menu"
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors",
                  open ? "bg-white/[0.06] text-bone" : "text-fog hover:text-bone",
                )}
              >
                Platform
                <svg
                  viewBox="0 0 12 12"
                  className={cn("size-2.5 transition-transform", open && "rotate-180")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {open ? (
                <div
                  id="platform-menu"
                  className="absolute left-0 top-[calc(100%+14px)] w-[620px] overflow-hidden rounded-2xl border border-white/10 bg-ink-900/98 p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {PLATFORM_MENU.map((item) => {
                      const Icon = MENU_ICONS[item.icon];
                      return (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-mint-300 transition-colors group-hover:border-mint-500/30 group-hover:bg-mint-500/10">
                            <Icon className="size-4" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13px] font-semibold text-bone">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-[11.5px] leading-snug text-fog-dim">
                              {item.description}
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                  <div className="mt-1 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                    <span className="text-[11.5px] text-fog-dim">
                      Built for community pharmacies and multi-branch groups.
                    </span>
                    <a
                      href="/platform"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-mint-300"
                    >
                      See the platform
                      <ArrowRight className="size-3" aria-hidden />
                    </a>
                  </div>
                </div>
              ) : null}
            </div>

            {MARKETING_NAV.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-fog transition-colors hover:text-bone"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link
              href="/sign-in"
              className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-fog transition-colors hover:text-bone sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-full bg-mint-500 px-4 py-2.5 text-[13px] font-bold text-ink-950 shadow-[0_12px_30px_-12px_rgba(61,220,151,0.7)] transition-all hover:bg-mint-400 sm:inline-flex"
            >
              Open workspace
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-bone lg:hidden"
            >
              {mobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 top-[68px] z-10 h-dvh w-full cursor-default bg-black/50 lg:hidden"
          />
          <nav
            aria-label="Mobile"
            className="absolute inset-x-0 top-full z-20 mx-4 mt-2 rounded-2xl border border-white/10 bg-ink-900/98 p-2 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            {MARKETING_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 items-center justify-between rounded-xl px-3.5 text-sm font-semibold text-bone/85 hover:bg-white/[0.05]"
              >
                {link.label}
                <ArrowRight className="size-3.5 text-fog-faint" aria-hidden />
              </a>
            ))}
            <div className="my-1 h-px bg-white/[0.07]" />
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center rounded-xl px-3.5 text-sm font-semibold text-bone/85 hover:bg-white/[0.05]"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="mt-1 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-mint-500 px-4 text-sm font-bold text-ink-950"
            >
              Open workspace
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </nav>
        </>
      ) : null}
    </header>
  );
}
