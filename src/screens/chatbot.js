import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
} from "react-native";
import bg1 from "../../assets/bg1.jpeg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import { useGlobalState, setGlobalState } from "../states/state.js";
import Chat from "./Chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GAD7Questionnaire from "./GAD1Questionnaire";
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
  //
  const treatment = () => {
    //validate user
    navigation.navigate("Treatment");
  };
  let [chatType, setChatType] = useState(route.params.chatType);

  const AfterBreathing = () => {
    setGlobalState("chat", "afterBreathing");
    setChatType("afterBreathing");
    navigation.setParams({
      chatType: "afterBreathing",
    });
    navigation.navigate("Treatment");
  };

  const DisplayChat = () => {
    if (useGlobalState("chat")[0] === "breathing") {
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
      // Animated.loop(
      //   Animated.sequence([
      //     Animated.timing(fadeAnim4, {
      //       toValue: 1,
      //       duration: 1000,
      //       useNativeDriver: false,
      //     }),

      //     Animated.timing(scaleAnim, {
      //       toValue: 7,
      //       duration: 4000,
      //       useNativeDriver: false,
      //     }),
      //     Animated.timing(scaleAnim, {
      //       toValue: 7,
      //       duration: 7000,
      //       useNativeDriver: false,
      //     }),
      //     Animated.timing(scaleAnim, {
      //       toValue: 1,
      //       duration: 8000,
      //       useNativeDriver: false,
      //     }),
      //   ]),
      //   {
      //     iterations: 5,
      //   }
      // ).start();
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
        // Animated.timing(fadeAnim5, {
        //   toValue: 0,
        //   duration: 70000,
        //   useNativeDriver: false,
        // }),
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
            {/* <Chat
              type={"toBot"}
              responses={{ option_1: "Yes", option_2: "Not yet" }}
              onPress={(option) => {
                if (option === "Yes") {
                  DisplayBreathingAnime();
                }
              }}
            /> */}
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
                <Button
                  title="Continue to the other services"
                  onPress={AfterBreathing}
                ></Button>
              </Animated.View>
            </View>
          </Animated.View>
        </>
      );
    } else if (useGlobalState("chat")[0] === "default") {
      return (
        <>
          <Chat type={"toUser"} message={"Welcome to Anti-Anxiety app"} />
          <Chat type={"toUser"} message={"Why are you here today?"} />
          <Chat
            type={"toBot"}
            responses={{
              option_1: "I am feeling anxious, I need some help",
              option_2: "I don't know, just trying to learn how the app works",
              option_3: "Connect with people and have fun",
            }}
          />
        </>
      );
    } else if (useGlobalState("chat")[0] === "afterBreathing") {
      return <></>;
    } else if (useGlobalState("chat")[0] === "brain") {
      return <></>;
    } else if (useGlobalState("chat")[0] === "GAD7") {
      return <GAD7Questionnaire />;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={currentBg}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <ScrollView style={{ width: "97%", left: "1.5%", right: "1.5%" }}>
            <DisplayChat></DisplayChat>
            {/* <GAD7Questionnaire /> */}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
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
});

export default Chatbot;
