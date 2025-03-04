import { motion } from "framer-motion";
import { useSubscription } from "@/hooks/use-subscription";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const features = {
  basic: [
    {
      title: "Basic AI Analysis",
      description: "Simple data analysis and reporting tools",
      available: true
    }
  ],
  professional: [
    {
      title: "Advanced Analytics",
      description: "Complex data analysis with custom reporting",
      available: true
    },
    {
      title: "Real-time Monitoring",
      description: "Live monitoring of AI systems and alerts",
      available: true
    }
  ],
  enterprise: [
    {
      title: "Custom AI Models",
      description: "Fully customized AI models for your specific needs",
      available: true
    },
    {
      title: "24/7 Priority Support",
      description: "Dedicated support team and priority issue resolution",
      available: true
    },
    {
      title: "White-label Solutions",
      description: "Branded AI solutions for your organization",
      available: true
    }
  ]
};

export function DemoFeatures() {
  const { currentSubscription } = useSubscription();

  const getPlanLevel = () => {
    if (!currentSubscription) return 0;
    switch (currentSubscription.planId) {
      case 1: return 1; // Basic
      case 2: return 2; // Professional
      case 3: return 3; // Enterprise
      default: return 0;
    }
  };

  const planLevel = getPlanLevel();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Available Features</h2>
          <p className="text-xl text-muted-foreground">
            Explore the features available in your subscription tier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Basic Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.basic.map((feature, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background/50">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className={planLevel < 2 ? "opacity-50" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Professional Features
                  {planLevel < 2 && <Lock className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.professional.map((feature, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background/50">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
                {planLevel < 2 && (
                  <Button className="w-full" variant="outline" asChild>
                    <a href="#pricing">Upgrade to Access</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Enterprise Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className={planLevel < 3 ? "opacity-50" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Enterprise Features
                  {planLevel < 3 && <Lock className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.enterprise.map((feature, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background/50">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
                {planLevel < 3 && (
                  <Button className="w-full" variant="outline" asChild>
                    <a href="#pricing">Upgrade to Access</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
