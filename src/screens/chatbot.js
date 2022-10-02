import * as React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import bg1 from "../../assets/bg1.jpeg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import { useGlobalState } from "../states/state.js";
const Chatbot = () => {
  //Updating background
  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }
  //
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
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
