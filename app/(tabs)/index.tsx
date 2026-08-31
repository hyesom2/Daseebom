import LoginButton from "@/components/login-button";
import UserProfile from "@/components/user-profile";
import VideoList from "@/components/video-list";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import useLikedVideos from "@/hooks/use-liked-videos";
import { useUserProfile } from "@/hooks/use-user-profile";
import { ScrollView, Text, View } from "react-native";

export default function App() {
  const { accessToken, isLoggedIn, login, request } = useGoogleAuth();
  const { userProfile } = useUserProfile(accessToken);
  const { videos, isLoading} = useLikedVideos(accessToken); 

  return (
    <View>
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
      <ScrollView showsVerticalScrollIndicator={false} >
        {
          isLoggedIn && isLoading
            ?
          <Text>좋아요 영상을 불러오는 중 입니다.</Text>
            :
          <VideoList videos={videos} />
        }
      </ScrollView>
    </View>
  )
}