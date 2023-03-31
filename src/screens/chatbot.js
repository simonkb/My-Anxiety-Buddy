import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  Button,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import bg1 from "../../assets/bg1.jpeg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import { useGlobalState, setGlobalState } from "../states/state.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GAD7Questionnaire from "./GAD1Questionnaire";
import { db, auth } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import * as Speech from "expo-speech";
import Loading from "../loading";
import { useContext } from "react";
import { GlobalStateContext } from "../states/GlobalState";
import ReadSmartWatch from "./smartWatch";
import ReadAppleWatch from "./smartwatch2";
import AppleWatchSensorScreen from "./smartwatch3";
const Chat = (props) => {
  const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);

  // Function to handle the "Read Text Out Loud" button press
  const handleReadOutLoudPress = async (text) => {
    // Start the TTS engine and pass the text as a parameter
    // Initialize the TTS engine
    //

    try {
      // alert('Permission to use speech not granted');
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
      style={
        props.type === "toUser"
          ? {
              flexDirection: "row",
              position: "relative",
              padding: 10,
              width: "100%",
              marginVertical: 30,
              alignSelf: "baseline",
              flex: 1,
            }
          : {
              left: 5,
              flexDirection: "row",
              position: "relative",
              padding: 10,
              marginTop: 20,
              flex: 1,
            }
      }
    >
      {props.type === "toUser" && (
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              position: "absolute",
              right: "14%",
              width: "80%",
              alignSelf: "baseline",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderRadius: 10,
              opacity: 0.8,
            }}
          >
            <Text style={{ color: "#FFFFFF", padding: 10 }}>
              {props.message}
            </Text>
          </View>
          <View style={{ position: "absolute", right: "5%" }}>
            <MaterialCommunityIcons
              name="account"
              color={"gray"}
              size={30}
            ></MaterialCommunityIcons>
          </View>
        </View>
      )}
      {props.type === "toBot" && (
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ position: "absolute" }}>
            <MaterialCommunityIcons
              name="account"
              color={"gray"}
              size={30}
            ></MaterialCommunityIcons>
          </View>
          <View
            style={{
              position: "absolute",
              left: 40,
              width: "80%",
              alignSelf: "baseline",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 5,
              padding: 5,
            }}
          >
            {props.responses.map((option) => (
              <TouchableOpacity
                key={option}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0.7,
                  padding: 5,
                  borderRadius: 5,
                  marginVertical: 2,
                }}
                onPress={() => props.handleOnPress(props.message, option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
      const fadeAnim2 = useRef(new Animated.Value(0)).current;
      const fadeAnim3 = useRef(new Animated.Value(0)).current;
      const fadeAnim4 = useRef(new Animated.Value(0)).current;
      const fadeAnim5 = useRef(new Animated.Value(0)).current;
      const scaleAnim = useRef(new Animated.Value(1)).current;
      const scaleChat = useRef(new Animated.Value(1)).current;
      const scaleReady = useRef(new Animated.Value(0)).current;

      const scaleInhale = useRef(new Animated.Value(0)).current;
      const scaleHold = useRef(new Animated.Value(0)).current;
      const scaleExhale = useRef(new Animated.Value(0)).current;
      const scaleButton = useRef(new Animated.Value(0)).current;
      const scaleButton2 = useRef(new Animated.Value(0)).current;

      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(scaleReady, {
          toValue: 1,
          duration: 2,
          useNativeDriver: false,
        }),
        Animated.timing(scaleButton, {
          toValue: 1,
          duration: 2,
          useNativeDriver: false,
        }),
      ]).start();
      const DisplayBreathingAnime = () => {
        Animated.timing(scaleChat, {
          toValue: 0,
          duration: 10,
          useNativeDriver: false,
        }).start();
        Animated.timing(scaleButton, {
          toValue: 0,
          duration: 10,
          useNativeDriver: false,
        }).start();
        Animated.timing(scaleButton2, {
          toValue: 0,
          duration: 5,
          useNativeDriver: false,
        }).start();
        Animated.sequence([
          Animated.loop(
            Animated.parallel([
              Animated.sequence([
                Animated.timing(fadeAnim4, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: false,
                }),

                Animated.timing(scaleAnim, {
                  toValue: 7,
                  duration: 4000,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleAnim, {
                  toValue: 7,
                  duration: 7000,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleAnim, {
                  toValue: 1,
                  duration: 8000,
                  useNativeDriver: false,
                }),
              ]),
              Animated.sequence([
                Animated.timing(scaleReady, {
                  toValue: 0,
                  duration: 990,
                  useNativeDriver: false,
                }),

                Animated.timing(scaleInhale, {
                  toValue: 8,
                  duration: 3995,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleInhale, {
                  toValue: 0,
                  duration: 5,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleHold, {
                  toValue: 8,
                  duration: 1,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleHold, {
                  toValue: 8,
                  duration: 6998,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleHold, {
                  toValue: 0,
                  duration: 1,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleExhale, {
                  toValue: 8,
                  duration: 5,
                  useNativeDriver: false,
                }),
                Animated.timing(scaleExhale, {
                  toValue: 0,
                  duration: 7995,
                  useNativeDriver: false,
                }),
              ]),
            ]),
            {
              iterations: 2,
            }
          ),
          Animated.timing(scaleButton2, {
            toValue: 1,
            duration: 5,
            useNativeDriver: false,
          }),
        ]).start();
      };

      Animated.sequence([
        Animated.timing(fadeAnim5, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
      return (
        <>
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
                opacity: fadeAnim2,
              },
            ]}
          >
            <Chat
              type={"toUser"}
              message={"Let me guide you to perform 4 - 7- 8 breathing!"}
            />
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: scaleChat,
                  },
                ],

                opacity: fadeAnim3,
              },
            ]}
          >
            <Chat type={"toUser"} message={"Sit down in relaxed position"} />
            <Chat type={"toUser"} message={"Are you ready?"} />
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
            <View
              style={{
                alignSelf: "center",
                position: "relative",
                display: "flex",
                marginTop: 0,
              }}
            >
              <MaterialCommunityIcons
                color={"red"}
                size={50}
                name={"lungs"}
              ></MaterialCommunityIcons>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: scaleReady,
                  },
                ],
              },
            ]}
          >
            <View
              style={{
                alignSelf: "center",
                position: "relative",
                display: "flex",
                marginTop: 0,
              }}
            >
              <Text>Ready</Text>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: scaleInhale,
                  },
                ],
              },
            ]}
          >
            <View
              style={{
                alignSelf: "center",
                position: "relative",
                display: "flex",
                marginTop: 0,
              }}
            >
              <Text>Inhale</Text>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: scaleHold,
                  },
                ],
              },
            ]}
          >
            <View
              style={{
                alignSelf: "center",
                position: "relative",
                display: "flex",
                marginTop: 0,
              }}
            >
              <Text>Hold</Text>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: scaleExhale,
                  },
                ],
              },
            ]}
          >
            <View
              style={{
                alignSelf: "center",
                position: "relative",
                display: "flex",
                marginTop: 0,
              }}
            >
              <Text>Exhale</Text>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              {
                opacity: fadeAnim5,
              },
            ]}
          >
            <View
              style={{
                alignSelf: "center",
                position: "relative",
                display: "flex",
                marginTop: 30,
              }}
            >
              <Animated.View
                style={[
                  {
                    transform: [
                      {
                        scale: scaleButton,
                      },
                    ],
                    opacity: fadeAnim5,
                  },
                ]}
              >
                <Button
                  title="Start Breathing"
                  onPress={DisplayBreathingAnime}
                ></Button>
              </Animated.View>
              <Animated.View
                style={[
                  {
                    transform: [
                      {
                        scale: scaleButton2,
                      },
                    ],
                    opacity: fadeAnim5,
                  },
                ]}
              >
                <Button
                  title="Click me if you want to do it again"
                  onPress={DisplayBreathingAnime}
                ></Button>
                <Button title="Done" onPress={AfterBreathing}></Button>
              </Animated.View>
            </View>
          </Animated.View>
        </>
      );
    } else if (route.params.chatType === "default") {
      //Keep track of the last message so that you can continue to the new one
      return (
        <>
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
        </>
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
            message={"How do you feel after doing the breathing exercise?"}
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

      // const brainExercises = [
      //   {
      //     message: "Welcome to the Brain Exercise section",
      //     responses: ["Thank you"],
      //     feedbacks: ["You're welcome"],
      //     answer: 0,
      //   },
      //   {
      //     message:
      //       "Let's start training your adaptive memory. This helps to avoid anxiety in long term.",
      //     responses: [
      //       "Good, I would love doing that.",
      //       "Sorry, I can't do that today",
      //     ],
      //     feedbacks: [
      //       "Respond to the following questions, I will give you feedbacks for every answer",
      //       "Okay, you may do it later",
      //     ],
      //     answer: 0,
      //   },
      //   {
      //     message:
      //       "What is the best thing to do when you are feeling overwhelmed?",
      //     responses: [
      //       "Sleeping",
      //       "Jump to finding a solution",
      //       "Ignoring the situation",
      //       "Take a deep breath",
      //     ],
      //     feedbacks: [
      //       "sleeping",
      //       "jump",
      //       "ignore",
      //       "Good Job! Deep Breathing enables more air flow to your lungs and help calming your nerves so you can think clearly for a better solution!",
      //     ],
      //     answer: 3,
      //   },
      //   {
      //     message:
      //       "If you are having a hardtime finishing your daily tasks what should you do?",
      //     responses: [
      //       "Delay the tasks until last minute ",
      //       "Do not start until I have the energy to do it",
      //       "Start with the hardest task to finish early",
      //       "Plan ahead and start with the small tasks",
      //     ],
      //     feedbacks: [
      //       "sleeping",
      //       "jump",
      //       "ignore",
      //       "Good Job! Planning and breaking larger tasks into a smaller ones  helps improving your productivity and gives you a sense of achivement.",
      //     ],
      //     answer: 3,
      //   },
      //   {
      //     message:
      //       "If you lost track on your routine, what is the best thing to do?",
      //     responses: [
      //       "Blaming my self",
      //       "Take more days off to rest",
      //       "Focus on what I can work with today then get back on track",
      //       "I knew this will happen",
      //     ],
      //     feedbacks: [
      //       "sleeping",
      //       "jump",
      //       "Good Job! Prioritize what is needed to be done today. There is time, you will be able to catch up with what you have missed.",
      //       "last one",
      //     ],
      //     answer: 2,
      //   },
      //   {
      //     message:
      //       "What should you do when there is no time to finish your work?",
      //     responses: [
      //       "Organize my work place and take a power nap when needed",
      //       "Delay it, either ways I’m not going to be abe to finish it on time",
      //       "Sacrifice my sleep to finish the work",
      //       "Check my watch constantly to make sure I’m not wasting time ",
      //     ],

      //     feedbacks: [
      //       "Good Job! Organizing your work place will help you clear your mind and get you in the mood to work. Remember your body sometimes needs to rest, a  power nap will help you to increase your focus and restore your energy.",
      //       "2",
      //       "3",
      //       "4",
      //     ],
      //     answer: 0,
      //   },

      //   {
      //     message: "What should you do when you feel stressed?",
      //     responses: [
      //       " I’m probably stressed because I did not achieve a lot this week",
      //       "Take a time out and talk to a friend ",
      //       "I knew this will happen ",
      //       "Go eat something to fill the void ",
      //     ],
      //     feedbacks: [
      //       "1",
      //       "Good Job! Talking to a friend, Doing fun activities like meditation or exercise will help reduce anxiety and stress.",
      //       "3",
      //       "4",
      //     ],
      //     answer: 1,
      //   },
      // ];

      // const addQuestionsToFirestore = async () => {
      //   const usersRef = collection(db, "exercises");

      //   await setDoc(doc(usersRef, "brainExercises"), {
      //     questions: brainExercises,
      //   })
      //     .then(() => {
      //       console.log("Document added updated!");
      //     })
      //     .catch((error) => {
      //       console.error("Error updating document: ", error);
      //     });
      // };
      const ChatBrain = (props) => {
        return (
          <View
            style={
              props.type === "toUser"
                ? {
                    flexDirection: "row",
                    position: "relative",
                    padding: 10,
                    width: "100%",
                    marginVertical: 30,
                    alignSelf: "baseline",
                  }
                : {
                    left: 5,
                    flexDirection: "row",
                    position: "relative",
                    padding: 10,
                    marginTop: 30,
                  }
            }
          >
            {props.type === "toUser" && (
              <>
                <View
                  style={{
                    position: "absolute",
                    right: "14%",
                    width: "80%",
                    alignSelf: "baseline",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: 10,
                    opacity: 0.8,
                  }}
                >
                  <Text style={{ color: "#FFFFFF", padding: 10 }}>
                    {props.message}
                  </Text>
                </View>
                <View style={{ position: "absolute", right: "5%" }}>
                  <MaterialCommunityIcons
                    name="account"
                    color={"gray"}
                    size={30}
                  ></MaterialCommunityIcons>
                </View>
              </>
            )}
            {props.type === "toBot" && (
              <View style={{ flex: 1, marginBottom: 170 }}>
                <View style={{ position: "absolute" }}>
                  <MaterialCommunityIcons
                    name="account"
                    color={"gray"}
                    size={30}
                  ></MaterialCommunityIcons>
                </View>
                <View
                  style={{
                    position: "absolute",
                    left: 40,
                    width: "80%",
                    alignSelf: "baseline",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  {props.responses.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        opacity: 0.8,
                        padding: 5,
                        borderRadius: 5,
                        marginVertical: 8,
                      }}
                      onPress={() =>
                        props.handleSelection(
                          props.responses.indexOf(option),
                          props.answer
                        )
                      }
                    >
                      <Text>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
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
                justifyContent: "space-between",
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
              <View style={{ marginTop: 60 }}>
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
                  message={
                    "How do you feel after doing the breathing exercise?"
                  }
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
            width: "97%",
            left: "1.5%",
            right: "1.5%",
            height: "100%",
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              height: "100%",
            }}
          >
            <DisplayChat> </DisplayChat>
          </ScrollView>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 100,
          }}
        >
          {/* <ReadSmartWatch></ReadSmartWatch> */}
          {/* <ReadAppleWatch></ReadAppleWatch> */}
          {/* <AppleWatchSensorScreen /> */}
        </View>

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
