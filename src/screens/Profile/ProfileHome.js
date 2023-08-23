import React, { useEffect, useState } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
  setGlobalState,
  useGlobalState,
  bg1,
  bg2,
  bg3,
} from "../../states/state.js";
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
import BarGraph from "./BarGraph";
import CollapsibleBar from "./CollapsableBar";
import ReflectionView from "../ReflectionView";
import QuoteDisplay from "../QuotesDisplay";
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
  const [currentUser, setUser] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
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
  const COLORS = {
    1: "green",
    2: "#A9DE11",
    3: "#DED511",
    4: "red",
  };
  // useEffect(() => {
  //   const currentUserId = auth.currentUser.uid;
  //   const journalsRef = collection(db, "Users", currentUserId, "Sessions");
  //   const q = query(journalsRef, orderBy("date", "asc"));
  //   getDocs(q)
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => doc.data());
  //       const values = [];
  //       for (let d in data) {
  //         values.push({
  //           date: new Date(data[d].date).toString().substring(0, 10),
  //           level:
  //             data[d].decision === "Severe Anxiety"
  //               ? 4
  //               : data[d].decision === "Mild Anxiety"
  //               ? 2
  //               : data[d].decision === "Moderate Anxiety"
  //               ? 3
  //               : 1,
  //         });
  //       }
  //       setData(values);
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents: ", error);
  //     });
  //   if (anxietyData.length > 0) {
  //     setColor(COLORS[anxietyData[anxietyData.length - 1].level]);
  //   }
  // }, []);
  // const [reflections, setReflctions] = useState([]);
  // useEffect(() => {
  //   const currentUserId = auth.currentUser.uid;
  //   const journalsRef = collection(db, "Users", currentUserId, "Reflections");
  //   const q = query(journalsRef, orderBy("date", "asc"));
  //   getDocs(q)
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => doc.data());
  //       setReflctions(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents: ", error);
  //     });
  // }, []);

  useEffect(() => {
    const currentUserId = auth.currentUser.uid;
    const journalsRef = collection(db, "Users", currentUserId, "Sessions");
    const q = query(journalsRef, orderBy("date", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

      if (values.length > 0) {
        setColor(COLORS[values[values.length - 1].level]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [reflections, setReflections] = useState([]);

  useEffect(() => {
    const currentUserId = auth.currentUser.uid;
    const reflectionsRef = collection(
      db,
      "Users",
      currentUserId,
      "Reflections"
    );
    const q = query(reflectionsRef, orderBy("date", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setReflections(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [color, setColor] = useState("green");
  const styles2 = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 30,
      backgroundColor: "#f8f8f8",
      width: "90%",
      borderBottomColor: color,
      borderBottomWidth: 10,
      borderRadius: 15,
    },
    profileInfo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    profileText: {
      flex: 1,
    },
    username: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
    },
    bio: {
      paddingTop: 5,
      fontSize: 14,
      color: "gray",
      marginRight: 5,
    },
    settingsButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      backgroundColor: "#EAEAEA",
    },
    settingsText: {
      fontSize: 15,
      color: "black",
      marginLeft: 5,
    },
  });

  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const CUser = auth.currentUser;
    if (CUser) {
      const journalsRef = collection(db, `Users/${CUser.uid}/savedQuotes`);
      const q = query(journalsRef);
      getDocs(q)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            const quoteData = doc.data();
            quoteData.id = doc.id;
            return quoteData;
          });
          setQuotes(data);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <SafeAreaView style={{ left: 18 }}>
          <View style={styles2.container}>
            <View style={styles2.profileInfo}>
              <View style={styles2.profileText}>
                <Text style={styles2.username}>{currentUser}</Text>
                <Text style={styles2.bio}>{bio}</Text>
              </View>
              <TouchableOpacity
                style={styles2.settingsButton}
                onPress={onSettingsPressed}
              >
                <MaterialCommunityIcons name="tools" color="gray" size={20} />
                <Text style={styles2.settingsText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <Text style={styles.title}>Your Activity Analytics</Text>
            <CollapsibleBar title="Your Self Assessment Analytics">
              <View style={styles.container}>
                {anxietyData.length > 0 ? (
                  <BarGraph data={anxietyData} />
                ) : (
                  <Text>Loading</Text>
                )}
              </View>
            </CollapsibleBar>
            <CollapsibleBar title="Your Reflections">
              {reflections.length > 0 ? (
                <ReflectionView reflections={reflections}></ReflectionView>
              ) : (
                <Text>Loading</Text>
              )}
            </CollapsibleBar>
            <CollapsibleBar title="Saved Quotes">
              {quotes.length > 0 ? (
                <FlatList
                  data={quotes}
                  renderItem={({ item }) => (
                    <View>
                      <QuoteDisplay quote={item}></QuoteDisplay>
                    </View>
                  )}
                />
              ) : (
                <Text>Loading</Text>
              )}
            </CollapsibleBar>
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
