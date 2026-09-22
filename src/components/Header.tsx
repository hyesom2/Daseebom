import UserProfile from '@/components/UserProfile';
import type { UserInfo } from '@/types/userInfo';

type HeaderProps = {
  userInfo: UserInfo | null;
  logout: () => void;
};

export default function Header({ userInfo, logout }: HeaderProps) {
  return <UserProfile userInfo={userInfo} logout={logout} />;
}
