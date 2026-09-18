import VideoCard from '@/components/VideoCard';
import type { YouTubeVideo } from '@/types/youtube';

type VideoListProps = {
  videos: YouTubeVideo[];
};

export default function VideoList({ videos }: VideoListProps) {
  return (
    <section>
      <h2>좋아요 표시한 동영상</h2>

      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <VideoCard video={video} />
          </li>
        ))}
      </ul>
    </section>
  );
}
