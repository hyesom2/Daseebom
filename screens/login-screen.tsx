import LoginButton from '@/components/login-button';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

type Props = {
  disabled?: boolean,
  onPress: () => void;
  isLoading?: boolean;
}

export default function LoginScreen({ onPress, disabled, isLoading}: Props ) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/daseebom_logo.webp')}
        style={styles.logo}
      />
      {
        isLoading
          ?
        <ActivityIndicator size="large" color="#FFF" />
          :
        <LoginButton onPress={onPress} disabled={disabled} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#FFAAAA',
    gap: 20,
  },
  logo: {
    width: 300,
    height: 300,
  }
})