import { Image, StyleSheet, Text, View } from 'react-native';

export default function VideoItem() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2017/06/24/04/37/cloud-2436676_1280.jpg' }}
        style={styles.thumbnail}
      />
      <View style={styles.description}>
        <Text>영상 제목</Text>
        <Text>영상 설명</Text>
        <Text>영상 제작자</Text>
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