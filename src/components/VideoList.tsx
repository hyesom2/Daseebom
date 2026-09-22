import VideoCard from '@/components/VideoCard';
import type { YouTubeVideo } from '@/types/youtube';
import { useMemo, useState } from 'react';

type VideoListProps = {
  videos: YouTubeVideo[];
};

const VIDEOS_PER_PAGE = 10;

export default function VideoList({ videos }: VideoListProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleCount, setVisibleCount] = useState(VIDEOS_PER_PAGE);

  const filteredVideos = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) {
      return videos;
    }

    return videos.filter((video) => {
      const title = video.snippet.title.toLowerCase();
      const channel = video.snippet.channelTitle.toLowerCase();

      return title.includes(keyword) || channel.includes(keyword);
    });
  }, [videos, searchKeyword]);

  const visibleVideos = filteredVideos.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + VIDEOS_PER_PAGE);
  };

  return (
    <section>
      <h2>좋아요 표시한 동영상</h2>

      <ul>
        {visibleVideos.map((video) => (
          <li key={video.id}>
            <VideoCard video={video} />
          </li>
        ))}
      </ul>

      {visibleCount < filteredVideos.length && (
        <button type="button" onClick={handleLoadMore}>
          더 보기
        </button>
      )}
    </section>
  );
}
