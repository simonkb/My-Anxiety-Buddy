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
import React, { useState, useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useGlobalState, bg1, bg2, bg3 } from "../../states/state.js";
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
import ReadingContent from "./ReadingContent";
import QuoteDisplay from "../QuotesDisplay";
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
  };

  const Display = () => {
    if (value === "quotes") {
      const quotesDefault = [
        {
          quote:
            "Every small step you take towards managing anxiety is a victory.",
          author: "John Smith",
          year: 2019,
          id: "0",
        },
        {
          quote: "You're stronger than you think. Believe in yourself.",
          author: "Emily Johnson",
          year: 2020,
          id: "1",
        },
        {
          quote: "Inhale courage, exhale fear.",
          author: "David Adams",
          year: 2018,
          id: "2",
        },
        {
          quote: "Remember, progress is progress, no matter how small.",
          author: "Sarah Davis",
          year: 2021,
          id: "3",
        },
        {
          quote: "You have the power to overcome anxiety and embrace peace.",
          author: "Michael Roberts",
          year: 2017,
          id: "4",
        },
        {
          quote: "Take a deep breath. You've got this!",
          author: "Olivia Thompson",
          year: 2022,
          id: "5",
        },
        {
          quote: "Challenge your anxious thoughts. You're in control.",
          author: "Daniel Wilson",
          year: 2016,
          id: "6",
        },
        {
          quote: "Keep going, even when anxiety tells you to stop.",
          author: "Sophia Anderson",
          year: 2023,
          id: "7",
        },
        {
          quote:
            "Your journey may be tough, but so are you. Keep pushing forward.",
          author: "Jennifer Walker",
          year: 2021,
          id: "8",
        },
      ];
      const [quotes, setQuotes] = useState(quotesDefault);
      useEffect(() => {
        const journalsRef = collection(db, "quotes");
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
      }, []);
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
            <FlatList
              data={quotes}
              renderItem={({ item }) => (
                <View>
                  <QuoteDisplay quote={item}></QuoteDisplay>
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
                backgroundColor: "green",
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
                Hotlines
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
              contentContainerStyle={{ justifyContent: "space-evenly" }}
            />
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "green",
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
                Other links
              </Text>
            </View>
            {/* <View style={{
              height:array.length*5, flex:1
            }}> */}
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
            {/* </View> */}
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
            content: doc.data().content,
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
                  <View style={{ padding: 20 }}>
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
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

                    {/* <Text
                      style={{
                        padding: 15,
                      }}
                    >
                      {item.content}
                    </Text> */}
                    {/* <MarkdownDisplay>
                      {
                        "# My Markdown Title \n\nThis is some **bold** and _italic_ text.\n\n- First list item\n- Second list item\n\nThis line will be on a new line, but part of the same paragraph.\n\nThis line will be on a new line and a new paragraph."
                      }
                    </MarkdownDisplay> */}
                    {/* <MarkdownDisplay mergeStyle={true}>
                      {item.content}
                    </MarkdownDisplay> */}
                    <ReadingContent
                      listOfObjects={item.content}
                    ></ReadingContent>
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
