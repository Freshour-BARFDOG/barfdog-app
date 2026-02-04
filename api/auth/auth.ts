import { validateApiResponse } from "@/utils/auth/apiResponseUtils";
import { LoginValues } from "@/utils/validation/auth/login";
import { apiClient, publicAxios } from "../axiosInstance";

const login = async (body: LoginValues) => {
  console.log("📤 로그인 요청:", body);

  const response = await publicAxios.post(
    "/api/v2/public/accounts/signin",
    body,
  );
  console.log("response:", response);

  console.log("📥 로그인 응답:", {
    success: response.data.success,
    hasToken: !!response.headers.authorization,
    token: response.headers.authorization?.substring(0, 20) + "...",
  });

  if (response.data.success) {
    return response;
  }

  throw new Error("로그인 실패");
};

const logout = async () => {
  const { data } = await apiClient.post("/api/v2/user/accounts/signout");

  return validateApiResponse(data, "로그아웃 실패");
};

export { login, logout };
