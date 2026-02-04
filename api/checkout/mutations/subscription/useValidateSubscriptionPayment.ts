import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { validateSubscriptionPayment } from "../../checkout";

export function useValidateSubscriptionPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: validateSubscriptionPayment,
    ...mutationOptions,
  });
}
