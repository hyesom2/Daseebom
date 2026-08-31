import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  video: {
    id: string;
    snippet: {
      title: string;
      thumbnails: {
        default: {
          url: string;
        }
      }
      description: string;
    }
  }
}

export default function VideoItem({ video }: Props) {  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: video.snippet.thumbnails.default.url }}
        style={styles.thumbnail}
      />
      <View style={styles.description}>
        <Text>{video.snippet.title}</Text>
        <Text>{video.snippet.description}</Text>
        {/* <Text>채널 이름</Text> */}
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
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  }
});