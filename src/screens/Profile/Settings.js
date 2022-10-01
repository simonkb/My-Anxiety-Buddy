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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import bgImage1 from "../../../assets/bg1.jpeg";
import bgImage2 from "../../../assets/bg2.jpg";
import bgImage3 from "../../../assets/bg3.jpg";
import { StaticImage } from "../../classes/StaticImages.js";
let bg1 = bgImage1;
let bg2 = bgImage2;
let bg3 = bgImage3;

const Settings = () => {
  let [value, setValue] = useState("all");
  let [bgImageUri, setbgImageUri] = useState(bg1);
  const navigator = useNavigation();
  const onEditProfilePressed = () => {
    navigator.navigate("EditProfile");
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
      function onSaveBackGround() {
        StaticImage.setCurrentBackgroundImage(bgImageUri);
        //Reloading
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
              <Image source={bgImage2} style={styles.bgImageOptions}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setbgImageUri(bg3)}>
              <Image source={bgImage3} style={styles.bgImageOptions}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setbgImageUri(bg1)}>
              <Image source={bgImage1} style={styles.bgImageOptions}></Image>
            </TouchableOpacity>
          </ScrollView>
          <Button title="Done" onPress={() => onSaveBackGround()}></Button>
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
            onPress={() => setValue((value = "changeLanguage"))}
          >
            <MaterialCommunityIcons name="security" size={20}>
              <Text> Privacy</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      );
    }
  };
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
          Username
        </Text>
        <TouchableOpacity style={styles.button} onPress={onEditProfilePressed}>
          <Text style={styles.buttonText}>Edit profile</Text>
        </TouchableOpacity>
        <ScrollView
          style={{
            width: "100%",
            marginBottom: "20%",
            marginTop: 10,
            borderWidth: 1,
            backgroundColor: "white",
            borderColor: "white",
            opacity: 0.8,
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
    backgroundColor: "rgba(142,94,181,1)",
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
