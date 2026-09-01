import { Button } from 'react-native';

type Props = {
  onPress: () => void;
}

export default function MoreButton({ onPress }: Props) {
  return (
    <Button title="더 불러오기" onPress={onPress} />
  )
}