import * as React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StaticImage } from "../classes/StaticImages.js";

const Community = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={StaticImage.currentBackgroundImage}
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

export default Community;
