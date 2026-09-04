import VideoListItem from '@/components/video-list-item';
import useExpandableVideo from '@/hooks/use-expandable-video';
import { VideoItemType } from '@/types/video';
import type { ReactElement } from 'react';
import { FlatList, StyleSheet } from 'react-native';

type Props = {
  videos: VideoItemType[];
  ListFooterComponent?: ReactElement | null;
};

export default function VideoList({ videos, ListFooterComponent }: Props) {
  const { isExpanded, toggle } = useExpandableVideo();
  console.log(videos);

  return (
    <FlatList
      style={styles.container}
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <VideoListItem
          video={item}
          isExpanded={isExpanded(item.id)}
          onToggle={() => toggle(item.id)}
        />
      )}
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