import * as React from "react";
import { ImageBackground, StyleSheet, View, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profile = () => {
  const background1 = {
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };
  const navigator = useNavigation();
  const onLogoutPressed = () => {
    //validate user
    navigator.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background1}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View style={{ top: 60, left: 18 }}>
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
                Here goes the profile discription
              </Text>
            </View>

            <View style={{ padding: 5, right: 20, position: "absolute" }}>
              <MaterialCommunityIcons
                name="tools"
                color={"grey"}
                size={25}
                style={{}}
              >
                <Text style={{ fontSize: 18, color: "black" }}>Settings</Text>
              </MaterialCommunityIcons>
              <MaterialCommunityIcons
                name="comment-edit"
                color={"gray"}
                size={25}
              >
                <Text style={{ fontSize: 18, color: "black" }}>
                  Create post
                </Text>
              </MaterialCommunityIcons>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
});

export default Profile;
