import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { prepareGeneralPayment } from "../../checkout";

export function usePrepareGeneralPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: prepareGeneralPayment,
    ...mutationOptions,
  });
}
