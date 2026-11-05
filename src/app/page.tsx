import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Platform } from "@/components/sections/platform";
import { ExpiryControl } from "@/components/sections/expiry";
import { AssistantDemo, Sources } from "@/components/sections/assistant-demo";
import { Testimonials, Workflow } from "@/components/sections/social-proof";
import { Faq, Pricing } from "@/components/sections/pricing";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <div className="ambient min-h-dvh">
      <SiteHeader />
      <main>
        <Hero />
        <Platform />
        <Capabilities />
        <ExpiryControl />
        <AssistantDemo />
        <Sources />
        <Workflow />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
