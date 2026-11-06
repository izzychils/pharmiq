import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Inventory & batches", href: "/platform" },
      { label: "Expiry control", href: "/expiry" },
      { label: "FEFO dispensing", href: "/fefo" },
      { label: "Clinical assistant", href: "/assistant" },
      { label: "Reorders", href: "/dashboard/reorders" },
    ],
  },
  {
    title: "Workspace",
    links: [
      { label: "Open demo", href: "/dashboard" },
      { label: "Sign in", href: "/sign-in" },
      { label: "Create account", href: "/sign-up" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/trust" },
      { label: "Company Verification", href: "/verify" },
      { label: "Contact", href: `mailto:${SITE.email}` },
      { label: "Clinical sources", href: "/sources" },
      { label: "Security", href: "/sources" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.07]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 size-80 rounded-full bg-mint-500/[0.09] blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-teal-500/[0.08] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-fog-dim">
              {SITE.description}
            </p>

            <div className="mt-6 space-y-2.5 text-[13px] text-fog-dim">
              <a href={`mailto:${SITE.email}`} className="flex min-h-6 items-center gap-2 transition-colors hover:text-mint-300">
                <Mail className="size-3.5" aria-hidden />
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex min-h-6 items-center gap-2 transition-colors hover:text-mint-300">
                <Phone className="size-3.5" aria-hidden />
                {SITE.phone}
              </a>
              <p className="flex min-h-6 items-center gap-2">
                <MapPin className="size-3.5" aria-hidden />
                {SITE.city}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-bone/80">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex min-h-9 items-center text-[13px] text-fog-dim transition-colors hover:text-mint-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-[12px] text-fog-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pharmiq Health Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-mint-500/70" aria-hidden />
              Supports professional judgement, never replaces it.
            </span>
            <a
              href="https://pharmiq.online"
              className="inline-flex items-center gap-1 transition-colors hover:text-mint-300"
            >
              pharmiq.online
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
