import React, { useState } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  Touchable,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StaticImage } from "../../classes/StaticImages";

const ProfileHome = () => {
  const navigator = useNavigation();
  const onSettingsPressed = () => {
    navigator.navigate("Settings");
  };
  /*
  const background1 = {
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };*/
  //const onSettingsPressed = () => {};
  let [value, setValue] = useState("posts");

  const Display = () => {
    if (value === "followers") {
      return (
        <View>
          <Text>All your followers will be listed here </Text>
        </View>
      );
    } else if (value === "saved") {
      return (
        <View>
          <Text>Your saved posts will appear here</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Your Posts will appear here</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={StaticImage.currentBackgroundImage}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <SafeAreaView style={{ left: 18 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View>
              <MaterialCommunityIcons name="account" color={"gray"} size={30}>
                <Text
                  name="profileUsername"
                  style={{ color: "black", fontSize: 18 }}
                >
                  Username
                </Text>
              </MaterialCommunityIcons>

              <Text
                name="profileBio"
                style={{ width: "60%", paddingTop: 5, fontSize: 12 }}
              >
                Here goes the profile discription bio
              </Text>
            </View>

            <View
              style={{
                padding: 5,
                right: 20,
                position: "absolute",
                paddingLeft: 20,
              }}
            >
              <TouchableOpacity onPress={onSettingsPressed}>
                <MaterialCommunityIcons name="tools" color={"grey"} size={20}>
                  <Text
                    style={{ fontSize: 15, color: "black", paddingLeft: 20 }}
                  >
                    Settings
                  </Text>
                </MaterialCommunityIcons>
              </TouchableOpacity>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              margin: 0,
              borderBottomWidth: 2,
              right: 18,
              marginTop: 10,
              backgroundColor: "white",
            }}
          >
            <View style={styles.topBarViews}>
              <TouchableOpacity
                id="yourPosts"
                onPress={() => setValue((value = "posts"))}
              >
                <Text>Posts</Text>
                <Text>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.topBarViews}>
              <TouchableOpacity
                id="yourFollowers"
                onPress={() => setValue((value = "followers"))}
              >
                <Text>Followers</Text>
                <Text>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.topBarViews}>
              <TouchableOpacity
                id="yourSaved"
                onPress={() => setValue((value = "saved"))}
              >
                <Text>Saved</Text>
                <Text>3</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <Display></Display>
          </ScrollView>
        </SafeAreaView>
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
  },
  topBarViews: {
    width: "25%",
    alignContent: "center",
  },
});

export default ProfileHome;
