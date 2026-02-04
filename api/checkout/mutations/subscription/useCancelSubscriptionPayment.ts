import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { cancelSubscriptionPayment } from "../../checkout";

export function useCancelSubscriptionPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: cancelSubscriptionPayment,
    ...mutationOptions,
  });
}
