import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
