import { Button } from 'react-native';

type Props = {
  disabled: boolean;
  onPress: () => void;
}

export default function LoginButton({ disabled, onPress }: Props) {
  return (
    <Button
      title="구글로 계속하기"
      disabled={disabled}
      onPress={onPress}
    />
  )
}