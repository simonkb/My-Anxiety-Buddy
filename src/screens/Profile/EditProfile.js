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
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";
const EditProfile = () => {
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
  const navigator = useNavigation();
  const profilePicture = {
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/I1FDrRUQF9bnrTsQcmUnOnu0.png",
  };
  const onSavePressed = () => {
    Alert.alert("Success", "Changes saved successfuly");
    navigator.navigate("Settings");
  };
  const onCancelPressed = () => {
    navigator.navigate("Settings");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <SafeAreaView
          style={{ backgroundColor: "white", opacity: 0.7, height: "100%" }}
        >
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View>
                  <TouchableOpacity>
                    <Image
                      source={profilePicture}
                      style={styles.profilePictureStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    name="profileUsername"
                    style={{ color: "black", fontSize: 18, paddinleft: 50 }}
                  >
                    Username
                  </Text>
                  <TextInput
                    placeholder="Old Username is shown here"
                    style={{
                      backgroundColor: "white",

                      opacity: 1,
                      fontSize: 16,
                      borderColor: "gray",
                      borderWidth: 0.5,
                      width: "100%",
                      padding: 10,
                      borderRadius: 15,
                      shadowColor: "grey",
                      shadowOpacity: 0.5,
                    }}
                  ></TextInput>
                </View>
              </View>
              <TextInput
                placeholder="First name"
                style={styles.testInputStyle}
              />
              <TextInput
                placeholder="Last name"
                style={styles.testInputStyle}
              />
              <TextInput placeholder="Email" style={styles.testInputStyle} />
              <TextInput
                placeholder="Phone Number"
                style={styles.testInputStyle}
              />
              <TextInput
                placeholder="Date of Birth"
                style={styles.testInputStyle}
              />
              <TextInput placeholder="Location" style={styles.testInputStyle} />
              <Text style={styles.testInputStyle}>Edit Bio</Text>
              <TextInput
                placeholder="Bio"
                style={styles.bioFieldStyle}
                multiline={true}
                numberOfLines={10}
                maxLength={100}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  margin: 15,
                }}
              >
                <View
                  style={{
                    margin: 20,
                    flexDirection: "row",
                  }}
                >
                  <Button title="Save" onPress={() => onSavePressed()} />
                  <Button title="Cancel" onPress={() => onCancelPressed()} />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
  profilePictureStyle: {
    width: 80,
    height: 60,
    opacity: 1,
  },
  testInputStyle: {
    backgroundColor: "white",

    opacity: 1,
    fontSize: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "80%",
    padding: 5,
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 10,
  },
  bioFieldStyle: {
    width: "80%",
    padding: 10,
    marginLeft: "10%",
    marginRight: "10%",
    fontSize: 20,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    height: "10%",
    shadowColor: "grey",
    shadowOpacity: 0.5,
  },
});

export default EditProfile;
