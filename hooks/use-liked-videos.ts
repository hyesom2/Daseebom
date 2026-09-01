import { useEffect, useState } from "react";

type VideoItemType = {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      }
    }
    description: string;
  }
};

export default function useLikedVideos(accessToken: string | null) {
  const [likedVideos, setLikedVideos] = useState<VideoItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    setLikedVideos([]);
    setNextPageToken(null);
    fetchLikedVideos(accessToken);
  }, [accessToken]);

  const fetchLikedVideos = async (token: string, pageToken: string | null = null) => {
    setIsLoading(true);

    try {
      let url = "https://www.googleapis.com/youtube/v3/videos" + "?part=snippet,contentDetails,statistics&myRating=like&maxResults=5";
      
      if (pageToken) url += `&pageToken=${pageToken}`;
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      
      if (data.error) {
        console.error('좋아요 누른 영상을 가져오는데 실패했습니다. : ', data.error);
        return;
      }

      setLikedVideos(prev => [...prev, ...data.items]);
      setNextPageToken(data.nextPageToken ?? null);
    } catch (error) {
      console.error('좋아요 누른 영상을 가져오는데 실패했습니다. : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreVideos = () => {
    if (!accessToken || !nextPageToken || isLoading) return;
    fetchLikedVideos(accessToken, nextPageToken);
  }

  return {
    videos: likedVideos,
    isLoading,
    hasMore: !!nextPageToken,
    loadMoreVideos,
  }
}