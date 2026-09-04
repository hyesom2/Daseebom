import { CLIENT_ID, CLIENT_SECRET, DISCOVERY, REDIRECT_SCHEME, SCOPES } from "@/constants/auth";
import { storage } from "@/lib/storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({ scheme: REDIRECT_SCHEME });

export function useGoogleAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri,
      responseType: "code",
      usePKCE: true,
      extraParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
    DISCOVERY
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      exchangeCodeForToken(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          code,
          redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier ?? "",
          },
        },
        DISCOVERY
      );

      await storage.setItem("access_token", tokenResponse.accessToken);
      if (tokenResponse.refreshToken) {
        await storage.setItem("refresh_token", tokenResponse.refreshToken);
      }

      setAccessToken(tokenResponse.accessToken);
      setIsLoggedIn(true);
    } catch (e) {
      console.error("토큰 교환 실패:", e);
    }
  };

  const login = () => promptAsync();

  const logout = async () => {
    if (accessToken) {
      try {
        await fetch(
          `https://oauth2.googleapis.com/revoke?token=${accessToken}`,
          { method: "POST" }
        );
      } catch (error) {
        console.error("토큰 취소 요청 실패했습니다. :", error);
      }
    }

    await storage.removeItem("access_token");
    await storage.removeItem("refresh_token");
    setAccessToken(null);
    setIsLoggedIn(false);
  };

  return { accessToken, isLoggedIn, login, logout, request };
}