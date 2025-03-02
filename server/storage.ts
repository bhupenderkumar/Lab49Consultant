import { 
  type Subscriber, 
  type InsertSubscriber, 
  type SubscriptionPlan,
  type UserSubscription 
} from "@shared/schema";

export interface IStorage {
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getUserSubscription(email: string): Promise<UserSubscription | null>;
  createUserSubscription(email: string, planId: number): Promise<UserSubscription>;
}

export class MemStorage implements IStorage {
  private subscribers: Map<number, Subscriber>;
  private subscriptionPlans: SubscriptionPlan[];
  private userSubscriptions: Map<string, UserSubscription>;
  private currentId: number;
  private currentSubscriptionId: number;

  constructor() {
    this.subscribers = new Map();
    this.userSubscriptions = new Map();
    this.currentId = 1;
    this.currentSubscriptionId = 1;
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
      message: insertSubscriber.message || null
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getUserSubscription(email: string): Promise<UserSubscription | null> {
    return this.userSubscriptions.get(email) || null;
  }

  async createUserSubscription(email: string, planId: number): Promise<UserSubscription> {
    const subscription: UserSubscription = {
      id: this.currentSubscriptionId++,
      email,
      planId,
      createdAt: new Date()
    };
    this.userSubscriptions.set(email, subscription);
    return subscription;
  }
}

export const storage = new MemStorage();