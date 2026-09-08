import Header from '@/components/header';
import LoginButton from "@/components/login-button";
import MoreButton from '@/components/more-button';
import SearchBar from "@/components/search-bar";
import VideoList from "@/components/video-list";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import useLikedVideos from "@/hooks/use-liked-videos";
import { useUserProfile } from "@/hooks/use-user-profile";
import useVideoSearch from '@/hooks/use-video-search';
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const { accessToken, isLoggedIn, login, logout, request } = useGoogleAuth();
  const { userProfile } = useUserProfile(accessToken);
  const { videos, isLoading, hasMore, loadMoreVideos } = useLikedVideos(accessToken); 
  const { query, setQuery, search, results, isSearching, clearSearch } = useVideoSearch(accessToken);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isSearchMode = results !== null;

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };

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
        isLoggedIn && userProfile && (
          <Header
            userProfile={userProfile}
            isSearchOpen={isSearchOpen}
            onSearchPress={() => handleSearchToggle()}
          />
        )
      }
      {/* 영상 검색 */}
      {
        isLoggedIn && isSearchOpen && (
          <View style={styles.searchbarWrapper}>
            <SearchBar
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                if (text === "") clearSearch();
              }}
              onSubmit={search}
            />
          </View>
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
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  searchbarWrapper: {
    paddingHorizontal: 20,
  }
})