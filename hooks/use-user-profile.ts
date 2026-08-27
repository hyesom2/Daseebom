import { useEffect, useState } from "react";

type UserProfile = {
  name: string;
  email?: string;
  picture: string;
}

// > 유저 프로필 가져오기
export function useUserProfile(accessToken: string | null) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setUserProfile(null);
      return;
    }
    fetchUserProfile(accessToken);
  }, [accessToken]);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.error) {
        console.error("프로필을 가져오는데 실패했습니다. :", data.error);
        return;
      }
      setUserProfile(data);
    } catch (e) {
      console.error("프로필을 가져오는데 실패했습니다. :", e);
    }
  };

  return { userProfile };
}