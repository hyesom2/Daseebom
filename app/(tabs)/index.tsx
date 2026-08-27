import LoginButton from "@/components/login-button";
import UserProfile from "@/components/user-profile";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { useUserProfile } from "@/hooks/use-user-profile";
import { View } from "react-native";

export default function App() {
  const { accessToken, isLoggedIn, login, request } = useGoogleAuth();
  const { userProfile } = useUserProfile(accessToken);

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

    </View>
  )
}