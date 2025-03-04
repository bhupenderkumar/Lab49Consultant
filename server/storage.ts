import { 
  type Subscriber, 
  type InsertSubscriber, 
  type SubscriptionPlan,
  type UserSubscription,
  type User,
  type InsertUser 
} from "@shared/schema";
import { createHash } from 'crypto';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export interface IStorage {
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getUserSubscription(email: string): Promise<UserSubscription | null>;
  createUserSubscription(email: string, planId: number): Promise<UserSubscription>;
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  validateUser(email: string, password: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private subscribers: Map<number, Subscriber>;
  private subscriptionPlans: SubscriptionPlan[];
  private userSubscriptions: Map<string, UserSubscription>;
  private users: Map<number, User>;
  private currentId: number;
  private currentSubscriptionId: number;
  private currentUserId: number;

  constructor() {
    this.subscribers = new Map();
    this.userSubscriptions = new Map();
    this.users = new Map();
    this.currentId = 1;
    this.currentSubscriptionId = 1;
    this.currentUserId = 1;
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      password: hashPassword(insertUser.password),
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = Array.from(this.users.values()).find(u => u.email === email);
    return user || null;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;

    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) return null;

    return user;
  }
}

export const storage = new MemStorage();