import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";
import { db, auth } from "../../config/firebaseConfig";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { sendEmailVerification } from "firebase/auth";

const EditProfile = () => {
  //Updating background
  const defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }

  const navigator = useNavigation();
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email_address: "",
    phone_number: "",
    birthDate: new Date().getTime(),
    location: "",
    bio: "",
  });

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.uid;
      try {
        onSnapshot(doc(db, "Users", uid), (doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const onSavePressed = async () => {
    setIsLoading(true);

    const user = auth.currentUser;
    const usersRef = collection(db, "Users");
    if (user) {
      if (user.emailVerified) {
        userData.email_address = user.email;
        //userData.birthDate = userData.birthDate.getTime();
        await updateDoc(doc(usersRef, user.uid), userData)
          .then(() => {
            Alert.alert("Success", "Changes made successfully");
            setIsLoading(false);
            navigator.navigate("Settings");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        sendEmailVerification(auth.currentUser).then(() => {
          Alert.alert(
            "Error",
            "Please verify your email. We have sent you the link for verification. Please check your inbox, junk or trash mail box as well. "
          );
        });
      }
    }
  };

  const onCancelPressed = () => {
    navigator.navigate("Settings");
  };

  const onChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [show, setShow] = useState(Platform.OS === "ios");
  const [mode, setMode] = useState("date");
  const profilePicture = {
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/I1FDrRUQF9bnrTsQcmUnOnu0.png",
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
                    value={userData.username}
                    onChangeText={(text) => onChange("username", text)}
                  ></TextInput>
                </View>
              </View>

              <TextInput
                style={styles.textInputStyle}
                placeholder="First Name"
                value={userData.firstName}
                onChangeText={(text) => onChange("firstName", text)}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Last Name"
                value={userData.lastName}
                onChangeText={(text) => onChange("lastName", text)}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Email"
                value={userData.email_address}
                onChangeText={(text) => onChange("email_address", text)}
                editable={false}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Phone"
                value={userData.phone_number}
                onChangeText={(text) => onChange("phone_number", text)}
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
                  <TouchableOpacity
                    onPress={() => {
                      setShow(true);
                      setMode("date");
                    }}
                  >
                    {Platform.OS === "ios" ? (
                      <Text style={{ fontSize: 18 }}>Birth date:</Text>
                    ) : (
                      <Text style={{ fontSize: 18 }}>
                        Birth date:
                        {new Date(userData.birthDate).toLocaleDateString()}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ minWidth: 130 }}>
                  {show && (
                    <DateTimePicker
                      value={new Date(userData.birthDate)}
                      date={new Date(userData.birthDate)}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedDate) => {
                        const currentDate = selectedDate;
                        setShow(Platform.OS === "ios");
                        onChange("birthDate", currentDate.getTime());
                      }}
                    />
                  )}
                </View>
              </View>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Location"
                value={userData.location}
                onChangeText={(text) => onChange("location", text)}
              />
              <Text style={styles.textInputStyle}>Edit Bio</Text>
              <TextInput
                style={styles.bioFieldStyle}
                placeholder="Bio"
                multiline={true}
                numberOfLines={10}
                maxLength={100}
                value={userData.bio}
                onChangeText={(text) => onChange("bio", text)}
              />
              <Modal
                visible={isLoading}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Saving...</Text>
                  </View>
                </View>
              </Modal>
              <View
                style={{
                  margin: 20,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <Button title="Save" onPress={() => onSavePressed()} />
                <Button title="Cancel" onPress={() => onCancelPressed()} />
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
  textInputStyle: {
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
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 200,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  loadingText: {
    fontSize: 16,
  },
});

export default EditProfile;
