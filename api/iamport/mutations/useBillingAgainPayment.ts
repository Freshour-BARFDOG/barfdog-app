import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { billingAgainPayment } from "../iamport";

export function useBillingAgainPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: billingAgainPayment,
    ...mutationOptions,
  });
}
