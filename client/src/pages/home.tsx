import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";
import { DemoFeatures } from "@/components/sections/demo-features";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <DemoFeatures />
        <Contact />
      </main>
    </div>
  );
}