import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, subscribeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/plans", async (_req, res) => {
    const plans = await storage.getSubscriptionPlans();
    res.json(plans);
  });

  app.post("/api/subscribe", async (req, res) => {
    const result = insertSubscriberSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }

    const subscriber = await storage.createSubscriber(result.data);
    res.json(subscriber);
  });

  app.post("/api/subscriptions", async (req, res) => {
    const result = subscribeSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }

    const subscription = await storage.createUserSubscription(
      result.data.email,
      result.data.planId
    );
    res.json(subscription);
  });

  app.get("/api/subscriptions/:email", async (req, res) => {
    const subscription = await storage.getUserSubscription(req.params.email);
    if (!subscription) {
      return res.status(404).json({ message: "No subscription found" });
    }
    res.json(subscription);
  });

  const httpServer = createServer(app);
  return httpServer;
}