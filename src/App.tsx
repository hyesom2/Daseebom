import { useGoogleAuth } from '@/hooks/useGoogleAuth';

export default function App() {
  const { isLoggedIn, login, logout } = useGoogleAuth();

  return (
    <main>
      <h1>daseebom</h1>
      <p>좋아요 한 영상을 검색해서 다시 보자!</p>

      {isLoggedIn ? (
        <button onClick={() => logout()}>로그아웃</button>
      ) : (
        <button onClick={() => login()}>Google로 로그인</button>
      )}
    </main>
  );
}
