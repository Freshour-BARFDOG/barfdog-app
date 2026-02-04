import { TokenStorage } from "@/utils/auth/tokenStorage";
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { publicAxios } from "./axiosInstance";

type Cfg = InternalAxiosRequestConfig & { _retry?: boolean };

export function attachAuthInterceptors(apiInstance: AxiosInstance) {
  // Request 인터셉터: 토큰 주입
  apiInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await TokenStorage.getAccessToken();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response 인터셉터: 401 처리 및 토큰 갱신
  let isRefreshing = false;
  let refreshQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
  }> = [];

  const flushQueue = (error?: any, token?: string) => {
    refreshQueue.forEach((promise) =>
      error ? promise.reject(error) : token && promise.resolve(token),
    );
    refreshQueue = [];
  };

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as Cfg;

      // 401 에러이고, 재시도하지 않은 요청인 경우
      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        // 이미 토큰 갱신 중이면 큐에 추가
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiInstance(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          // 리프레시 토큰으로 새 액세스 토큰 발급
          const response = await publicAxios.post(
            "/api/v2/public/accounts/refresh",
          );

          // 응답 헤더 또는 바디에서 토큰 추출
          const headerToken =
            response.headers?.authorization || response.headers?.Authorization;
          const token =
            typeof headerToken === "string" && headerToken.startsWith("Bearer ")
              ? headerToken.slice(7)
              : response.data?.accessToken;

          if (!token) {
            throw new Error("토큰 재발급 실패");
          }

          // 새 토큰 저장
          await TokenStorage.setAccessToken(token);

          // apiClient의 기본 헤더 업데이트
          apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

          // 큐에 대기 중인 요청들에게 새 토큰 전달
          flushQueue(undefined, token);

          // 원래 요청 재시도
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          // 리프레시 실패 시 큐의 모든 요청 거부
          flushQueue(refreshError);

          // 토큰 삭제 (로그아웃 처리)
          await TokenStorage.clearAllTokens();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
}
