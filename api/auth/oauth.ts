import type { SnsProvider, OAuthLoginResponse } from "@/types/auth";
import { publicAxios } from "@/api/axiosInstance";

/**
 * OAuth access_token을 Java 백엔드에 전달하여 로그인/회원가입 처리.
 *
 * - 네이티브 SDK가 반환한 OAuth access_token을 그대로 전달
 * - 백엔드가 프로바이더 API로 유저 정보를 조회하고 JWT를 발급
 */
export const loginWithOAuthToken = async (
  provider: SnsProvider,
  accessToken: string,
): Promise<{ response: OAuthLoginResponse; token: string | null }> => {
  const res = await publicAxios.post(
    `/api/v2/public/accounts/signin/${provider}`,
    { accessToken },
  );

  const headers = res.headers as Record<string, string | undefined>;
  const token = headers?.authorization ?? null;

  return { response: res.data, token };
};