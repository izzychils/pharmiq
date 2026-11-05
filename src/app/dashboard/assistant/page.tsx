import { AssistantWorkspace } from "@/features/assistant/components/assistant-workspace";
import { PageHeader } from "@/components/dashboard/page-parts";

export const metadata = { title: "Assistant" };

export default function AssistantPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="AI assistant"
        title="Ask the pharmacy"
        description="Stock, batches, expiry and verified clinical references — in one conversation, with the record behind every answer."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-500/20 bg-mint-500/10 px-3 py-1.5 text-[10px] font-semibold text-mint-300">
            <span className="size-1.5 rounded-full bg-mint-500" />
            3 branches connected
          </span>
        }
      />

      <AssistantWorkspace />
    </div>
  );
}
