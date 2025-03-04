import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";
import { DemoFeatures } from "@/components/sections/demo-features";
import { useAuth } from "@/hooks/use-auth";
import FeaturesAndPricing from "@/components/FeaturesAndPricing";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        {user ? null : (
          <div className="get-in-touch">
            <h2>Get in Touch</h2>
            <p>If you have any questions, feel free to reach out!</p>
          </div>
        )}
        <FeaturesAndPricing />
        <Pricing />
        <DemoFeatures />
        <Contact />
      </main>
    </div>
  );
}