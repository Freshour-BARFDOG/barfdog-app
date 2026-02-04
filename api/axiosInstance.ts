import axios from "axios";
import { attachAuthInterceptors } from "./interceptors";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL_PRODUCT
    : process.env.EXPO_PUBLIC_API_URL_DEV;

// 일반 API 요청용 인스턴스
export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Auth 전용 인스턴스 (토큰 없이 사용 - 로그인, 회원가입, 리프레시 등)
export const publicAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 인터셉터 자동 연결
attachAuthInterceptors(apiClient);

// 기존 호환성을 위해 유지
export const axiosInstance = apiClient;
