import VideoList from '@/components/VideoList';
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
    <main>
      <header>
        <button onClick={logout}> 로그아웃</button>
      </header>

      {isLoading && <p>좋아요 영상을 불러오는 중 입니다...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && <VideoList videos={videos} />}
    </main>
  );
}
