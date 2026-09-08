import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

export default function SearchBar({ value, onChangeText, onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="제목 또는 채널명 검색"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />
        {
          value.length > 0 && (
            <Pressable
              style={styles.deleteButton}
              onPress={() => onChangeText("")}
            >
              <Ionicons name="close" size={16} color="#666" />
            </Pressable>
          )
        }
      </View>
      <View>
        <Pressable style={styles.searchButton} onPress={onSubmit}>
          <Text style={styles.searchButtonText}>검색</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  wrapper: {
    position: "relative",
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingRight: 40,
  },
  deleteButton: {
    position: "absolute",
    top: "50%",
    right: 8,
    transform: [{ translateY: -9 }],
  },
  searchButton: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 8,
  },
  searchButtonText: {
    color: '#fff',
  }
});