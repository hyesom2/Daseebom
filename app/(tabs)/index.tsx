import LoginButton from "@/components/login-button";
import MoreButton from '@/components/more-button';
import SearchBar from '@/components/search-bar';
import UserProfile from "@/components/user-profile";
import VideoList from "@/components/video-list";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import useLikedVideos from "@/hooks/use-liked-videos";
import { useUserProfile } from "@/hooks/use-user-profile";
import useVideoSearch from '@/hooks/use-video-search';
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const { accessToken, isLoggedIn, login, request } = useGoogleAuth();
  const { userProfile } = useUserProfile(accessToken);
  const { videos, isLoading, hasMore, loadMoreVideos } = useLikedVideos(accessToken); 
  const { query, setQuery, search, results, isSearching, clearSearch } = useVideoSearch(accessToken);

  const isSearchMode = results !== null;

  return (
    <View style={styles.container}>
      {/* 구글 로그인 버튼 */}
      {
        !isLoggedIn &&
        <LoginButton
          disabled={!request}
          onPress={login}
        />
      }
      {/* 유저 프로필 */}
      {
        isLoggedIn && userProfile && <UserProfile userProfile={userProfile} />
      }
      {/* 영상 검색 */}
      {
        isLoggedIn && (
          <SearchBar
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              if (text === "") clearSearch(); // 검색어 지우면 원래 목록으로 복귀
            }}
            onSubmit={search}
          />
        )
      }
      {/* 영상 검색 결과 리스트 */}
      {isLoggedIn && !isSearching && isSearchMode && (
        <VideoList videos={results} />
      )}
      {/* 좋아요 영상 리스트 */}
      {isLoggedIn && !isSearching && !isSearchMode && (
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