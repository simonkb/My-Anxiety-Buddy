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
  Alert,
  TouchableHighlight,
  Spinner,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";
import { auth, db } from "../../config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const ProfileHome = ({ navigation }) => {
  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }

  const navigator = useNavigation();
  const onSettingsPressed = () => {
    navigator.navigate("Settings");
  };

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
  const [currentUser, setUser] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  /*if (useGlobalState("currentUser")[0] != null) {
    currentUser = useGlobalState("currentUser")[0].username;
    bio = useGlobalState("currentUser")[0].bio;
  }*/
  //   //onAuthStateChanged(auth, async (user) => {
  //     const usersRef = collection(db, "Users");

  //     if (user != null) {
  //       const docRef = doc(db, "Users", user.uid);
  //       const docSnap =  getDoc(docRef);

  //     }
  //  // });
  // let id = useGlobalState("currentUser")[0];

  // if (id != null) {
  //   console.log(id + "This is id");
  //   const db = getDatabase();

  //   const url = "Users/" + "XsRboHvl1aTmmqmNOac2sbPBKrZ2";
  //   const userRef = ref(db, url);
  //   onValue(userRef, async (snapshot) => {
  //     const data = await snapshot.val();
  //     //updateStarCount(postElement, data);
  //     console.log(data);
  //     setUser(data);
  //     setBio(data.bio);
  //   });
  // }
  // const querySnapshot = getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });
  // async function readUser() {
  //   const docRef = doc(db, "cities", "SF");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // }
  onAuthStateChanged(auth, (user) => {
    if (user !== null && user.emailVerified) {
      const uid = user.uid;
      try {
        onSnapshot(doc(db, "Users", uid), (doc) => {
          setGlobalState("currentUser", doc.data());
          setUser(doc.data().username);
          setBio(doc.data().bio);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // User is signed out
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
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
                  {currentUser}
                </Text>
              </MaterialCommunityIcons>

              <Text
                name="profileBio"
                style={{ width: "60%", paddingTop: 5, fontSize: 12 }}
              >
                {bio}
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
