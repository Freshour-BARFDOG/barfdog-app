import { colors } from "@/styles/theme";

export const OAUTH_PROVIDERS = ["kakao", "naver"] as const;
export type SnsProvider = (typeof OAUTH_PROVIDERS)[number];

export interface OAuthProviderConfig {
  label: string;
  backgroundColor: string;
  fontColor: string;
}

export const OAUTH_PROVIDER_CONFIG: Record<SnsProvider, OAuthProviderConfig> = {
  kakao: {
    label: "카카오로 시작하기",
    backgroundColor: colors.kakao.background,
    fontColor: colors.kakao.font,
  },
  naver: {
    label: "네이버로 시작하기",
    backgroundColor: colors.naver.background,
    fontColor: colors.naver.font,
  },
};

export const NAVER_CONFIG = {
  consumerKey: process.env.EXPO_PUBLIC_NAVER_CLIENT_ID ?? "",
  consumerSecret: process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET ?? "",
  appName: process.env.EXPO_PUBLIC_NAVER_APP_NAME ?? "barfdog",
  serviceUrlSchemeIOS: "barfdogapp",
} as const;
