import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FloatingAtoms } from "@/components/animations/floating-atoms";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <FloatingAtoms />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-6">
              Transform Your Business with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Lab49's AI consulting services help financial institutions leverage artificial intelligence 
              to drive innovation and growth. Our expert team combines deep industry knowledge with 
              cutting-edge AI expertise to deliver transformative solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              From machine learning models to natural language processing, we help you harness the 
              power of AI to optimize operations, enhance customer experiences, and gain competitive advantage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" asChild>
              <a href="#contact">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}