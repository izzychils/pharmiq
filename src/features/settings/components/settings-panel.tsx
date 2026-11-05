"use client";

import { useState } from "react";
import { Check, ChevronRight, Save } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Pharmacy", "Branches", "Alerts", "Clinical references", "Team", "Data"] as const;
type Tab = (typeof TABS)[number];

const ALERT_TOGGLES = [
  { id: "low-stock", label: "Low stock digest", note: "One email each morning at 07:00", on: true },
  { id: "expiry", label: "Expiry windows", note: "Alert at 90, 60 and 30 days", on: true },
  { id: "stockout", label: "Stock-out immediately", note: "Push notification when stock hits zero", on: true },
  { id: "recall", label: "Recall notices", note: "Manufacturer and regulatory recalls", on: true },
  { id: "velocity", label: "Velocity anomalies", note: "When a product moves 40% above its baseline", on: false },
];

export function SettingsPanel() {
  const [tab, setTab] = useState<Tab>("Pharmacy");
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(ALERT_TOGGLES.map((entry) => [entry.id, entry.on])),
  );
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid gap-3 lg:grid-cols-[0.55fr_1.45fr]">
      <nav aria-label="Settings sections" className="glass h-fit rounded-2xl p-2">
        {TABS.map((entry) => (
          <button
            key={entry}
            type="button"
            onClick={() => setTab(entry)}
            aria-current={tab === entry ? "page" : undefined}
            className={cn(
              "flex min-h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-[11.5px] font-medium transition-colors",
              tab === entry
                ? "bg-mint-500/10 text-mint-200"
                : "text-fog-dim hover:bg-white/[0.04] hover:text-bone",
            )}
          >
            {entry}
            <ChevronRight className="ml-auto size-3 text-fog-faint" aria-hidden />
          </button>
        ))}
      </nav>

      <div className="glass rounded-2xl p-5">
        {tab === "Pharmacy" ? (
          <div className="space-y-4">
            <SectionTitle title="Pharmacy profile" note="Appears on prescriptions, receipts and reports." />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Pharmacy name", value: "Cedar Pharmacy" },
                { label: "Superintendent", value: "Adaeze Nwankwo" },
                { label: "PCN licence", value: "PCN/LAG/2024/1184" },
                { label: "Phone", value: "+234 812 000 4488" },
                { label: "Email", value: "hello@cedarpharmacy.example" },
                { label: "Address", value: "12 Allen Avenue, Ikeja" },
              ].map((field) => (
                <label key={field.label} className="block">
                  <span className="text-[9.5px] uppercase tracking-wide text-fog-faint">
                    {field.label}
                  </span>
                  <input
                    defaultValue={field.value}
                    className="mt-1 w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-[11px] text-bone focus:border-mint-500/40 focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "Branches" ? (
          <div className="space-y-4">
            <SectionTitle title="Branches" note="Stock transfers and reporting are scoped to these locations." />
            {[
              { name: "Ikeja City", address: "Allen Avenue, Ikeja", users: 6, primary: true },
              { name: "Yaba Central", address: "Herbert Macaulay Way", users: 4, primary: false },
              { name: "Lekki Phase 1", address: "Admiralty Way", users: 5, primary: false },
            ].map((branch) => (
              <div
                key={branch.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3"
              >
                <div>
                  <p className="flex items-center gap-2 text-[11.5px] font-semibold text-bone">
                    {branch.name}
                    {branch.primary ? (
                      <span className="rounded bg-mint-500/10 px-1.5 py-0.5 text-[8px] font-bold text-mint-300">
                        primary
                      </span>
                    ) : null}
                  </p>
                  <p className="text-[9.5px] text-fog-faint">
                    {branch.address} · {branch.users} users
                  </p>
                </div>
                <button type="button" className="text-[9.5px] font-semibold text-mint-300">
                  Manage
                </button>
              </div>
            ))}
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-[10.5px] font-semibold text-fog hover:text-bone"
            >
              Add branch
            </button>
          </div>
        ) : null}

        {tab === "Alerts" ? (
          <div className="space-y-4">
            <SectionTitle title="Alert preferences" note="One digest, not forty pings. Changes apply to your account." />
            <div className="space-y-1.5">
              {ALERT_TOGGLES.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
                >
                  <div>
                    <p className="text-[11px] font-semibold text-bone">{entry.label}</p>
                    <p className="text-[9.5px] text-fog-faint">{entry.note}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={toggles[entry.id]}
                    aria-label={entry.label}
                    onClick={() =>
                      setToggles((current) => ({ ...current, [entry.id]: !current[entry.id] }))
                    }
                    className={cn(
                      "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                      toggles[entry.id] ? "bg-mint-500" : "bg-white/[0.12]",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 size-4 rounded-full bg-ink-950 transition-transform",
                        toggles[entry.id] ? "left-[18px]" : "left-0.5",
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "Clinical references" ? (
          <div className="space-y-4">
            <SectionTitle
              title="Clinical reference set"
              note="The assistant can only answer clinical questions from sources that are switched on here."
            />
            {[
              { name: "BNF", note: "British National Formulary", on: true },
              { name: "WHO Model Formulary", note: "World Health Organization", on: true },
              { name: "Manufacturer SmPC", note: "Summary of product characteristics", on: true },
              { name: "NAFDAC register", note: "Nigerian product registration", on: true },
              { name: "RxNorm", note: "Normalised naming (US)", on: false },
            ].map((source) => (
              <div
                key={source.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <div>
                  <p className="text-[11px] font-semibold text-bone">{source.name}</p>
                  <p className="text-[9.5px] text-fog-faint">{source.note}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-bold",
                    source.on
                      ? "bg-mint-500/10 text-mint-300"
                      : "border border-white/[0.08] text-fog-faint",
                  )}
                >
                  {source.on ? <Check className="size-2.5" aria-hidden /> : null}
                  {source.on ? "enabled" : "off"}
                </span>
              </div>
            ))}
            <p className="text-[9.5px] leading-relaxed text-fog-faint">
              Disabling a source does not remove the audit log of answers that used it.
            </p>
          </div>
        ) : null}

        {tab === "Team" ? (
          <div className="space-y-4">
            <SectionTitle title="Team and roles" note="Permissions follow the role, not the person." />
            {[
              { name: "Adaeze Nwankwo", role: "Owner · Superintendent", email: "adaeze@cedar.example" },
              { name: "Tunde Balogun", role: "Pharmacist", email: "tunde@cedar.example" },
              { name: "Ngozi Eze", role: "Pharmacy assistant", email: "ngozi@cedar.example" },
              { name: "Yusuf Adeleke", role: "Locum pharmacist", email: "yusuf@cedar.example" },
            ].map((member) => (
              <div
                key={member.email}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-mint-500/10 text-[9.5px] font-bold text-mint-300">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-bone">{member.name}</p>
                  <p className="truncate text-[9.5px] text-fog-faint">{member.email}</p>
                </div>
                <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[8.5px] text-fog-dim">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Data" ? (
          <div className="space-y-4">
            <SectionTitle title="Data and audit" note="Everything in Pharmiq is exportable." />
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "Export full inventory (CSV)",
                "Export dispensing history",
                "Export audit trail",
                "Download patient data request",
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="flex min-h-10 items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 text-left text-[10.5px] text-fog hover:text-bone"
                >
                  {action}
                  <ChevronRight className="size-3 text-fog-faint" aria-hidden />
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-amber/20 bg-amber/[0.05] p-3.5">
              <p className="text-[10.5px] font-semibold text-amber-soft">Retention policy</p>
              <p className="mt-1 text-[9.5px] leading-relaxed text-fog">
                Patient records are retained for seven years after the last dispensing event,
                in line with pharmacy record-keeping requirements. Audit logs are append-only.
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <p className="text-[9.5px] text-fog-faint">Demo settings are not persisted.</p>
          <button
            type="button"
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2200);
            }}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-mint-500 px-3.5 text-[10.5px] font-bold text-ink-950 hover:bg-mint-400"
          >
            {saved ? <Check className="size-3.5" aria-hidden /> : <Save className="size-3.5" aria-hidden />}
            {saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, note }: { title: string; note: string }) {
  return (
    <div>
      <h2 className="text-[13px] font-semibold text-bone">{title}</h2>
      <p className="mt-0.5 text-[10px] text-fog-faint">{note}</p>
    </div>
  );
}
