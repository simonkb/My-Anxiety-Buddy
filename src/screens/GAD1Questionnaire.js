import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { auth, db } from "../config/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  query,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";

import Loading from "../loading";
const GAD7Questionnaire = (props) => {
  // GAD 7 questionnaire questions and options

  const Chat = (props) => {
    const handleReadOutLoudPress = async (text) => {
      // Start the TTS engine and pass the text as a parameter
      // Initialize the TTS engine
      //
      try {
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
              }
            : {
                left: 5,
                flexDirection: "row",
                position: "relative",
                padding: 10,
                marginTop: 20,
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
          <>
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
              {props.responses.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    opacity: 0.7,
                    padding: 5,
                    borderRadius: 5,
                    marginVertical: 2,
                  }}
                  onPress={() => props.handleSelection(index)}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    );
  };

  const [questions, setQuestions] = useState([]);

  async function read() {
    const docRef = doc(db, "exercises", "GAD7");

    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  if (questions.length === 0) {
    read()
      .then((data) => {
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);

  // Function to handle user selection
  const handleSelection = async (response) => {
    // Add response to responses array
    setResponses([...responses, response]);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion === questions.length && questions.length !== 0) {
    let sum = responses.slice(5, 12).reduce((total, num) => total + num);
    let decision = "";
    if (sum < 5) {
      decision = "Normal";
      console.log("Normal");
    } else if (sum > 4 && sum < 10) {
      decision = "Mild Anxiety";
      console.log("Mild Anxiety");
    } else if (sum > 9 && sum < 15) {
      decision = "Moderate Anxiety";
      console.log("Moderate Anxiety");
    } else {
      decision = "Severe Anxiety";
      console.log("Severe Anxiety");
    }
    const currentUserId = auth.currentUser.uid;
    setDoc(doc(db, "/Users/" + currentUserId + "/Sessions", Date()), {
      GAD7Score: responses.slice(5, 12),
      decision: decision,
      averageHeartRate: 0,
      averageO2level: 0,
      date: Date(),
    });
    props.handleOnPress("Done with GAD7", responses.slice(5, 12));
  }

  return (
    <View style={styles.container}>
      {currentQuestion === 0 && (
        <Chat type="toUser" message="Please answer the follwing questions:" />
      )}

      {currentQuestion < questions.length && questions.length !== 0 && (
        <>
          <View style={{ marginVertical: 20 }}>
            <Chat type="toUser" message={questions[currentQuestion].question} />
          </View>
          <View style={{ marginVertical: 20 }}>
            <Chat
              type="toBot"
              responses={questions[currentQuestion].options}
              handleSelection={handleSelection}
            />
          </View>
        </>
      )}
      {questions.length === 0 && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    marginVertical: 30,
  },
  option: {
    marginVertical: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default GAD7Questionnaire;
