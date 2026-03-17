import CookieManager from "@preeternal/react-native-cookie-manager";

export async function setAccessTokenCookie(
  baseUrl: string,
  token: string,
): Promise<void> {
  await CookieManager.set(baseUrl, {
    name: "accessToken",
    value: token,
    path: "/",
    secure: true,
    httpOnly: false,
  });
}
