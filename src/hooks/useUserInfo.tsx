import type { UserInfo } from '@/types/userInfo';
import { useEffect, useState } from 'react';

export function useUserInfo(accessToken: string | null) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        if (!response.ok) {
          throw new Error('사용자 정보를 불러오지 못했습니다.');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('사용자의 정보를 불러오는데 실패했습니다. : ', error);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  return { userInfo };
}
