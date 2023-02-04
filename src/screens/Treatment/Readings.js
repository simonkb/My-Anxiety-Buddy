import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
  Button,
} from "react-native";
import React, { useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state.js";
import firebase from "firebase/app";
import {
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

import * as Speech from "expo-speech";

const Readings = () => {
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
  let [value, setValue] = useState("readings");

  var i = 0;
  const [isReading, setIsReading] = useState(false);
  const handleReadOutLoudPress = (text) => {
    // Start the TTS engine and pass the text as a parameter
    // Initialize the TTS engine
    //
    // if (!isReading) {
    setIsReading(true);

    try {
      Speech.speak(text, { language: "en-US" });
    } catch (error) {
      console.error(error);
    }
    // } else {
    //   setIsReading(false);
    //   Speech.stop();
    // }
  };
  const Display = () => {
    if (value === "quotes") {
      const [allQuotes, setQuotes] = useState("");
      async function read() {
        let list = [];
        const querySnapshot = await getDocs(
          query(collection(db, "quotes"), orderBy("viewsCount", "desc"))
        );
        querySnapshot.forEach((doc) => {
          var temp = {
            quote: doc.data().quote,
            viewsCount: doc.data().viewsCount,
            id: doc.id,
          };
          list.push(temp);
        });

        return list;
      }

      read()
        .then((data) => {
          setQuotes(data);
        })
        .catch((error) => {
          console.log(error);
        });
      async function updateCount(id, vCount) {
        const qoutesRef = collection(db, "quotes");

        await updateDoc(doc(qoutesRef, id), {
          viewsCount: vCount + 1,
        });
      }
      return (
        <>
          <View
            style={{
              width: "94%",
              height: "100%",
              backgroundColor: "rgba(217, 217, 217, 0.53)",
              left: "3%",
              right: "3%",
              top: 70,
              flex: 1,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#A984C3",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  fontWeight: "400",
                  padding: 10,
                  width: "90%",
                }}
              >
                Inspiring quotes
              </Text>
            </View>
            <FlatList
              data={allQuotes}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.31)",
                      flexDirection: "row",
                      shadowColor: "rgba(0, 0, 0, 0.25)",
                      borderBottomColor: "gray",
                      borderBottomWidth: 2,
                    }}
                    onPress={() => updateCount(item.id, item.viewsCount)}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000000",
                        fontWeight: "400",
                        padding: 10,
                        width: "90%",
                      }}
                    >
                      {item.quote}
                    </Text>
                    <MaterialCommunityIcons
                      name="eye"
                      color={"gray"}
                      size={18}
                      style={{
                        padding: 10,
                        paddingLeft: 30,
                        right: 0,
                        position: "absolute",
                      }}
                    >
                      <Text style={{ fontSize: 14 }}> {item.viewsCount}</Text>
                    </MaterialCommunityIcons>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </>
      );
    } else if (value === "links") {
      const [array, setArray] = useState("");
      async function read() {
        let list = [];
        const querySnapshot = await getDocs(
          query(collection(db, "links"), orderBy("viewsCount", "desc"))
        );
        querySnapshot.forEach((doc) => {
          var temp = {
            link: doc.data().link,
            viewsCount: doc.data().viewsCount,
            description: doc.data().description,
            id: doc.id,
          };
          list.push(temp);
        });

        return list;
      }

      read()
        .then((data) => {
          setArray(data);
        })
        .catch((error) => {
          console.log(error);
        });

      async function openLinkInBrowser(url, id, vCount) {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
        const linksRef = collection(db, "links");

        await updateDoc(doc(linksRef, id), {
          viewsCount: vCount + 1,
        });
      }

      return (
        <>
          <View
            style={{
              width: "94%",
              height: "100%",
              backgroundColor: "rgba(217, 217, 217, 0.53)",
              left: "3%",
              right: "3%",
              top: 70,
              flex: 1,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#A984C3",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  fontWeight: "400",
                  padding: 10,
                }}
              >
                Important links
              </Text>
            </View>
            <FlatList
              data={array}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.31)",
                      flexDirection: "row",
                      shadowColor: "rgba(0, 0, 0, 0.25)",
                      borderBottomColor: "gray",
                      borderBottomWidth: 2,
                    }}
                    onPress={() =>
                      openLinkInBrowser(item.link, item.id, item.viewsCount)
                    }
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000000",
                        fontWeight: "400",
                        padding: 10,
                        width: "90%",
                      }}
                    >
                      {item.description}
                    </Text>

                    <MaterialCommunityIcons
                      name="eye"
                      color={"gray"}
                      size={18}
                      style={{
                        padding: 10,
                        paddingLeft: 30,
                        right: 0,
                        position: "absolute",
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>{item.viewsCount}</Text>
                    </MaterialCommunityIcons>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </>
      );
    } else {
      const [state, setState] = useState("");
      async function read() {
        let list = [];
        const querySnapshot = await getDocs(
          query(collection(db, "Readings"), orderBy("viewsCount", "desc"))
        );
        querySnapshot.forEach((doc) => {
          var temp = {
            id: doc.id,
            title: doc.data().title,
            content: doc.data().body,
            expanded: false,
            viewsCount: doc.data().viewsCount,
          };
          list.push(temp);
        });
        setState({ items: list });
      }
      if (i < 1) {
        read();
        i++;
      }

      const toggleExpanded = async (id) => {
        let vCount = 0;
        const updatedItems = state.items.map((item) => {
          vCount = item.viewsCount;
          if (item.id === id) {
            item.expanded = !item.expanded;
          }
          if (!item.expanded) {
            Speech.stop();
          }
          return item;
        });
        setState({ items: updatedItems });
        const readingsRef = collection(db, "Readings");

        await updateDoc(doc(readingsRef, id), {
          viewsCount: vCount + 1,
        });
      };

      return (
        <>
          <FlatList
            style={{
              width: "94%",
              height: "100%",
              backgroundColor: "rgba(217, 217, 217, 0.53)",
              left: "3%",
              right: "3%",
              top: 70,
              flex: 1,
            }}
            data={state.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => toggleExpanded(item.id)}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    flexDirection: "row",
                    shadowColor: "rgba(0, 0, 0, 0.25)",
                    borderBottomColor: "gray",
                    borderBottomWidth: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#000000",
                      fontWeight: "400",
                      padding: 10,
                      width: "90%",
                    }}
                  >
                    {item.title}
                  </Text>
                  <MaterialCommunityIcons
                    name="eye"
                    color={"gray"}
                    size={18}
                    style={{
                      padding: 10,
                      paddingLeft: 30,
                      right: 0,
                      position: "absolute",
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>{item.viewsCount}</Text>
                  </MaterialCommunityIcons>
                </TouchableOpacity>
                {item.expanded && (
                  <View>
                    <TouchableOpacity
                      style={{ marginBottom: 20, marginTop: 20 }}
                      onPress={() => {
                        handleReadOutLoudPress(item.content);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="speaker-wireless"
                        color={"green"}
                        size={20}
                        style={{
                          padding: 10,
                          paddingLeft: 30,
                          right: 0,
                          position: "absolute",
                        }}
                      ></MaterialCommunityIcons>
                    </TouchableOpacity>
                    {/* 
                    {isReading ? (
                      <TouchableOpacity

                        onPress={handleReadOutLoudPress(item.content)}
                      >
                      <Text>Start Reading</Text>
                      </TouchableOpacity>
                    ) : (
                       <TouchableOpacity

                        onPress={handleReadOutLoudPress(item.content)}
                      >
                      <Text>Start Reading</Text>
                      </TouchableOpacity>
                    )} */}

                    <Text
                      style={{
                        padding: 15,
                      }}
                    >
                      {item.content}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </>
      );
    }
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
            width: "94%",
            height: 50,
            left: "3%",
            right: "3%",
            top: 20,
            backgroundColor: "#00236A",
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setValue("readings")}>
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "400",
                padding: 10,
              }}
            >
              Readings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setValue("quotes")}>
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "400",
                padding: 10,
              }}
            >
              Positive Qoutes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setValue("links")}>
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "400",
                padding: 10,
              }}
            >
              Links
            </Text>
          </TouchableOpacity>
        </View>
        <Display />
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

export default Readings;
