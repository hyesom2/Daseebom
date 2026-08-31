import VideoItem from '@/components/video-item';
import { FlatList, StyleSheet } from 'react-native';

type Props = {
  videos: {
    id: string;
    snippet: {
      title: string;
      thumbnails: {
        default: {
          url: string;
        }
      }
      description: string;
    };
  }[];
};

export default function VideoList({ videos }: Props) {
  console.log(videos);
  
  return (
    <FlatList
      style={styles.container}
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <VideoItem video={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }
});