import { login } from "@/api/auth/auth";
import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: async (...args: Parameters<typeof login>) => {
      const res = await login(...args);
      const accessToken = res?.headers?.authorization;
      return { response: res, token: accessToken ?? null };
    },
    ...mutationOptions,
  });
}
