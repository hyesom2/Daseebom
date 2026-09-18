// React 상태 관리 담당
import { getLikedVideos } from '@/services/youtube';
import { useEffect, useState } from 'react';

export default function useLikedVideos(accessToken: string | null) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchLikedVideos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getLikedVideos(accessToken);
        setVideos(data.items);
      } catch (error) {
        console.error('좋아요 영상을 불러오는데 실패했습니다. : ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedVideos();
  }, [accessToken]);

  return {
    videos,
    isLoading,
    error,
  };
}
