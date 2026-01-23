import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/home/hero";

export const metadata = {
  title: "OpenOrClosed - check shop status",
  description: "Real-time availability checker for local businesses.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eefbf3] font-sans selection:bg-green-100 flex flex-col">
      <Navbar />
      <Hero />
    </div>
  );
}
