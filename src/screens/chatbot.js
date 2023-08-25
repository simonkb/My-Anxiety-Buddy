import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  Button,
  Platform,
} from "react-native";

import {
  useGlobalState,
  setGlobalState,
  bg1,
  bg2,
  bg3,
} from "../states/state.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GAD7Questionnaire from "./GAD1Questionnaire";
import { db } from "../config/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import * as Speech from "expo-speech";
import Loading from "../loading";
import { useContext } from "react";
import { GlobalStateContext } from "../states/GlobalState";
import ReadData from "./HealthKit";
import ReadDataAndroid from "./GoogleTsx";
import VideoPlayer from "./videoPlayer";
import ReflectionComponent from "./ReflectionComponent";

import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuoteDisplay from "./QuotesDisplay";
import { SuccessButton } from "../buttons.js";

const Chat = (props) => {
  const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);
  const handleReadOutLoudPress = async (text) => {
    try {
      if (globalState.speakEnabled)
        await Speech.speak(text, { language: "en-US" });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleReadOutLoudPress(props.message);
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10,
        marginLeft: props.type === "toUser" ? 0 : 5,
        marginRight: props.type === "toBot" ? 0 : 5,
        alignSelf: props.type === "toUser" ? "flex-start" : "flex-end",
      }}
    >
      {props.type === "toUser" && (
        <MaterialCommunityIcons
          name="account"
          color={"gray"}
          size={30}
          style={{ marginRight: 5 }}
        />
      )}
      <View
        style={{
          backgroundColor:
            props.type === "toUser" ? "#f1f0f0" : "rgba(255, 255, 255, 0.7)",
          padding: 10,
          borderRadius: 10,
          maxWidth: "80%",
        }}
      >
        <Text style={{ fontSize: 20 }}>{props.message}</Text>
        {props.type === "toBot" &&
          props.responses.map((option) => (
            <TouchableOpacity
              key={option}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                opacity: 0.9,
                padding: 5,
                borderRadius: 5,
                marginVertical: 2,
              }}
              onPress={() => props.handleOnPress(props.message, option)}
            >
              <Text
                style={{ fontSize: 18, color: "black", fontWeight: "bold" }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      {props.type === "toBot" && (
        <MaterialCommunityIcons
          name="account"
          color={"gray"}
          size={30}
          style={{ marginLeft: 5 }}
        />
      )}
    </View>
  );
};

