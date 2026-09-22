import type { YouTubeVideo } from '@/types/youtube';
import { useState } from 'react';

type VideoCardProps = {
  video: YouTubeVideo;
};

export default function VideoCard({ video }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <article className="flex flex-col">
      <button type="button" onClick={handleToggle} aria-expanded={isOpen}>
        <img src={video.snippet.thumbnails.medium.url} alt="" />

        <div>
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.channelTitle}</p>
        </div>
      </button>
      {isOpen && (
        <div id={`video-player-${video.id}`}>
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.snippet.title}
              className="absolute insert-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-2 right-2 w-6 h-6 z-100 text-white font-bold"
              aria-label="동영상 닫기"
            >
              X
            </button>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            원본 보기
          </a>
        </div>
      )}
    </article>
  );
}
