import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { successGeneralPayment } from "../../checkout";

export function useSuccessGeneralPayment(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: successGeneralPayment,
    ...mutationOptions,
  });
}
