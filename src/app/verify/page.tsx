import { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { VerificationCard } from "@/components/verification-card";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company Verification | Pharmiq",
  description:
    "Verify Pharmiq's official registration and company details. Confirm the authenticity of our platform and services.",
};

export default function VerifyPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/[0.07]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-24 -top-20 size-96 rounded-full bg-mint-500/[0.1] blur-3xl" />
            <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-teal-500/[0.08] blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-[720px] text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint-400/20 bg-mint-500/[0.08] px-4 py-1.5">
                <span className="size-1.5 animate-pulse rounded-full bg-mint-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-mint-300">
                  Official Verification
                </span>
              </div>
              <h1 className="text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.045em] text-bone">
                Confirm Official Registration
              </h1>
              <p className="mx-auto mt-6 max-w-[580px] text-[14px] leading-relaxed text-fog-dim">
                Verify the authenticity of Pharmiq and confirm official company registration
                details. Enter a registration ID below to view verification status.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Card */}
        <section className="relative mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <VerificationCard />
        </section>

        {/* Info Section */}
        <section className="relative border-t border-white/[0.07]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-32 top-0 size-80 rounded-full bg-teal-500/[0.06] blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="mb-10 text-center text-[clamp(1.8rem,3.2vw,2.5rem)] font-bold tracking-[-0.04em] text-bone">
              Why Verify?
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="group rounded-2xl border border-white/[0.1] bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-1">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-mint-400/20 bg-mint-500/[0.1] text-mint-400">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-bone">Authenticity</h3>
                <p className="text-[13px] leading-relaxed text-fog-dim">
                  Confirm you're working with the official Pharmiq platform and not an
                  impersonator.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/[0.1] bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-1">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-mint-400/20 bg-mint-500/[0.1] text-mint-400">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-bone">Trust</h3>
                <p className="text-[13px] leading-relaxed text-fog-dim">
                  Verify our registration details, operational status, and compliance
                  certifications.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/[0.1] bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-1">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-mint-400/20 bg-mint-500/[0.1] text-mint-400">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-bone">Transparency</h3>
                <p className="text-[13px] leading-relaxed text-fog-dim">
                  Access public records of our company registration and service offerings.
                </p>
              </div>
            </div>
            <p className="mt-10 text-center text-[11px] text-fog-faint">
              Last updated: {SITE.lastUpdated}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
