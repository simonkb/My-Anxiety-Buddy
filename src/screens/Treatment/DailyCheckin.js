import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Animated,
} from "react-native";

import {
  useGlobalState,
  bg1,
  bg2,
  bg3,
} from "../../states/state.js";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../config/firebaseConfig.js";
import {
  doc,
  updateDoc,

} from "firebase/firestore";
const DailyCheckin = (props) => {
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
  const response = props.response;
  const navigation = useNavigation();
  const [priority, setPriority] = useState(response[0]);
  const [unhelpfulThought, setUnhelpfulThought] = useState(response[1]);
  const [challengeMore, setChallengeMore] = useState(response[2]);
  const [challengeLess, setChallengeLess] = useState(response[3]);
  const [mission, setMission] = useState(response[4]);
  const currentUserId = auth.currentUser.uid;
  const handleDone = async () => {
    if (
      !priority ||
      !unhelpfulThought ||
      !challengeMore ||
      !challengeLess ||
      !mission
    ) {
      alert("Please complete all fields before proceeding.");
      return;
    }
    //Save the summuries to the dataset

    const docRef = doc(
      db,
      "/Users/" + currentUserId + "/checkins",
      new Date().toDateString()
    );

    await updateDoc(docRef, {
      response: [
        priority,
        unhelpfulThought,
        challengeMore,
        challengeLess,
        mission,
      ],
    })
      .then(() => {
        Alert.alert("Success", "Summary updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    navigation.navigate("Home");
  };
  const currentTime = new Date().getHours();
  let greeting = "";
  if (currentTime >= 5 && currentTime < 12) {
    greeting = "Good Morning!";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animationValue]);

  const [animationValues] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  useEffect(() => {
    Animated.stagger(300, [
      Animated.timing(animationValues[0], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animationValues[1], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animationValues[2], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animationValues[3], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationValues]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.greeting}>{greeting} </Text>
        <Text
          style={{
            ...styles.greeting,
            fontSize: 22,
            fontStyle: "italic",
            fontWeight: "400",
          }}
        >
          Your today's check in summary{" "}
        </Text> */}

        <Text style={styles.date}>{new Date().toDateString()}</Text>
        <Animated.View
          style={{
            ...styles.promptContainer,
            opacity: animationValues[0],
            transform: [
              {
                translateY: animationValues[0].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
            ],
          }}
        >
          <Text style={styles.prompt}>Today my number one priority is</Text>
          <TextInput
            style={styles.input}
            value={priority}
            onChangeText={setPriority}
            placeholder="Enter your priority"
            multiline
          />
        </Animated.View>

        <Animated.View
          style={{
            ...styles.promptContainer,
            flexDirection: "row",
            opacity: animationValues[1],
            transform: [
              {
                translateY: animationValues[1].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
            ],
          }}
        >
          <View style={{ width: 190 }}>
            <Text style={{ ...styles.prompt }}>
              An unhelpful thought I have today is
            </Text>
            <TextInput
              style={{ ...styles.input }}
              value={unhelpfulThought}
              onChangeText={setUnhelpfulThought}
              placeholder="Enter your thought"
              multiline
            />
          </View>
          <Animated.View
            style={{
              transform: [
                { translateX: animationValue },
                { translateY: animationValue },
              ],
            }}
          >
            <Animated.Image
              source={require("../../../assets/ballon.png")}
              style={{
                width: 150,
                height: 150,
                transform: [
                  { translateX: animationValue },
                  { translateY: animationValue },
                ],
              }}
            />
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={{
            ...styles.promptContainer,
            opacity: animationValues[2],
            transform: [
              {
                translateY: animationValues[2].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
            ],
          }}
        >
          <Text style={styles.prompt}>To challenge my thoughts</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.subPrompt}>I will do more of</Text>
              <TextInput
                style={styles.greenCircleInput}
                value={challengeMore}
                onChangeText={setChallengeMore}
                placeholder="Enter your plan"
                multiline
              />
            </View>
            <View>
              <Text style={styles.subPrompt}>I will do less of</Text>
              <TextInput
                style={styles.redCircleInput}
                value={challengeLess}
                onChangeText={setChallengeLess}
                placeholder="Enter your plan"
                multiline
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            ...styles.promptContainer,
            opacity: animationValues[3],
            transform: [
              {
                translateY: animationValues[3].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
            ],
          }}
        >
          <Text style={styles.prompt}>My mission today is to</Text>
          <TextInput
            style={styles.input}
            value={mission}
            onChangeText={setMission}
            placeholder="Enter your mission"
            multiline
          />
        </Animated.View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            //paddingBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 15,
    opacity: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "center",
    color: "gray",
  },
  promptContainer: {
    marginBottom: 10,
  },
  prompt: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  subPrompt: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    alignSelf: "center",
    backgroundColor: "#d2d5d9",
    width: "95%",
    minHeight: 60,
    marginVertical: 10,
    padding: 10,
    paddingTop: 10,
    fontSize: 14,
  },
  greenCircleInput: {
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: "#F9E79F",
    //color: "white",
    width: 160,
    fontSize: 14,
    paddingHorizontal: 10,
    //fontWeight: "900",
  },
  redCircleInput: {
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: "#eb9354",
    //color: "white",
    width: 160,
    fontSize: 14,
    padding: 10,
    //fontWeight: "900",
  },
  doneButton: {
    backgroundColor: "#F39C12",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  skipButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default DailyCheckin;
