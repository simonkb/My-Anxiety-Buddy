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
import bg1 from "../../assets/bg1.jpeg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import { useGlobalState, setGlobalState } from "../states/state.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GAD7Questionnaire from "./GAD1Questionnaire";
import { db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import * as Speech from "expo-speech";
import Loading from "../loading";
import { useContext } from "react";
import { GlobalStateContext } from "../states/GlobalState";
import ReadData from "./HealthKit";
import ReadDataAndroid from "./GoogleTsx";
import VideoPlayer from "./videoPlayer";
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
    // if (isReading) {
    //   Speech.pause();
    // } else {
    //   Speech.resume();
    // }
    // setIsReading(!isReading);
    // if (isReading) {
    //   Speech.stop();
    // }
    // Speech.speak("");
    // setIsReading(!isReading);
    // if (useGlobalState("speakEnabled")[0]) {
    //   setGlobalState("speakEnabled", true);
    // }
    if (globalState.speakEnabled) {
      setGlobalStateNew({ ...globalState, speakEnabled: false });
      // globalState.Speech.pause();
    } else {
      //globalState.Speech.resume();

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
                "Welcome to Anti-Anxiety app calm breathing section. Let's practice breathing together!"
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
          <Chat
            type={"toUser"}
            message={"Welcome to Anti-Anxiety app home section!"}
          />
          <Chat type={"toUser"} message={"Why are you here today?"} />
          <Chat
            type={"toBot"}
            responses={[
              "I am feeling anxious, I need some help",
              "To use the breathing guide in your app",
              "I want to read more about anxiety",
              "I want to do my journal of today",
            ]}
            handleOnPress={handleOnpress}
          />
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
            //message={"How do you feel after doing the breathing exercise?"}
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
        if (currentIndex < brainExercises.length)
          handleReadOutLoudPress(brainExercises[currentIndex].message);
      }, [currentIndex]);
      const handleAfterBrain = () => {
        handleReadOutLoudPress(
          "Good job, I will provide advanced training next time. Now you may check out our other services."
        );
      };

      return (
        <>
          {currentIndex < brainExercises.length && (
            <View
              style={{
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
          {currentIndex === brainExercises.length &&
            brainExercises.length !== 0 && (
              <>
                <ChatBrain
                  type={"toUser"}
                  message={
                    "Well done! You have completed your brain exercise for today."
                  }
                />
                <ChatBrain
                  type={"toUser"}
                  message={
                    'You can do more anytime by going to treatment section, and clicking on "Brain Exercise"'
                  }
                />
                <ChatBrain
                  type={"toUser"}
                  message={"How do you feel after doing the brain exercise?"}
                />
                <ChatBrain
                  type={"toBot"}
                  responses={[
                    "I feel better now, it helped me learn so many things",
                    "It's is so complicated",
                    "It is so simple and nice",
                    "I don't like the exercise, do you have anything else?",
                  ]}
                  handleSelection={handleAfterBrain}
                  answer={1}
                />
              </>
            )}
        </>
      );
    } else if (route.params.chatType === "GAD7") {
      return <GAD7Questionnaire handleOnPress={handleOnpress} />;
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
            {Platform.OS === "ios" && <ReadData></ReadData>}

            {Platform.OS === "android" && <ReadDataAndroid></ReadDataAndroid>}
          </View>
        )}

        <View
          style={{
            position: "absolute",
            right: 20,
            bottom: 20,
          }}
        >
          <ReadOutLoudButton></ReadOutLoudButton>
        </View>
        {route.params.chatType !== "default" && (
          <View
            style={{
              position: "absolute",
              left: 20,
              bottom: 20,
            }}
          >
            <Button
              title="Back to home"
              onPress={() => {
                navigation.setParams({
                  chatType: "default",
                });
              }}
            ></Button>
          </View>
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
