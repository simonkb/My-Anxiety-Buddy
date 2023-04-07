import React, { useEffect, useState } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
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
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import BarGraph from "./BarGraph";
import { useRoute } from "@react-navigation/native";

const ProfileHome = ({ route, navigation }) => {
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
    navigator.navigate("Settings", { username: currentUser });
  };
  const [isCollapsed, setIsCollapsed] = useState(true);
  const CollapsibleBar = ({ title, children }) => {
    return (
      <View
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: 5,
          marginBottom: 10,
          overflow: "hidden",
          width: "90%",
        }}
      >
        <TouchableOpacity
          style={styles.header}
          onPress={() => setIsCollapsed(!isCollapsed)}
        >
          <Text style={{ fontWeight: "600" }}>{title}</Text>
          <Icon
            name={isCollapsed ? "chevron-down" : "chevron-up"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
        {isCollapsed ? null : children}
      </View>
    );
  };

  // let [value, setValue] = useState("posts");

  // const Display = () => {
  //   if (value === "followers") {
  //     return (
  //       <View>
  //         <Text>All your followers will be listed here </Text>
  //       </View>
  //     );
  //   } else if (value === "saved") {
  //     return (
  //       <View>
  //         <Text>Your saved posts will appear here</Text>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View>
  //         <Text>Your Posts will appear here</Text>
  //       </View>
  //     );
  //   }
  // };

  const [currentUser, setUser] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  onAuthStateChanged(auth, (user) => {
    if (user !== null && user.emailVerified) {
      const uid = user.uid;
      try {
        onSnapshot(doc(db, "Users", uid), (doc) => {
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
  const [anxietyData, setData] = useState([]);

  useEffect(() => {
    const currentUserId = auth.currentUser.uid;
    const journalsRef = collection(db, "Users", currentUserId, "Sessions");
    const q = query(journalsRef, orderBy("date", "asc"));
    getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const values = [];
        for (let d in data) {
          values.push({
            date: new Date(data[d].date).toString().substring(0, 10),
            level:
              data[d].decision === "Severe Anxiety"
                ? 4
                : data[d].decision === "Mild Anxiety"
                ? 2
                : data[d].decision === "Moderate Anxiety"
                ? 3
                : 1,
          });
        }
        setData(values);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [isCollapsed]);

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
              borderBottomWidth: 10,
              right: 18,
              marginTop: 10,
              backgroundColor: "white",
              borderBottomColor: "white",
            }}
          >
            {/* <View style={styles.topBarViews}>
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
            </View> */}
          </View>
          <ScrollView>
            <Text style={styles.title}>Your Activity Analytics</Text>
            <CollapsibleBar title="Your GAD7 Analytics">
              <View style={styles.container}>
                {anxietyData.length > 0 ? (
                  <BarGraph data={anxietyData} />
                ) : (
                  <Text>Loading</Text>
                )}
              </View>
            </CollapsibleBar>

            {/* <CollapsibleBar title="Your Journal Analytics">
              <Text>
                This is the content for the Your Journal Analytics collapsible
                bar
              </Text>
            </CollapsibleBar> */}
            {/* <Display></Display> */}
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
  title: {
    color: "#333", // color of the title text
    fontSize: 20, // size of the title text
    fontWeight: "bold", // make the text bold
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default ProfileHome;
