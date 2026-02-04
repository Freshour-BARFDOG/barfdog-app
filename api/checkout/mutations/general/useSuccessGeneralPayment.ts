import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { successGeneralPayment } from "../../checkout";

export function useSuccessGeneralPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: successGeneralPayment,
    ...mutationOptions,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.BASE],
      });
      mutationOptions?.onSuccess?.(...args);
    },
  });
}
