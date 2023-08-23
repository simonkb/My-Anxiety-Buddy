import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from "react-native";

import { setGlobalState, useGlobalState , bg1,bg2,bg3} from "../../states/state.js";
import { useNavigation } from "@react-navigation/native";

const DailyCheckin = () => {
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
  const navigation = useNavigation();
  const [priority, setPriority] = useState("");
  const [unhelpfulThought, setUnhelpfulThought] = useState("");
  const [challengeMore, setChallengeMore] = useState("");
  const [challengeLess, setChallengeLess] = useState("");
  const [mission, setMission] = useState("");

  const handleDone = () => {
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

    // Save the inputs to your data storage or perform necessary actions
    console.log("Inputs saved:", {
      priority,
      unhelpfulThought,
      challengeMore,
      challengeLess,
      mission,
    });
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

  return (
    <ImageBackground
      source={currentBg}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.greeting}>{greeting} </Text>
          <Text style={{...styles.greeting, fontSize:22, fontStyle:'italic', fontWeight:'300'}}>Please fill out the following.</Text>

          <Text style={styles.date}>{new Date().toDateString()}</Text>

          <View style={styles.promptContainer}>
            <Text style={styles.prompt}>Today my number one priority is</Text>
            <TextInput
              style={styles.input}
              value={priority}
              onChangeText={setPriority}
              placeholder="Enter your priority"
            />
          </View>

          <View
            style={{
              ...styles.promptContainer,
            }}
          >
            <ImageBackground
              source={require("../../../assets/ballon.png")}
              style={{
                alignItems: "center",
                paddingVertical: 60,
              }}
            >
              <View>
                <Text style={styles.prompt}>
                  An unhelpful thought I have today is
                </Text>
                <TextInput
                  style={styles.input}
                  value={unhelpfulThought}
                  onChangeText={setUnhelpfulThought}
                  placeholder="Enter your thought"
                />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.promptContainer}>
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
                />
              </View>
              <View>
                <Text style={styles.subPrompt}>I will do less of</Text>
                <TextInput
                  style={styles.redCircleInput}
                  value={challengeLess}
                  onChangeText={setChallengeLess}
                  placeholder="Enter your plan"
                />
              </View>
            </View>
          </View>

          <View style={styles.promptContainer}>
            <Text style={styles.prompt}>My mission today is to</Text>
            <TextInput
              style={styles.input}
              value={mission}
              onChangeText={setMission}
              placeholder="Enter your mission"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingBottom: 100,
            }}
          >
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
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
    marginBottom: 20,
    alignSelf: "center",
    color: "gray",
  },
  promptContainer: {
    marginBottom: 20,
  },
  prompt: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: "center",
    fontWeight:'bold'
  },
  subPrompt: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderBottomWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    borderBottomColor: "gray",
    alignSelf: "center",
  },
  greenCircleInput: {
    height: 160,
    borderRadius: 300,
    backgroundColor: "#80ff00",
    color: "black",
    width: 180,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  redCircleInput: {
    height: 130,
    borderRadius: 300,
    backgroundColor: "#eb9354",
    color: "black",
    width: 150,
    fontSize: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  doneButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  skipButton: {
    backgroundColor: "gray",
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
