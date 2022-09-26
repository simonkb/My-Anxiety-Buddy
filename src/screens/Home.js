import * as React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const Home = () => {
  const background1 = {
    //uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
    //uri: "https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png",
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };

  return (
    <ImageBackground
      source={background1}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Image
        style={{ width: 301, height: 250 }}
        resizeMode="contain"
        source={{
          uri: "https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png",
        }}
      ></Image>
    </ImageBackground>
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

export default Home;
