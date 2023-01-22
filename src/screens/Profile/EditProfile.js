import React, { useEffect, useState } from "react";
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
  Spinner,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";
import { db, auth } from "../../config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import firebase from "firebase/app";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [username, onChangeUsername] = React.useState(
    useGlobalState("currentUser")[0].username
  );
  const [firstName, onChangeFirstName] = React.useState(
    useGlobalState("currentUser")[0].firstName
  );
  const [lastName, onChangeLastName] = React.useState(
    useGlobalState("currentUser")[0].lastName
  );
  const [email, onChangeEmail] = React.useState(
    useGlobalState("currentUser")[0].email_address
  );
  const [phone, onChangePhone] = React.useState(
    useGlobalState("currentUser")[0].phone_number
  );
  const [birthDate, onChangeBirthDate] = React.useState(
    useGlobalState("currentUser")[0].birthDate
  );
  const [location, onChangeLocation] = React.useState(
    useGlobalState("currentUser")[0].location
  );
  const [bio, onChangeBio] = React.useState(
    useGlobalState("currentUser")[0].bio
  );
  const onSavePressed = () => {
    onAuthStateChanged(auth, async (user) => {
      const usersRef = collection(db, "Users");
      if (user != null) {
        await updateDoc(doc(usersRef, user.uid), {
          username: username,
          phone_number: phone,
          bio: bio,
          firstName: firstName,
          lastName: lastName,
          birthDate: date.toLocaleDateString(),
          email_address: email,
          location: location,
        })
          .then(() => {
            console.log("Document successfully updated!");
            navigator.navigate("Settings");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    });
  };

  const onCancelPressed = () => {
    navigator.navigate("Settings");
  };

  const [date, setDate] = useState(
    new Date(useGlobalState("currentUser")[0].birthDate)
  );
  const [show, setShow] = useState(Platform.OS === "ios");
  const [mode, setMode] = useState("date");
  const [dateText, setText] = useState("Empty");

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
                    onChangeText={onChangeUsername}
                    value={username}
                  ></TextInput>
                </View>
              </View>
              <TextInput
                placeholder="First name"
                style={styles.testInputStyle}
                onChangeText={onChangeFirstName}
                value={firstName}
              />
              <TextInput
                placeholder="Last name"
                style={styles.testInputStyle}
                onChangeText={onChangeLastName}
                value={lastName}
              />
              <TextInput
                placeholder="Email"
                style={styles.testInputStyle}
                onChangeText={onChangeEmail}
                value={email}
                editable={false}
              />
              <TextInput
                placeholder="Phone Number"
                style={styles.testInputStyle}
                onChangeText={onChangePhone}
                value={phone}
              />
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  marginHorizontal: "10%",
                  marginTop: 10,
                }}
              >
                <View>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    {Platform.OS === "ios" ? (
                      <Text style={{ fontSize: 18 }}>Birth date:</Text>
                    ) : (
                      <Text style={{ fontSize: 18 }}>
                        Birth date: {date.toLocaleDateString()}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={{ minWidth: 130 }}>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      display="default"
                      is24Hour={true}
                      onChange={(event, selectedDate) => {
                        setShow(Platform.OS === "ios");
                        if (selectedDate) setDate(selectedDate);
                      }}
                    />
                  )}
                </View>
              </View>

              <TextInput
                placeholder="Location"
                style={styles.testInputStyle}
                editable={true}
                onChangeText={onChangeLocation}
                value={location}
              />
              <Text style={styles.testInputStyle}>Edit Bio</Text>
              <TextInput
                placeholder="Bio"
                style={styles.bioFieldStyle}
                multiline={true}
                numberOfLines={10}
                maxLength={100}
                onChangeText={onChangeBio}
                value={bio}
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
