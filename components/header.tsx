import UserProfile from "@/components/user-profile";
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  userProfile: {
    name: string;
    email?: string;
    picture: string;
  } | null,
  isSearchOpen?: boolean,
  onSearchPress: () => void,
}

export default function Header({ userProfile, isSearchOpen, onSearchPress }: Props) {
  return (
    <View style={styles.container}>
      <UserProfile userProfile={userProfile} />
      <View style={styles.iconContainer}>
        <Pressable onPress={onSearchPress}>
          {
            isSearchOpen
              ?
            <Ionicons name="close" size={24} color="black" />
              :
            <Ionicons name="search" size={24} color="black" />
          }
        </Pressable>
        <Pressable>
          <Ionicons name="ellipsis-vertical" size={24}  color="black" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16
  }
});