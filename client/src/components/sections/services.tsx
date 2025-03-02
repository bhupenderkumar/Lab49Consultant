import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, Cpu, Database, LineChart } from "lucide-react";

const services = [
  {
    title: "AI Strategy Consulting",
    description: "Develop a comprehensive AI strategy aligned with your business goals",
    icon: Brain
  },
  {
    title: "Machine Learning Solutions",
    description: "Custom ML models for prediction, classification, and optimization",
    icon: Cpu
  },
  {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure for AI systems",
    icon: Database
  },
  {
    title: "AI Implementation",
    description: "End-to-end implementation of AI solutions in your organization",
    icon: LineChart
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive AI solutions for financial institutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <service.icon className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
