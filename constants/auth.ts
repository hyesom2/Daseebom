function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `환경 변수 ${name}을/를 설정했는지 확인하세요.`
    );
  }
  return value;
}

export const CLIENT_ID = requireEnv(
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  "EXPO_PUBLIC_GOOGLE_CLIENT_ID"
);
export const CLIENT_SECRET = requireEnv(
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET,
  "EXPO_PUBLIC_GOOGLE_CLIENT_SECRET"
);

export const SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const DISCOVERY = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

export const REDIRECT_SCHEME = "daseebom";