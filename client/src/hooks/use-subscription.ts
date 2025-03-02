import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "user_email";

export function useSubscription() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get the stored email
  const getStoredEmail = () => localStorage.getItem(STORAGE_KEY);
  const setStoredEmail = (email: string) => localStorage.setItem(STORAGE_KEY, email);

  // Get current subscription
  const { data: subscription } = useQuery({
    queryKey: ["/api/subscriptions", getStoredEmail()],
    enabled: !!getStoredEmail(),
  });

  // Subscribe to a plan
  const subscribeMutation = useMutation({
    mutationFn: async ({ email, planId }: { email: string; planId: number }) => {
      setStoredEmail(email);
      await apiRequest("POST", "/api/subscriptions", { email, planId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
      toast({
        title: "Subscription successful!",
        description: "You have successfully subscribed to the plan.",
      });
    },
    onError: () => {
      toast({
        title: "Subscription failed",
        description: "Failed to subscribe to the plan. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    currentSubscription: subscription,
    subscribe: subscribeMutation.mutate,
    isSubscribing: subscribeMutation.isPending,
    userEmail: getStoredEmail(),
  };
}
