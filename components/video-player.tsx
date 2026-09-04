import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { YoutubeView, useYouTubePlayer } from "react-native-youtube-bridge";

type Props = {
  videoId: string;
  onClose: () => void;
};

export default function VideoPlayer({ videoId, onClose }: Props) {
  const player = useYouTubePlayer(videoId);

  return (
    <View style={styles.container}>
      <YoutubeView player={player} width="100%" height="100%" />
      <Pressable style={styles.closeButton} onPress={onClose} hitSlop={10}>
        <Ionicons name="close" size={20} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 16,
    padding: 4,
    zIndex: 1,
  },
});