import type { YouTubeVideo } from '@/types/youtube';

type VideoCardProps = {
  video: YouTubeVideo;
};

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div>
      <img src={video.snippet.thumbnails.medium.url} alt="" />

      <div>
        <h3>{video.snippet.title}</h3>
        <p>{video.snippet.channelTitle}</p>
      </div>
    </div>
  );
}
