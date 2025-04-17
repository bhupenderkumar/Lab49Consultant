import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Feature {
  name: string;
  description: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
}

const FeaturesAndPricing = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/plans");
        const data = await response.json();
        setFeatures(data.features || []);
        setPricingPlans(data.pricingPlans || []);
      } catch (error) {
        console.error("Failed to fetch plans", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Available Features and Pricing</h2>
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Features</h3>
        {features.map((feature, index) => (
          <Card key={index} className="bg-card text-card-foreground shadow-sm mb-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{feature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Pricing Plans</h3>
        {pricingPlans.map((plan, index) => (
          <Card key={index} className="bg-card text-card-foreground shadow-sm mb-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Price: {plan.price}</p>
              <ul className="list-disc pl-5 mt-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-4">Choose Plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesAndPricing;


// Jason Grusauskas
// 
