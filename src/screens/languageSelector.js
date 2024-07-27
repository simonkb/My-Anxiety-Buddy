import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

const languages = {
  en: { nativeName: "English" },
  ar: { nativeName: "العربية" },
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(languages)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => changeLanguage(item)}
            style={styles.button}
          >
            <Text
              style={[
                styles.text,{fontWeight: i18n.resolvedLanguage === item ? "900" : "normal",},]}
            >
              {languages[item].nativeName}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10
  },
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: "#DDDD",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default LanguageSelector;
