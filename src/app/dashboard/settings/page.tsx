import { SettingsPanel } from "@/features/settings/components/settings-panel";
import { PageHeader } from "@/components/dashboard/page-parts";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Pharmacy profile, branches, alert preferences and the clinical sources the assistant is allowed to use."
      />
      <SettingsPanel />
    </div>
  );
}
