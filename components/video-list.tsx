import VideoItem from '@/components/video-item';
import type { ReactElement } from 'react';
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
  ListFooterComponent?: ReactElement | null;
};

export default function VideoList({ videos, ListFooterComponent }: Props) {
  console.log(videos);

  return (
    <FlatList
      style={styles.container}
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <VideoItem video={item} />}
      ListFooterComponent={ListFooterComponent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 8,
    padding: 20,
  }
});