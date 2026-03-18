import { isTokenValid } from "@/utils/auth/jwtValidation";
import { TokenStorage } from "@/utils/auth/tokenStorage";
import { createContext, useContext, useEffect, useState } from "react";

type SessionContextType = {
  session: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function useSession() {
  return useContext(SessionContext);
}

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 앱 시작 시 저장된 토큰 확인
  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = await TokenStorage.getAccessToken();
        if (isTokenValid(token ?? undefined)) {
          setSession(token);
        } else {
          await TokenStorage.clearAllTokens();
          setSession(null);
        }
      } catch {
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const signIn = async (token: string) => {
    await TokenStorage.setAccessToken(token);
    setSession(token);
  };

  const signOut = async () => {
    await TokenStorage.clearAllTokens();
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}
