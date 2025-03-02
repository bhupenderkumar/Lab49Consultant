import { 
  type Subscriber, 
  type InsertSubscriber, 
  type SubscriptionPlan 
} from "@shared/schema";

export interface IStorage {
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private subscribers: Map<number, Subscriber>;
  private subscriptionPlans: SubscriptionPlan[];
  private currentId: number;

  constructor() {
    this.subscribers = new Map();
    this.currentId = 1;
    this.subscriptionPlans = [
      {
        id: 1,
        name: "Starter",
        price: 499,
        features: ["AI Readiness Assessment", "Basic Consulting", "Weekly Reports"]
      },
      {
        id: 2,
        name: "Professional",
        price: 999,
        features: ["Everything in Starter", "Custom AI Solutions", "24/7 Support", "Monthly Strategy Reviews"]
      },
      {
        id: 3,
        name: "Enterprise",
        price: 2499,
        features: ["Everything in Professional", "Dedicated Team", "Custom Integration", "Priority Support"]
      }
    ];
  }

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlans;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentId++;
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      createdAt: new Date(),
      message: insertSubscriber.message || null // Convert undefined to null
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();