import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const ACCESS_TOKEN_KEY = 'daseebom_access_token';

export function useGoogleAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );

  const login = useGoogleLogin({
    flow: 'implicit',

    scope: 'https://www.googleapis.com/auth/youtube.readonly',

    onSuccess: (tokenResponse) => {
      const token = tokenResponse.access_token;

      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      setAccessToken(token);
    },

    onError: () => {
      console.error('Google 로그인에 실패했습니다.');
    },
  });

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setAccessToken(null);
  };

  return {
    accessToken,
    isLoggedIn: !!accessToken,
    login,
    logout,
  };
}
