import { useMutation } from "@tanstack/react-query";
import { login as kakaoLogin } from "@react-native-seoul/kakao-login";
import NaverLogin from "@react-native-seoul/naver-login";
import { router } from "expo-router";

import { loginWithOAuthToken } from "@/api/auth/oauth";
import { NAVER_CONFIG, type SnsProvider } from "@/config/oauth";
import { TokenStorage } from "@/utils/auth/tokenStorage";
import type { UseMutationCustomOptions } from "@/types";

/**
 * 네이티브 SDK로 OAuth access_token을 얻은 후
 * 백엔드에 전달하여 JWT를 받는 mutation.
 */
export function useOAuthLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: async (provider: SnsProvider) => {
      // ① 네이티브 SDK로 OAuth access_token 획득
      const oauthToken = await getOAuthToken(provider);

      // ② 백엔드에 OAuth access_token 전달 → JWT 발급
      return loginWithOAuthToken(provider, oauthToken);
    },

    onSuccess: async ({ response, token }) => {
      if (token) {
        await TokenStorage.setAccessToken(token);
      }

      const result = response.data?.result;

      switch (result) {
        case "ALREADY_LINKED":
        case "NEWLY_LINKED":
        case "NEW_ACCOUNT_AND_LINKED":
          router.replace("/");
          break;

        case "LINK_PROVIDER_CONFLICT":
        case "LINK_EMAIL_CONFLICT":
          // TODO: Alert 표시 후 로그인 화면 유지
          console.warn("SNS 연동 충돌:", response.data);
          break;

        default:
          console.error("예상하지 못한 OAuth 결과:", result);
          break;
      }
    },

    onError: (error) => {
      console.error("OAuth 로그인 실패:", error);
    },

    ...mutationOptions,
  });
}

// ─── SDK별 토큰 획득 ──────────────────────────────────────────────────────────

async function getOAuthToken(provider: SnsProvider): Promise<string> {
  switch (provider) {
    case "kakao": {
      const result = await kakaoLogin();
      return result.accessToken;
    }

    case "naver": {
      NaverLogin.initialize({
        appName: NAVER_CONFIG.appName,
        consumerKey: NAVER_CONFIG.consumerKey,
        consumerSecret: NAVER_CONFIG.consumerSecret,
        serviceUrlSchemeIOS: NAVER_CONFIG.serviceUrlSchemeIOS,
      });

      const result = await NaverLogin.login();

      if (!result.isSuccess || !result.successResponse) {
        throw new Error(
          result.failureResponse?.message ?? "네이버 로그인 실패",
        );
      }

      return result.successResponse.accessToken;
    }

    default:
      throw new Error(`지원하지 않는 프로바이더: ${provider}`);
  }
}