import { TokenStorage } from "@/utils/auth/tokenStorage";
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from "./tokenRefresh";

type Cfg = InternalAxiosRequestConfig & { _retry?: boolean };

export function attachAuthInterceptors(apiInstance: AxiosInstance) {
  // Request 인터셉터: 저장된 토큰을 Authorization 헤더에 주입
  apiInstance.interceptors.request.use(
    async (config) => {
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

  // Response 인터셉터: 401 발생 시 refreshAccessToken으로 위임
  // 큐 관리 및 이벤트 발화는 refreshAccessToken 내부에서 처리
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as Cfg;

      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          const token = await refreshAccessToken();
          apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
}
