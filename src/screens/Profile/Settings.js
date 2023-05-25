import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Button,
  Touchable,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";
import { useRoute } from "@react-navigation/native";

const Settings = (navigation) => {
  let [value, setValue] = useState("all");
  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }
  let [bgImageUri, setbgImageUri] = useState(currentBg);
  const navigator = useNavigation();
  const onEditProfilePressed = () => {
    navigator.navigate("Edit Profile");
  };
  const onSavePressed = () => setValue((value = "all"));
  const onCancelPressed = () => setValue((value = "all"));

  const Display = () => {
    if (value === "authentication") {
      return (
        <View>
          <TouchableOpacity style={styles.rowStyle}>
            <MaterialCommunityIcons name="security" size={20}>
              <Text> Authentication</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <Button title="Save" onPress={() => onSavePressed()}></Button>
          <Button title="Cancel" onPress={() => onCancelPressed()}></Button>
        </View>
      );
    } else if (value === "changeBackground") {
      function onDonePressed() {
        if (bgImageUri === bg1) {
          setGlobalState("defaultBackgroundImage", "bgPink");
        } else if (bgImageUri === bg2) {
          setGlobalState("defaultBackgroundImage", "bgBlue");
        } else {
          setGlobalState("defaultBackgroundImage", "bgOrange");
        }
        return setValue((value = "all"));
      }
      return (
        <View>
          <TouchableOpacity style={styles.rowStyle}>
            <MaterialCommunityIcons name="image" size={20}>
              <Text> Change Background</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <ScrollView horizontal={true}>
            <TouchableOpacity onPress={() => setbgImageUri(bg2)}>
              <Image source={bg2} style={styles.bgImageOptions}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setbgImageUri(bg3)}>
              <Image source={bg3} style={styles.bgImageOptions}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setbgImageUri(bg1)}>
              <Image source={bg1} style={styles.bgImageOptions}></Image>
            </TouchableOpacity>
          </ScrollView>
          <View
            style={{
              maxWidth: 110,
              alignSelf: "center",
            }}
          >
            <Button title="Save" onPress={() => onDonePressed()}></Button>
          </View>
        </View>
      );
    } else if (value === "changeLanguage") {
      return (
        <View>
          <TouchableOpacity style={styles.rowStyle}>
            <MaterialCommunityIcons name="globe-model" size={20}>
              <Text> Change language</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <Button title="Save" onPress={() => onSavePressed()}></Button>
          <Button title="Cancel" onPress={() => onCancelPressed()}></Button>
        </View>
      );
    } else if (value === "privacy") {
      return (
        <View>
          <TouchableOpacity style={styles.rowStyle}>
            <MaterialCommunityIcons name="security" size={20}>
              <Text> Privacy</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <Button title="Save" onPress={() => onSavePressed()}></Button>
          <Button title="Cancel" onPress={() => onCancelPressed()}></Button>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => setValue((value = "authentication"))}
          >
            <MaterialCommunityIcons name="security" size={20}>
              <Text> Authentication</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => setValue((value = "changeBackground"))}
          >
            <MaterialCommunityIcons name="image" size={20}>
              <Text> Change Background</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => setValue((value = "changeLanguage"))}
          >
            <MaterialCommunityIcons name="globe-model" size={20}>
              <Text> Change language</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => setValue((value = "privacy"))}
          >
            <MaterialCommunityIcons name="security" size={20}>
              <Text> Privacy</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
          <View
            style={{
              alignContent: "center",
              alignSelf: "center",
              borderTopWidth: 0.5,
              width: "80%",
              margin: "10%",
            }}
          >
            <View
              style={{
                maxWidth: 100,
                borderRadius: 15,
                alignContent: "center",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              <Button
                title="Logout"
                onPress={() => {
                  signOut(auth)
                    .then(() => {
                      Alert.alert("Success", "Logout successful!");
                      //navigator.navigate("Auth");
                    })
                    .catch((error) => {
                      Alert.alert("Error", error);
                    });
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };
  const route = useRoute();
  const { username } = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImageUri}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/yXdAlYJrVTzc6av6TE0gDLgJ.png",
            }}
            style={{
              alignSelf: "center",
              borderRadious: null,
              width: 71,
              height: 67,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: "black",
            alignSelf: "center",
            fontStyle: "normal",
            fontSize: 26,
          }}
        >
          {username}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onEditProfilePressed}>
          <Text style={styles.buttonText}>Edit profile</Text>
        </TouchableOpacity>

        <ScrollView
          style={{
            width: "100%",
            marginBottom: "0%",
            marginTop: 10,
            borderWidth: 1,
            backgroundColor: "rgba(217, 217, 217, 0.53)",
            borderColor: "white",
          }}
        >
          <Display />
        </ScrollView>
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
    width: "100%",
    height: "100%",
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
  button: {
    width: 140,
    height: 40,
    alignSelf: "center",
    backgroundColor: "green",
    borderRadius: 15,
    margin: 10,
    padding: 5,
    alignContent: "center",
  },
  rowStyle: {
    margin: 10,
  },
  bgImageOptions: {
    width: 100,
    height: 200,
    margin: 15,
  },
});

export default Settings;