const ReadOutLoudButton = () => {
  const [isReading, setIsReading] = useState(true);
  const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);

  const handleToggle = () => {
    if (globalState.speakEnabled) {
      setGlobalStateNew({ ...globalState, speakEnabled: false });
    } else {
      setGlobalStateNew({ ...globalState, speakEnabled: true });
    }
  };
  const icon = globalState.speakEnabled
    ? require("../../assets/speak.png")
    : require("../../assets/pause.png");
  return (
    <TouchableOpacity onPress={handleToggle} style={styles.buttonSpeaker}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const Chatbot = ({ route, navigation }) => {
  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }
  const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);
  const AfterBreathing = () => {
    navigation.setParams({
      chatType: "afterBreathing",
    });
  };
  const handleOnpress = (question, selectedOption) => {
    if (selectedOption === "I am feeling anxious, I need some help") {
      navigation.setParams({
        chatType: "GAD7",
      });
    } else if (selectedOption === "To use the breathing guide in your app") {
      navigation.setParams({
        chatType: "breathing",
      });
    } else if (selectedOption === "I want to read more about anxiety") {
      navigation.navigate("Treatment", {
        screen: "Readings",
      });
    } else if (selectedOption === "I want to do my journal of today") {
      navigation.navigate("Treatment", {
        screen: "Journals",
      });
    } else {
      if (question === "Done with GAD7") {
        navigation.setParams({
          chatType: "breathing",
        });
        Speech.stop();
      }
    }
  };

  const quotesDefault = [
    {
      quote: "Every small step you take towards managing anxiety is a victory.",
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
      quote: "Your journey may be tough, but so are you. Keep pushing forward.",
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

  const HomePage = () => {
    const [index, setIndex] = useState(
      Math.floor(Math.random() * quotes.length)
    );
    const currentTime = new Date().getHours();
    let greeting = "";
    if (currentTime >= 5 && currentTime < 12) {
      greeting = "Good Morning!";
    } else if (currentTime >= 12 && currentTime < 18) {
      greeting = "Good Afternoon!";
    } else {
      greeting = "Good Evening!";
    }

    return (
      <View style={stylesNew.container}>
        <View style={stylesNew.logoContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/icon_copy.png")}
              style={stylesNew.logo}
            />
            <Text style={{ ...stylesNew.appName, fontSize: 40 }}>
              AnxietyBuddy
            </Text>
          </View>
          <Text style={stylesNew.appName}>{greeting}</Text>
        </View>

        <QuoteDisplay
          quote={quotes[index]}
          onClick={() => {
            setIndex(Math.floor(Math.random() * quotes.length));
          }}
        ></QuoteDisplay>

        {/* Core Sections Icons */}
        <View
          style={{
            backgroundColor: "gray",
            opacity: 0.8,
            justifyContent: "center",
            borderRadius: 15,
            marginTop: 40,
          }}
        >
          <View style={stylesNew.iconsContainer}>
            <TouchableOpacity
              style={stylesNew.iconContainer}
              onPress={() => {
                navigation.navigate("Check in");
              }}
            >
              <Ionicons
                name="sunny-outline"
                size={30}
                color="green"
                style={stylesNew.icon}
              />
              <Text style={stylesNew.buttonText}>
                {greeting === "Good Morning!"
                  ? "Morning\nCheck In"
                  : "Daily \nCheck In"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesNew.iconContainer}
              onPress={() => {
                navigation.navigate("Situation entry");
              }}
            >
              <Ionicons
                name="sad-outline"
                size={30}
                color="green"
                style={stylesNew.icon}
              />
              <Text style={stylesNew.buttonText}>Situation{"\n"}entry</Text>
            </TouchableOpacity>
          </View>
          <View style={stylesNew.iconsContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.setParams({
                  chatType: "GAD7",
                });
              }}
              style={stylesNew.iconContainer}
            >
              <Ionicons
                name="ios-analytics"
                size={30}
                color="green"
                style={stylesNew.icon}
              />
              <Text style={stylesNew.buttonText}>Self{"\n"}assessment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesNew.iconContainer}
              onPress={() => {
                navigation.setParams({
                  chatType: "breathing",
                });
              }}
            >
              <Ionicons
                name="ios-heart"
                size={30}
                color="green"
                style={stylesNew.icon}
              />
              <Text style={stylesNew.buttonText}>Breathing{"\n"}Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.setParams({
                  chatType: "brain",
                });
              }}
              style={stylesNew.iconContainer}
            >
              <MaterialCommunityIcons
                name="brain"
                size={30}
                color="green"
                style={stylesNew.icon}
              />
              <Text style={stylesNew.buttonText}>Cognitive{"\n"}Training</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={stylesNew.iconContainer}
              onPress={() => {
                navigation.navigate("Journaling");
              }}
            >
              <Ionicons
                name="ios-journal"
                size={30}
                color="green"
                style={stylesNew.icon}
              />
              <Text style={{ textAlign: "center" }}>Daily{"\n"}Journaling</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };

  const stylesNew = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    logoContainer: {
      alignItems: "center",
      margin: 30,
    },
    logo: {
      width: 50,
      height: 50,
    },
    appName: {
      fontSize: 36,
      fontWeight: "bold",
      marginTop: 0,
      color: "white",
    },
    iconsContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginVertical: 15,
    },
    icon: {
      backgroundColor: "#f5f5f5",
      borderRadius: 15,
      padding: 15,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 9,
    },
    iconContainer: {
      alignItems: "center",
      backgroundColor: "white",
      padding: 10,
      borderRadius: 15,
    },
    buttonText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  const DisplayChat = () => {
    if (route.params.chatType === "breathing") {
      const fadeAnim = useRef(new Animated.Value(0)).current;
      const fadeAnim3 = useRef(new Animated.Value(0)).current;
      const scaleAnim = useRef(new Animated.Value(1)).current;
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
      return (
        <View
          style={{
            flex: 1,
            marginTop: 100,
            marginVertical: 20,
            flexDirection: "column",
            width: "100%",
            height: "100%",
            flexGrow: 1,
          }}
        >
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Chat
              type={"toUser"}
              message={
                "Welcome to AnxietyBuddy app calm breathing section. Let's practice breathing together!"
              }
            />
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: scaleAnim,
                  },
                ],
                opacity: fadeAnim3,
              },
            ]}
          >
            <Chat
              type={"toUser"}
              message={
                "Sit down in relaxed position and click on start whenever you are ready."
              }
            />
            <VideoPlayer></VideoPlayer>
          </Animated.View>
        </View>
      );
    } else if (route.params.chatType === "default") {
      return (
        <View style={{ top: 40 }}>
          <HomePage></HomePage>
        </View>
      );
    } else if (route.params.chatType === "afterBreathing") {
      return (
        <>
          <Chat
            type={"toUser"}
            message={
              "Good job, you have completed your breathing exercise for today."
            }
          />
          <Chat
            type={"toUser"}
            message={
              'You can do it again anytime by going to treatment section, and clicking on "Breathing Exercise"'
            }
          />
          <Chat
            type={"toUser"}
            message={"How do you feel after doing the breathing exercise?"}
          />
          <Chat
            type={"toBot"}
            responses={[
              "I feel better now, it helped me relax",
              "It helped me relax, but I'm still anxious",
              "I don't like the exercise, do you have anything else?",
            ]}
            handleOnPress={handleOnpress}
          />
        </>
      );
    } else if (route.params.chatType === "brain") {
      const [brainExercises, setBrainExercises] = useState([]);
      async function read() {
        const docRef = doc(db, "exercises", "brainExercises");

        const docSnap = await getDoc(docRef);
        return docSnap.data();
      }
      if (brainExercises.length === 0) {
        read()
          .then((data) => {
            setBrainExercises(data.questions);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const ChatBrain = (props) => {
        return (
          <View
            style={
              props.type === "toBot"
                ? {
                    flexDirection: "row",
                    alignItems: "flex-end",
                    padding: 10,
                    marginBottom: 10,
                    alignSelf: "flex-end",
                  }
                : {
                    flexDirection: "row",
                    alignItems: "flex-end",
                    padding: 10,
                    marginBottom: 10,
                  }
            }
          >
            {props.type === "toUser" && (
              <MaterialCommunityIcons
                name="account"
                color={"gray"}
                size={30}
                style={{ marginRight: 5 }}
              />
            )}
            <View
              style={{
                backgroundColor:
                  props.type === "toUser"
                    ? "#f1f0f0"
                    : "rgba(255, 255, 255, 0.7)",
                padding: 10,
                borderRadius: 10,
                maxWidth: "80%",
              }}
            >
              <Text style={{ fontSize: 20 }}>{props.message}</Text>
              {props.type === "toBot" &&
                props.responses.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      opacity: 0.9,
                      padding: 5,
                      borderRadius: 5,
                      marginVertical: 2,
                    }}
                    onPress={() =>
                      props.handleSelection(
                        props.responses.indexOf(option),
                        props.answer
                      )
                    }
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
            {props.type === "toBot" && (
              <MaterialCommunityIcons
                name="account"
                color={"gray"}
                size={30}
                style={{ marginRight: 5 }}
              />
            )}
          </View>
        );
      };

      const handleReadOutLoudPress = async (text) => {
        // Start the TTS engine and pass the text as a parameter
        // Initialize the TTS engine

        try {
          if (globalState.speakEnabled)
            await Speech.speak(text, { language: "en-US" });
        } catch (error) {
          console.error(error);
        }
      };
      const [currentIndex, setCurrentIndex] = useState(0);
      const [selectedResponse, setSelectedResponse] = useState(-1);
      const handleResponsePress = (index) => {
        setSelectedResponse(index);
        if (currentIndex >= brainExercises.length) {
          console.log("done with brain E");
        } else {
          handleReadOutLoudPress(brainExercises[currentIndex].feedbacks[index]);
        }
      };

      const handleNextPress = () => {
        if (selectedResponse === brainExercises[currentIndex].answer) {
          setCurrentIndex(currentIndex + 1);
          setSelectedResponse(-1);
        } else {
          // Show feedback message
          console.log(brainExercises[currentIndex].feedbacks[selectedResponse]);
        }
      };

      useEffect(() => {
        if (currentIndex < brainExercises.length) {
          handleReadOutLoudPress(brainExercises[currentIndex].message);
        } else if (
          currentIndex === brainExercises.length &&
          brainExercises.length !== 0
        ) {
          setDisplayReflection(true);
        }
      }, [currentIndex]);
      const handleAfterBrain = () => {};

      return (
        <>
          {currentIndex < brainExercises.length && (
            <View
              style={{
                marginTop: 100,

                flexDirection: "column",
              }}
            >
              <View>
                <ChatBrain
                  type="toUser"
                  message={brainExercises[currentIndex].message}
                />
              </View>
              <View>
                <ChatBrain
                  type="toBot"
                  responses={brainExercises[currentIndex].responses}
                  handleSelection={handleResponsePress}
                  answer={brainExercises[currentIndex].answer}
                />
              </View>
              {brainExercises[currentIndex].feedbacks[selectedResponse] && (
                <View>
                  <ChatBrain
                    type="toUser"
                    message={
                      brainExercises[currentIndex].feedbacks[selectedResponse]
                    }
                  />
                </View>
              )}
              <View style={{ alignItems: "center" }}>
                {selectedResponse === brainExercises[currentIndex].answer ? (
                  <Button title="Next" onPress={handleNextPress} />
                ) : null}
              </View>
            </View>
          )}
          {brainExercises.length === 0 && <Loading />}
        </>
      );
    } else if (route.params.chatType === "GAD7") {
      return <GAD7Questionnaire handleOnPress={handleOnpress} />;
    }
  };
  const [displayReflection, setDisplayReflection] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            marginVertical: 10,
            flexGrow: 1,
          }}
        >
          <ScrollView
            style={{
              flexGrow: 1,
              flex: 1,
            }}
          >
            <DisplayChat> </DisplayChat>
            {Platform.OS === "android" && (
              <View
                style={{
                  height: 500,
                  position: "relative",
                }}
              ></View>
            )}
          </ScrollView>
        </View>
        {route.params.chatType === "default" && (
          <View
            style={{
              left: 20,
              bottom: 20,
            }}
          >
            {/* {Platform.OS === "ios" && !Platform.isPad && <ReadData></ReadData>} */}

            {/* {Platform.OS === "android" && <ReadDataAndroid></ReadDataAndroid>} */}
          </View>
        )}
        {route.params.chatType !== "default" && (
          <View
            style={{
              position: "absolute",
              right: 20,
              bottom: 20,
            }}
          >
            <ReadOutLoudButton></ReadOutLoudButton>
          </View>
        )}

        {route.params.chatType !== "default" && (
          <View
            style={{
              position: "absolute",
              left: 10,
              bottom: 5,
            }}
          >
            <SuccessButton
              title={"Back"}
              onPress={() => {
                navigation.setParams({
                  chatType: "default",
                });
              }}
            ></SuccessButton>
          </View>
        )}
        {displayReflection && (
          <ReflectionComponent
            activity={"brain exercise"}
            onClose={() => {
              setDisplayReflection(false);
              navigation.setParams({
                chatType: "default",
              });
            }}
          ></ReflectionComponent>
        )}
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
  hello: {
    justifyContent: "center",
    alignSelf: "center",
    width: "40%",
    height: "15%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "10%",
    start: "5%",
  },
  chat1: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },
  person1: {
    width: "15%",
    height: "25%",
    top: "-10%",
    start: "80%",
  },
  hello2: {
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "19%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "0%",
    start: "-9%",
  },
  chat2: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person2: {
    width: "15%",
    height: "25%",
    top: "-20%",
    start: "80%",
  },
  hello3: {
    justifyContent: "center",
    alignSelf: "center",
    width: "71%",
    height: "35%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "-10%",
    start: "-9%",
  },
  chat3: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person3: {
    width: "15%",
    height: "25%",
    top: "-46%",
    start: "80%",
  },
  hello4: {
    justifyContent: "center",
    alignSelf: "center",
    width: "71%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "-5%",
    start: "2%",
  },
  chat4: {
    color: "black",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person4: {
    width: "15%",
    height: "25%",
    top: "-70%",
    start: "0%",
  },

  button: {
    width: "80%",
    height: "35%",
    alignSelf: "center",
    backgroundColor: "rgba(50,50,50,255)",
    borderRadius: 15,
    margin: 10,
    padding: 8,
    top: "-10%",
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },

  buttonSpeaker: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
});
export default Chatbot;
