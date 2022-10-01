import * as React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StaticImage } from "../classes/StaticImages.js";
const Chatbot = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={StaticImage.currentBackgroundImage}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Image
          style={{
            width: "100%",

            height: "100%",

            flex: 100,

            top: -100,

            start: -1,
          }}
          resizeMode="contain"
          source={require("../../assets/Head.jpg")}
        ></Image>

        <Image
          style={{ width: 50, height: 50, start: 350, top: -160 }}
          resizeMode="contain"
          source={require("../../assets/Person.jpg")}
        ></Image>

        <Image
          style={{ width: 300, height: 400, flex: 100, top: -350, start: 40 }}
          resizeMode="contain"
          source={require("../../assets/msgbubble.png")}
        ></Image>
      </ImageBackground>
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
