import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { failGeneralPayment } from "../../checkout";

export function useFailGeneralPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: failGeneralPayment,
    ...mutationOptions,
  });
}
