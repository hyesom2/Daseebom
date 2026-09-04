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
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{video.snippet.title}</Text>
        <Text style={styles.channelTitle} numberOfLines={1} ellipsizeMode="tail">{video.snippet.channelTitle}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  thumbnail: {
    width: 140,
    minHeight: 100,
    borderRadius: 8,
    flexShrink: 0,
  },
  description: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  channelTitle: {
    fontSize: 12,
    color: '#666',
  }
});