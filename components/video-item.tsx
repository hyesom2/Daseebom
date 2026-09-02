import { VideoItemType } from '@/types/video';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  video: VideoItemType;
}

export default function VideoItem({ video }: Props) {  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: video.snippet.thumbnails.default.url }}
        style={styles.thumbnail}
      />
      <View style={styles.description}>
        <Text numberOfLines={2} ellipsizeMode="tail">{video.snippet.title}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail">{video.snippet.description}</Text>
        <Text style={styles.channel} numberOfLines={1} ellipsizeMode="tail">{video.snippet.channelTitle}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 8,
    flexShrink: 0,
  },
  description: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  channel: {
    fontSize: 12,
    color: '#666',
  }
});