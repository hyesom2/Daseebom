import VideoItem from "@/components/video-item";
import VideoPlayer from "@/components/video-player";
import { VideoItemType } from "@/types/video";
import { useEffect, useRef } from "react";
import { Animated, Pressable, useWindowDimensions, View } from "react-native";

type Props = {
  video: VideoItemType;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function VideoListItem({ video, isExpanded, onToggle }: Props) {
  const { width } = useWindowDimensions();
  const playerHeight = (width * 9) / 16;

  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? playerHeight : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isExpanded, playerHeight, animatedHeight]);

  return (
    <View>
      <Pressable onPress={onToggle}>
        <VideoItem video={video} />
      </Pressable>

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isExpanded && <VideoPlayer videoId={video.id} onClose={onToggle} />}
      </Animated.View>
    </View>
  );
}