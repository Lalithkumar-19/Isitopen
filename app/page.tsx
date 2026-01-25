import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/home/hero";
import { PainPoints } from "@/components/home/pain-points";
import { SolutionSection } from "@/components/home/solution-section";
import { SearchSection } from "@/components/home/search-section";
import { FAQ } from "@/components/home/faq";
import { HowItWorks } from "@/components/home/how-it-works";
import { AboutSection } from "@/components/home/about-section";
import { CrowdTrustSection } from "@/components/home/crowd-trust-section";

export const metadata = {
  title: "OpenOrClosed - check shop status",
  description: "Real-time availability checker for local businesses.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eefbf3] font-sans selection:bg-green-100 flex flex-col">
      <Navbar />
      <Hero />
      <HowItWorks />
      <AboutSection />
      <CrowdTrustSection />
      <FAQ />
      {/* <PainPoints />
      <SolutionSection /> */}
      {/* <SearchSection /> */}

    </div>
  );
}
