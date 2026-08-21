import { Image, StyleSheet, Text, View } from "react-native";

export default function UserProfile() {
  return (
    <View style={ styles.profile}>
      <Image
        source={{ uri: "https://i.namu.wiki/i/1mEwgl9rjQOSNrLd0BztTE7NcPOGnzRxHl_SW_uawAxtnMk9Tdzh3wTwqZK7Q1Q3FENfDJ4yqEmRMiKnTg_wNA.webp"}}
        style={styles.profileImg} />
      <Text style={ styles.profileName}>치즈덕</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  profileImg: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  profileName: { fontSize: 16, fontWeight: "600" },
});