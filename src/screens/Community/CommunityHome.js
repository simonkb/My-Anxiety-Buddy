import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const CommunityHome = () => {
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
  const onUsersPressed = () => {
    navigator.navigate("CommunityUsers");
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
            hight: 80,
            top: 0,
            position: "absolute",
            backgroundColor: "white",
            paddingTop: "15%",
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            opacity: 0.7,
            paddingBottom: 15,
          }}
        >
          <TouchableOpacity>
            <View style={{ marginHorizontal: 20 }}>
              <MaterialCommunityIcons
                name="home"
                color={"grey"}
                size={30}
              ></MaterialCommunityIcons>
              <Text>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onUsersPressed}>
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
        <View
          style={{
            top: 20,
            borderBottomWidth: 1,
            height: "25%",
          }}
        >
          <Text
            style={{
              marginLeft: "10%",
              marginBottom: 5,
              position: "relative",
              marginTop: 20,
              backgroundColor: "gray",
              padding: 2,
              paddingLeft: 10,
              width: 180,
              borderRadius: 15,
              fontWeight: "bold",
              color: "white",
              fontSize: 16,
            }}
          >
            Share your thoughts
          </Text>
          <TextInput
            style={{
              width: "80%",
              padding: 10,
              marginLeft: "10%",
              marginRight: "10%",
              fontSize: 13,
              borderColor: "white",
              borderWidth: 0.5,
              borderRadius: 5,
              height: "50%",
              shadowColor: "grey",
              shadowOpacity: 1,
              backgroundColor: "white",
              opacity: 0.5,
              maxHeight: 50,
            }}
            multiline={true}
            numberOfLines={10}
            maxLength={200}
            autoFocus={true}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", alignSelf: "center", fontSize: 16 }}>
              Share now
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: "10%",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Trending posts
          </Text>
        </View>

        <View
          style={{
            flex: 0.7,
          }}
        >
          <ScrollView></ScrollView>
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
  button: {
    width: 100,
    height: 30,
    backgroundColor: "rgba(142,94,181,1)",
    borderRadius: 15,
    margin: 10,
    padding: 3,
    right: "10%",
    left: "60%",
  },
});

export default CommunityHome;
