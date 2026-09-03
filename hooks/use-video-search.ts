import { VideoItemType } from "@/types/video";
import { useEffect, useRef, useState } from "react";

export default function useVideoSearch(accessToken: string | null) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<VideoItemType[] | null>(null); // null = 검색 실행 전
  const [isSearching, setIsSearching] = useState(false);

  // 전체 좋아요 목록 캐시 (한 번 가져오면 재사용)
  const allVideosCache = useRef<VideoItemType[] | null>(null);

  // accessToken이 바뀌면(재로그인 등) 캐시 초기화
  useEffect(() => {
    allVideosCache.current = null;
    setQuery("");
    setResults(null);
  }, [accessToken]);

  const fetchAllLikedVideos = async (token: string): Promise<VideoItemType[]> => {
    let all: VideoItemType[] = [];
    let pageToken: string | null = null;

    do {
      let url =
        "https://www.googleapis.com/youtube/v3/videos" +
        "?part=snippet&myRating=like&maxResults=50";
      if (pageToken) url += `&pageToken=${pageToken}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.error) {
        console.error("전체 좋아요 목록을 가져오는데 실패했습니다. : ", data.error);
        break;
      }

      all = [...all, ...data.items];
      pageToken = data.nextPageToken ?? null;
    } while (pageToken);

    return all;
  };

  const search = async () => {
    const keyword = query.trim().toLowerCase();

    if (!accessToken || !keyword) {
      setResults(null);
      return;
    }

    setIsSearching(true);
    try {
      // 캐시가 없으면(처음 검색이면) 전체 목록을 끝까지 가져와서 저장
      if (!allVideosCache.current) {
        allVideosCache.current = await fetchAllLikedVideos(accessToken);
      }

      const filtered = allVideosCache.current.filter(
        (video) =>
          video.snippet.title.toLowerCase().includes(keyword) ||
          video.snippet.channelTitle.toLowerCase().includes(keyword)
      );

      setResults(filtered);
    } catch (error) {
      console.error("검색에 실패했습니다. : ", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults(null);
  };

  return { query, setQuery, search, results, isSearching, clearSearch };
}