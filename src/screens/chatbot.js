import * as React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Chatbot = () => {
  const background1 = {
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background1}
        resizeMode="cover"
        style={styles.bgImage}
      ></ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Chatbot;
