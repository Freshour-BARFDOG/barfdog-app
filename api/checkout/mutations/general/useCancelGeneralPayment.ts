import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { cancelGeneralPayment } from "../../checkout";

export function useCancelGeneralPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: cancelGeneralPayment,
    ...mutationOptions,
  });
}
