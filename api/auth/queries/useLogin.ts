import { login } from "@/api/auth/auth";
import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

import { TokenStorage } from "@/utils/auth/tokenStorage";

export function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: login,
    onSuccess: async (res: any) => {
      const accessToken = res?.headers?.authorization;

      if (accessToken) {
        await TokenStorage.setAccessToken(accessToken);
        console.log("✅ Access Token 저장 완료");
      }
    },
    ...mutationOptions,
  });
}
