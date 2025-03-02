import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import type { SubscriptionPlan } from "@shared/schema";
import { useSubscription } from "@/hooks/use-subscription";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Pricing() {
  const [email, setEmail] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const { data: plans, isLoading } = useQuery<SubscriptionPlan[]>({
    queryKey: ["/api/plans"]
  });

  const { currentSubscription, subscribe, isSubscribing, userEmail } = useSubscription();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubscribe = (planId: number) => {
    if (!email) return;
    subscribe({ email, planId });
    setSelectedPlanId(null);
  };

  const getButtonProps = (planId: number) => {
    const isCurrentPlan = currentSubscription?.planId === planId;

    return {
      onClick: isCurrentPlan ? undefined : () => setSelectedPlanId(planId),
      disabled: isSubscribing || (isCurrentPlan && !userEmail),
      children: isCurrentPlan ? "Current Plan" : "Subscribe",
    };
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Pricing Plans</h2>
          <p className="mt-4 text-muted-foreground">
            Choose the perfect plan for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans?.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4 text-3xl font-bold">
                    ${plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Dialog open={selectedPlanId === plan.id} onOpenChange={(open) => !open && setSelectedPlanId(null)}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-6" {...getButtonProps(plan.id)} />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Subscribe to {plan.name} Plan</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button 
                          className="w-full" 
                          onClick={() => handleSubscribe(plan.id)}
                          disabled={!email || isSubscribing}
                        >
                          {isSubscribing ? "Subscribing..." : "Confirm Subscription"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}