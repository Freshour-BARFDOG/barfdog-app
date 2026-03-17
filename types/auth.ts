import type { SnsProvider } from "@/config/oauth";

type SnsLoginResultCode =
  | "ALREADY_LINKED"
  | "NEWLY_LINKED"
  | "NEW_ACCOUNT_AND_LINKED"
  | "LINK_PROVIDER_CONFLICT"
  | "LINK_EMAIL_CONFLICT"
  | "PROFILE_PARSE_FAILED";

interface OAuthLoginData {
  result: SnsLoginResultCode;
  conflictEmail?: string;
  otherSnsProvider?: Uppercase<SnsProvider>;
}

interface OAuthLoginResponse {
  success: boolean;
  data: OAuthLoginData | null;
  message: string | null;
  detailMessage: string | null;
  errorCode: string | null;
}

export type {
  SnsProvider,
  SnsLoginResultCode,
  OAuthLoginData,
  OAuthLoginResponse,
};