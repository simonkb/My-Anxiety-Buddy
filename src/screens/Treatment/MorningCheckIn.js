import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import {
  setGlobalState,
  useGlobalState,
  bg1,
  bg2,
  bg3,
} from "../../states/state.js";
import DailyCheckin from "./DailyCheckin.js";
import { auth, db } from "../../config/firebaseConfig.js";
import {
  collection,
  doc,
  setDoc,
  query,
  getDoc,
  getDocs,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

const MorningCheckInScreen = () => {
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

  const currentTime = new Date().getHours();
  let greeting = "";
  if (currentTime >= 5 && currentTime < 12) {
    greeting = "Good Morning!";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const questions = [
    "What is your number one priority today?",
    "What are unhelpful thoughts do you have?",
    "What to do more of today?",
    "What do less of today?",
    "What would make today amazing?",
  ];

  const handleAnswerChange = (text) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = text;
    setAnswers(newAnswers);
  };
  const currentUserId = auth.currentUser.uid;

  const handleContinue = () => {
    if (questionIndex < questions.length - 1) {
      if (answers[questionIndex]) {
        setQuestionIndex(questionIndex + 1);
      } else {
        Alert.alert("Error", "Please enter your response to the question.");
      }
    } else {
      if (!answers[questionIndex]) {
        Alert.alert("Error", "Please enter your response to the question.");
      } else {
        //Save to database here
        setDoc(
          doc(
            db,
            "/Users/" + currentUserId + "/checkins",
            new Date().toDateString()
          ),
          {
            date: new Date().toDateString(),
            response: answers,
          }
        );
        setDoneForToday(true);
      }
    }
  };

  const [doneForToday, setDoneForToday] = useState(false);
  //Check the database if this state variable should be true or false
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(
        db,
        "/Users/" + currentUserId + "/checkins",
        new Date().toDateString()
      );

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAnswers(docSnap.data().response);
          setDoneForToday(true);
        } else {
          setDoneForToday(false);
        }
      } catch (error) {
        Alert.alert("Error", "Please check your internet connection.");
      }
    };

    fetchData(); // Call the async function here
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <ScrollView>
          {!doneForToday && questionIndex < questions.length ? (
            <>
              <View style={styles.card}>
                <Text style={styles.title}>
                  {" "}
                  {greeting === "Good Morning!"
                    ? "Morning Check In"
                    : "Daily Check In"}
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {new Date().toUTCString().substring(0, 16)}
                </Text>
                <Text style={styles.message}>
                  Start the day by checking in with yourself and connecting your
                  thoughts.
                </Text>
                <Text style={styles.question}>{questions[questionIndex]}</Text>
                <TextInput
                  style={{
                    backgroundColor: "#d2d5d9",
                    width: "95%",
                    height: 150,
                    marginVertical: 20,
                    borderRadius: 15,
                    padding: 20,
                    paddingTop: 10,
                    fontSize: 16,
                  }}
                  onChangeText={handleAnswerChange}
                  value={answers[questionIndex] || ""}
                  multiline
                />
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor:
                      questionIndex === questions.length - 1
                        ? "#0a2242"
                        : "orange",
                  }}
                  onPress={handleContinue}
                >
                  <Text style={styles.buttonText}>
                    {questionIndex === questions.length - 1
                      ? "Done"
                      : "Continue"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <DailyCheckin response={answers}></DailyCheckin>
          )}

          <View style={{ height: "60%", paddingBottom: 300 }}></View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#f0f3f7",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
    color: "orange",
    fontWeight: "bold",
  },
  question: {
    fontSize: 35,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: "85%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  bgImage: {
    flex: 1,
  },
});

export default MorningCheckInScreen;
