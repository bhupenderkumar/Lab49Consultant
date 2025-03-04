import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, subscribeSchema, insertUserSchema, loginSchema } from "@shared/schema";

// Simple session store for demo
const sessions = new Map<string, number>();

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/plans", async (_req, res) => {
    const plans = await storage.getSubscriptionPlans();
    res.json(plans);
  });

  app.post("/api/subscribe", async (req, res) => {
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

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    const result = insertUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }

    const existingUser = await storage.getUserByEmail(result.data.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await storage.createUser(result.data);
    const { password, ...userWithoutPassword } = user;

    // Set session
    sessions.set(req.ip, user.id);

    res.status(201).json(userWithoutPassword);
  });

  app.post("/api/auth/login", async (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }

    const user = await storage.validateUser(result.data.email, result.data.password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password, ...userWithoutPassword } = user;

    // Set session
    sessions.set(req.ip, user.id);

    res.json(userWithoutPassword);
  });

  app.post("/api/auth/logout", (req, res) => {
    sessions.delete(req.ip);
    res.json({ success: true });
  });

  app.get("/api/user", async (req, res) => {
    const userId = sessions.get(req.ip);
    if (!userId) {
      return res.json(null);
    }

    const user = await storage.getUserById(userId);
    if (!user) {
      return res.json(null);
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  const httpServer = createServer(app);
  return httpServer;
}