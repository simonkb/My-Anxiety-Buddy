import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

const LEVELS = [
  {
    label: "Easy",
    value:
      "https://firebasestorage.googleapis.com/v0/b/anti-anxiety-6a2fd.appspot.com/o/videos%2Feasy.mp4?alt=media&token=cc1040c9-3ea1-4340-8560-d2f87c833e0e",
  },
  {
    label: "Medium",
    value:
      "https://firebasestorage.googleapis.com/v0/b/anti-anxiety-6a2fd.appspot.com/o/videos%2Fmedium.mp4?alt=media&token=4b630acb-6cf9-47e2-90a7-dc5b4ffc524c",
  },
  {
    label: "Hard",
    value:
      "https://firebasestorage.googleapis.com/v0/b/anti-anxiety-6a2fd.appspot.com/o/videos%2Fhard.mp4?alt=media&token=d5b1f9bd-ff7c-478f-8de6-2aa0e1d3a79b",
  },
];

const LevelPicker = ({ selectedLevel, onLevelSelected }) => {
  const [scrollViewRef, setScrollViewRef] = useState(null);

  const handleLevelSelected = (level) => {
    onLevelSelected(level);
    if (scrollViewRef) {
      scrollViewRef.scrollToEnd();
    }
  };
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      {LEVELS.map((level) => (
        <TouchableOpacity
          key={level.value}
          style={[
            styles.levelButton,
            level.value === selectedLevel ? styles.selectedLevelButton : null,
          ]}
          onPress={() => handleLevelSelected(level.value)}
        >
          <Text
            style={[
              styles.levelText,
              level.value === selectedLevel ? styles.selectedLevelText : null,
            ]}
          >
            {t(level.label)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    height: 50,
    flexDirection: "row",
  },
  levelButton: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
    marginHorizontal: 8,
    justifyContent:'center'
  },
  selectedLevelButton: {
    backgroundColor: "green",
  },
  levelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedLevelText: {
    color: "#fff",
  },
});
export default LevelPicker;
