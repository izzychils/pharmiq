"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  CalendarClock,
  ClipboardList,
  Layers,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Truck,
  X,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { BRANCHES, DASHBOARD_NAV, DASHBOARD_SECONDARY_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS = {
  layout: LayoutDashboard,
  boxes: Boxes,
  book: BookOpen,
  layers: Layers,
  calendar: CalendarClock,
  clipboard: ClipboardList,
  trending: TrendingUp,
  sparkles: Sparkles,
  truck: Truck,
  chart: BarChart3,
  settings: Settings,
} as const;

function NavItem({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: keyof typeof ICONS;
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex min-h-9 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] font-medium transition-colors",
        active
          ? "bg-mint-500/10 text-mint-200"
          : "text-fog-dim hover:bg-white/[0.04] hover:text-bone",
      )}
    >
      {active ? (
        <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-mint-500" />
      ) : null}
      <Icon
        className={cn("size-4 shrink-0", active ? "text-mint-400" : "text-fog-faint group-hover:text-fog-dim")}
        aria-hidden
      />
      {label}
      {label === "Expiry" ? (
        <span className="ml-auto rounded-full bg-amber/15 px-1.5 text-[9px] font-bold text-amber-soft">
          4
        </span>
      ) : null}
      {label === "Prescriptions" ? (
        <span className="ml-auto rounded-full bg-mint-500/15 px-1.5 text-[9px] font-bold text-mint-300">
          3
        </span>
      ) : null}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between px-1">
        <Link href="/" aria-label="Pharmiq home">
          <Logo />
        </Link>
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5">
        <p className="text-[8.5px] uppercase tracking-[0.14em] text-fog-faint">Active branch</p>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-bone">
            <span className="size-1.5 rounded-full bg-mint-500" />
            Ikeja City
          </span>
          <span className="rounded border border-white/10 px-1 py-0.5 text-[8px] text-fog-faint">
            3 total
          </span>
        </div>
      </div>

      <nav aria-label="Dashboard" className="mt-5 flex-1 space-y-6 overflow-y-auto pb-4">
        <div>
          <p className="px-2.5 pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.16em] text-fog-faint">
            Workspace
          </p>
          <div className="space-y-0.5">
            {DASHBOARD_NAV.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                active={isActive(pathname, item.href)}
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="px-2.5 pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.16em] text-fog-faint">
            Operations
          </p>
          <div className="space-y-0.5">
            {DASHBOARD_SECONDARY_NAV.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                active={isActive(pathname, item.href)}
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>

        <div className="mx-1 rounded-xl border border-mint-500/15 bg-[linear-gradient(160deg,rgba(61,220,151,0.1),rgba(61,220,151,0.02))] p-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3 text-mint-300" aria-hidden />
            <p className="text-[10px] font-bold text-mint-200">Assistant is live</p>
          </div>
          <p className="mt-1 text-[9.5px] leading-relaxed text-fog-dim">
            4 batches expire this month. Ask what to do first.
          </p>
          <Link
            href="/dashboard/assistant"
            className="mt-2 inline-flex min-h-6 items-center text-[9.5px] font-semibold text-mint-300 hover:text-mint-200"
          >
            Open assistant →
          </Link>
        </div>
      </nav>

      <div className="border-t border-white/[0.07] pt-3">
        <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-mint-500/15 text-[10px] font-bold text-mint-300">
            AN
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11.5px] font-semibold text-bone">Adaeze Nwankwo</p>
            <p className="truncate text-[9.5px] text-fog-faint">Superintendent pharmacist</p>
          </div>
          <Link href="/dashboard/settings" aria-label="Account settings" className="text-fog-faint hover:text-bone">
            <Settings className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="ambient min-h-dvh">
      <div className="flex min-h-dvh">
        {/* desktop sidebar */}
        <aside className="sticky top-0 hidden h-dvh w-[232px] shrink-0 flex-col border-r border-white/[0.06] bg-black/25 px-3 py-4 backdrop-blur-xl lg:flex">
          <SidebarNav pathname={pathname} />
        </aside>


        {/* mobile drawer */}
        {open ? (
          <>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <aside className="fixed inset-y-0 left-0 z-50 flex w-[266px] flex-col border-r border-white/10 bg-ink-900 px-3 py-4 shadow-2xl lg:hidden">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-4 flex size-8 items-center justify-center rounded-lg border border-white/10 text-fog"
              >
                <X className="size-4" aria-hidden />
              </button>
              <SidebarNav pathname={pathname} onNavigate={() => setOpen(false)} />
            </aside>
          </>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/[0.06] bg-ink-950/80 px-4 backdrop-blur-xl sm:px-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-fog lg:hidden"
            >
              <Menu className="size-4" aria-hidden />
            </button>

            <span className="flex items-center gap-2 lg:hidden">
              <LogoMark className="size-7 rounded-lg" />
              <span className="text-[13px] font-bold">pharmiq</span>
            </span>

            <label className="ml-1 hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[11.5px] text-fog-faint md:flex md:max-w-[19rem]">
              <Search className="size-3.5" aria-hidden />
              <span className="sr-only">Search medicines, batches or prescriptions</span>
              <input
                placeholder="Search medicines, batches…"
                className="min-w-0 flex-1 bg-transparent text-bone placeholder:text-fog-faint focus:outline-none"
              />
              <kbd className="rounded border border-white/10 px-1 text-[9px]">⌘K</kbd>
            </label>

            <div className="ml-auto flex items-center gap-1.5">
              <span className="hidden items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 text-[10px] text-fog-dim sm:flex">
                <span className="size-1.5 rounded-full bg-mint-500" />
                Demo workspace
              </span>
              <span className="hidden text-[10.5px] text-fog-faint xl:block">Thu, 5 Nov 2026</span>
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex size-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-fog-dim hover:text-bone"
              >
                <Bell className="size-3.5" aria-hidden />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-amber" />
              </button>
              <Link
                href="/"
                className="hidden items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 text-[10px] text-fog-dim transition-colors hover:text-bone sm:flex"
              >
                <ArrowLeft className="size-3" aria-hidden />
                Site
              </Link>
              <span className="ml-0.5 flex size-7 items-center justify-center rounded-full bg-mint-500/15 text-[9px] font-bold text-mint-300">
                AN
              </span>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6">
            <div className="mx-auto w-full max-w-[1320px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto pr-1">
        <SidebarContent pathname={pathname} onNavigate={onNavigate} />
      </div>
      <Link
        href="/"
        className="mt-2 flex min-h-8 items-center gap-2 rounded-lg px-2.5 text-[10.5px] text-fog-faint transition-colors hover:text-fog"
      >
        <ArrowLeft className="size-3" aria-hidden />
        Back to pharmiq.online
      </Link>
    </div>
  );
}
