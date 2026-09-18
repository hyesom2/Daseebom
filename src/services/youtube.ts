// API 통신 담당
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function getLikedVideos(accessToken: string) {
  const response = await fetch(
    `${YOUTUBE_API_URL}/videos?part=snippet,contentDetails,statistics&myRating=like&maxResults=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('좋아요 영상을 불러오는데 실패했습니다.');
  }

  return response.json();
}
