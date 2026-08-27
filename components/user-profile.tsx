import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  userProfile: {
    name: string;
    email?: string;
    picture: string;
  } | null
}

export default function UserProfile({ userProfile }: Props) {
  if (!userProfile) return null;

  return (
    <View style={ styles.profile}>
      <Image
        source={{ uri: userProfile.picture }}
        style={styles.profileImg} />
      <Text style={ styles.profileName }>{userProfile.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  profileImg: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  profileName: { fontSize: 16, fontWeight: "600" },
});