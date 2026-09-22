import type { UserInfo } from '@/types/userInfo';
import { useState } from 'react';

type UserProfileProps = {
  userInfo: UserInfo | null;
  logout: () => void;
};

export default function UserProfile({ userInfo, logout }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative flex flex-col">
      <button onClick={handleToggleMenu}>
        <img src={userInfo?.picture} alt="" />
      </button>

      {isOpen ? (
        <ul className="absolute top-full flex flex-col bg-white">
          <li>
            <h3>{userInfo?.name}님 어서오세요!</h3>
          </li>
          <li>
            <a>마이페이지로 이동</a>
          </li>
          <li>
            <button onClick={logout}>로그아웃</button>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}
