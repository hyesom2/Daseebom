import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import useLikedVideos from '@/hooks/useLikedVideos';

export default function App() {
  const { accessToken, isLoggedIn, login, logout } = useGoogleAuth();
  const { videos, isLoading, error } = useLikedVideos(accessToken);

  if (!isLoggedIn) {
    return (
      <main>
        <h1>daseebom</h1>
        <p>좋아요 한 영상을 검색해서 다시 보자!</p>

        <button onClick={() => login()}>Google로 로그인</button>
      </main>
    );
  }

  return (
    <>
      <button onClick={logout}> 로그아웃</button>
      {isLoading && <p>좋아요 영상을 불러오는 중 입니다...</p>}
      {
        <ul>
          {videos.map((video) => (
            <li key={video.snippet.channelId}>
              <img src={video.snippet.thumbnails.medium.url} alt="" />

              <p>{video.snippet.title}</p>
              <span>{video.snippet.channelTitle}</span>
            </li>
          ))}
        </ul>
      }
    </>
  );
}
