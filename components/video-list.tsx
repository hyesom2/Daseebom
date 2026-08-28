import VideoItem from '@/components/video-item';
import { StyleSheet, View } from 'react-native';

export default function VideoList() {
  return (
    <View style={styles.container}>
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }
});