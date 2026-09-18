export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeVideoSnippet {
  title: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    default: YouTubeThumbnail;
    medium: YouTubeThumbnail;
    high: YouTubeThumbnail;
  };
}

export interface YouTubeVideoContentDetails {
  duration: string;
}

export interface YouTubeVideoStatistics {
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

export interface YouTubeVideo {
  id: string;
  snippet: YouTubeVideoSnippet;
  contentDetails: YouTubeVideoContentDetails;
  statistics?: YouTubeVideoStatistics;
}

export interface YouTubeLikedVideosResponse {
  kind: string;
  etag: string;
  items: YouTubeVideo[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
