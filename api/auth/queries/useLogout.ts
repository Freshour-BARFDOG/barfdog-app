import { UseMutationCustomOptions } from "@/types";
import { TokenStorage } from "@/utils/auth/tokenStorage";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../auth";

export function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // 모든 토큰 삭제 (로그아웃)
      await TokenStorage.clearAllTokens();
      console.log("✅ 토큰 삭제 완료");
    },
    ...mutationOptions,
  });
}
