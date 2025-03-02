import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Brain, Cpu, Database, LineChart } from "lucide-react";

const services = [
  {
    title: "AI Strategy Consulting",
    description: "Develop a comprehensive AI strategy aligned with your business goals",
    details: "Our expert consultants work with you to create a tailored AI roadmap that identifies opportunities, assesses risks, and outlines implementation steps. We ensure your AI initiatives deliver measurable business value.",
    icon: Brain
  },
  {
    title: "Machine Learning Solutions",
    description: "Custom ML models for prediction, classification, and optimization",
    details: "From predictive analytics to risk assessment models, we design and implement custom machine learning solutions that help you make data-driven decisions and automate complex processes.",
    icon: Cpu
  },
  {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure for AI systems",
    details: "We architect scalable data infrastructure that forms the foundation of your AI capabilities. Our solutions ensure data quality, accessibility, and security while supporting real-time processing needs.",
    icon: Database
  },
  {
    title: "AI Implementation",
    description: "End-to-end implementation of AI solutions in your organization",
    details: "From proof of concept to production deployment, we handle the entire implementation process. Our team ensures smooth integration with existing systems and provides comprehensive training and support.",
    icon: LineChart
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive AI solutions tailored for financial institutions, 
            helping you navigate the complex landscape of artificial intelligence and 
            machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
                <CardContent>
                  <p className="text-muted-foreground">{service.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}