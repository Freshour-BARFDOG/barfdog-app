import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/auth";
import {
  deleteSecureStore,
  getSecureStore,
  setSecureStore,
} from "@/utils/auth/secureStore";

export const TokenStorage = {
  // Access Token
  async getAccessToken(): Promise<string | null> {
    return await getSecureStore(ACCESS_TOKEN_KEY);
  },

  async setAccessToken(token: string): Promise<void> {
    await setSecureStore(ACCESS_TOKEN_KEY, token);
  },

  async deleteAccessToken(): Promise<void> {
    await deleteSecureStore(ACCESS_TOKEN_KEY);
  },

  // Refresh Token
  async getRefreshToken(): Promise<string | null> {
    return await getSecureStore(REFRESH_TOKEN_KEY);
  },

  async setRefreshToken(token: string): Promise<void> {
    await setSecureStore(REFRESH_TOKEN_KEY, token);
  },

  async deleteRefreshToken(): Promise<void> {
    await deleteSecureStore(REFRESH_TOKEN_KEY);
  },

  // 모든 토큰 삭제 (로그아웃)
  async clearAllTokens(): Promise<void> {
    await Promise.all([
      deleteSecureStore(ACCESS_TOKEN_KEY),
      deleteSecureStore(REFRESH_TOKEN_KEY),
    ]);
  },
};
