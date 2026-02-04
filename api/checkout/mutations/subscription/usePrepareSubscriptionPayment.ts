import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { prepareSubscriptionPayment } from "../../checkout";

export function usePrepareSubscriptionPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: prepareSubscriptionPayment,
    ...mutationOptions,
  });
}
