import * as React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CommunityUsers = () => {
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
  const navigator = useNavigation();
  const onHomePressed = () => {
    navigator.navigate("CommunityHome");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            hight: 70,
            top: 0,
            position: "absolute",
            backgroundColor: "white",
            paddingTop: 30,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            opacity: 0.7,
          }}
        >
          <TouchableOpacity onPress={onHomePressed}>
            <View style={{ marginHorizontal: 20 }}>
              <MaterialCommunityIcons
                name="home"
                color={"grey"}
                size={30}
              ></MaterialCommunityIcons>
              <Text>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <MaterialCommunityIcons
                name="account-multiple"
                color={"grey"}
                size={30}
              ></MaterialCommunityIcons>
              <Text>Users</Text>
            </View>
          </TouchableOpacity>
        </View>
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

export default CommunityUsers;
