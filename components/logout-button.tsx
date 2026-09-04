import { Button } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function LogoutButton({ onPress }: Props) {
  return (
    <Button
      title="로그아웃"
      onPress={onPress}
    />
  )
}