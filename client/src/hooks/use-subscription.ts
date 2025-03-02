import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserSubscription } from "@shared/schema";

const STORAGE_KEY = "lab49_subscription_email";

export function useSubscription() {
  const { toast } = useToast();
  const storedEmail = localStorage.getItem(STORAGE_KEY);

  const { data: currentSubscription } = useQuery<UserSubscription>({
    queryKey: [`/api/subscriptions/${storedEmail}`],
    enabled: !!storedEmail
  });

  const { mutate: subscribe, isPending: isSubscribing } = useMutation({
    mutationFn: async ({ email, planId }: { email: string; planId: number }) => {
      const res = await apiRequest("POST", "/api/subscriptions", { email, planId });
      return res.json();
    },
    onSuccess: (_, { email }) => {
      localStorage.setItem(STORAGE_KEY, email);
      queryClient.invalidateQueries({ queryKey: [`/api/subscriptions/${email}`] });
      toast({
        title: "Successfully subscribed!",
        description: "You can now access all features of your plan.",
      });
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    currentSubscription,
    subscribe,
    isSubscribing,
    userEmail: storedEmail,
  };
}
