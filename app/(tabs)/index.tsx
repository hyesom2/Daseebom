import LoginButton from "@/components/login-button";
import MoreButton from '@/components/more-button';
import UserProfile from "@/components/user-profile";
import VideoList from "@/components/video-list";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import useLikedVideos from "@/hooks/use-liked-videos";
import { useUserProfile } from "@/hooks/use-user-profile";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const { accessToken, isLoggedIn, login, request } = useGoogleAuth();
  const { userProfile } = useUserProfile(accessToken);
  const { videos, isLoading, hasMore, loadMoreVideos } = useLikedVideos(accessToken); 

  return (
    <View style={styles.container}>
      {
        !isLoggedIn &&
        <LoginButton
          disabled={!request}
          onPress={login}
        />
      }
      {
        isLoggedIn && userProfile && <UserProfile userProfile={userProfile} />
      }
      
      {isLoggedIn && (
        <VideoList
          videos={videos}
          ListFooterComponent={
            isLoading ? (
              <Text>좋아요 누른 영상을 불러오는 중 입니다.</Text>
            ) : hasMore ? (
              <MoreButton onPress={loadMoreVideos} />
            ) : null
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})