import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { successSubscriptionPayment } from "../../checkout";

export function useSuccessSubscriptionPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: successSubscriptionPayment,
    ...mutationOptions,
  });
}
