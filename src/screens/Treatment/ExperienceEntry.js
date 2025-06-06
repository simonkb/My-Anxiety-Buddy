import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useGlobalState, bg1, bg2, bg3 } from "../../states/state.js";
import { useNavigation } from "@react-navigation/native";
import ExperienceSummary from "./ExperienceSummary";
import { API_URL, API_KEY } from "../../config/firebaseConfig";
import { auth, db } from "../../config/firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const ExperienceEntryScreen = () => {
  // Updating background
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
  const { t } = useTranslation();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const questions = [
    {
      question: "Are you currently experiencing any anxiety situation?",
      type: "yesOrNo",
    },
    {
      question: "How are you feeling at the moment?",
      type: "selectFromEmojies",
    },
    {
      //question: "What made you feel this way?",
      question: "What were your immediate thoughts?",
      type: "writing",
    },
    {
      // question: "What events occurred just before the situation?",
      question: "How do you want to challenge your thoughts?",
      type: "writing",
    },
    {
      question: "Have you tried anything to make the situation better?",
      type: "writing",
    },
    {
      question: "Did any of the methods you used work?",
      type: "yesOrNo",
    },
    {
      //question: "What do you think made the situation worse?",
      question: "What events occurred just before the situation?",
      type: "writing",
    },
    {
      //question: "How do you want to challenge your thoughts?",
      question: "What do you think made the situation worse?",
      type: "writing",
    },
  ];
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false); // Step 2: Initialize loading state

  const navigator = useNavigation();
  const handleAnswerChange = (answer) => {
    if ((questionIndex === 0) & (answer === "No")) {
      Alert.alert(
        t("Message"),
        t(
          "Great, you can go through the situation entry whenever you have anxiety or related feeling."
        )
      );
      navigator.goBack();
      return;
    }
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
    if (questions[questionIndex].type !== "writing") handleContinue();
  };

  const handleContinue = async () => {
    if (questionIndex < questions.length - 1) {
      if (questions[questionIndex].type !== "writing") {
        setQuestionIndex(questionIndex + 1);
      } else {
        if (answers[questionIndex]) {
          setQuestionIndex(questionIndex + 1);
        } else {
          Alert.alert(
            t("Error"),
            t("Please enter your response to the question.")
          );
        }
      }
    } else {
      if (!answers[questionIndex]) {
        Alert.alert("Error", "Please enter your response to the question.");
      } else {
        setLoading(true);
        const prompt = `In this role-play, you are a compassionate therapist within an anxiety management app named AnxietyBuddy. This is my application and I want you to act as a therapist and respond to the user directly making him the second person. 
Your primary aim is to provide empathetic support and guidance to users experiencing anxiety.
Given the scenario below, generate a comprehensive response that includes multiple facets.

Scenario:
A user has engaged with my anxiety management app and shared his or her responses to a series of questions.
Your task is to craft a detailed summary to assist the him or her effectively.

Questions my  app asked the user:

User's Questions: ${questions}
The responses of the user for the respective questions:
Answers: ${answers}

Desired Response Format:
Please return a list of objects all in one JSON (only a JSON (list of objects in JSON format) should be returned and the returned JSON should always have the same 6 objects structure to avoid any errors), each addressing a specific aspect of the user's situation.
1. User's Thoughts
2. Event Description
3. Emotions
4. Constructive Behaviors
5. Destructive Behaviors
6. App Suggestions
Please structure your response accordingly. In your response address the user directly use short expressions to the point, like in two three words since your response is a summary. but for the suggestions aim for a  200 word paragraph clearly suggesting the user directly addressing him 'you'. it should be a professional suggestion that helps the user recover from their situation. The format matters the most just return a JSON whih is list of objects all in one JSON. and your response is presented to my user directly so don't address the user as a third person just tell everything to the user directly. Except for the last object the others should be very short like few words or a sentence. But the last object should have 2 paragraphs clear and professional suggestion. Note every object in the list should have "title" and "content" properties in having doulble quotes as per the roles of JSON.`;

        try {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
            }),
          });
          const data = await response.json();
          const botResponse = data?.choices[0].message.content;
          setSummary(botResponse);
          const object = {
            userResponse: answers,
            gptResponse: botResponse,
          };
          const currentUserId = auth.currentUser.uid;
          setDoc(
            doc(db, "/Users/" + currentUserId + "/ExperienceEntries", Date()),

            object
          );

          setLoading(false);
          setDone(true);
        } catch (error) {
          console.error("Error:", error);
          // Handle error
        }
      }
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[questionIndex];

    if (currentQuestion.type === "yesOrNo") {
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{t(currentQuestion.question)}</Text>
          <View style={styles.yesNoButtons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={() => handleAnswerChange("Yes")}
            >
              <Text style={styles.buttonText}>{t("Yes")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "orange" }]}
              onPress={() => handleAnswerChange("No")}
            >
              <Text style={styles.buttonText}>{t("No")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (currentQuestion.type === "selectFromEmojies") {
      const emojis1 = [
        t("😢 \nSad"),
        t("😨 \nNervous"),
        t("😞 \nDisappointed"),
      ];
      const emojis2 = [t("😕 \nConfused"), t("😠 \nAngry"), t("😭 \nCrying")];
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{t(currentQuestion.question)}</Text>
          <View style={styles.emojiButtons}>
            {emojis1.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={styles.emojiButton}
                onPress={() => handleAnswerChange(emoji.split(" \n")[1])}
              >
                <Text style={{ fontSize: 60 }}>{emoji.split(" \n")[0]}</Text>

                <Text style={{ ...styles.buttonText, color: "orange" }}>
                  {emoji.split(" \n")[1]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.emojiButtons}>
            {emojis2.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={styles.emojiButton}
                onPress={() => handleAnswerChange(emoji.split(" \n")[1])}
              >
                <Text style={{ fontSize: 60 }}>{emoji.split(" \n")[0]}</Text>

                <Text style={{ ...styles.buttonText, color: "orange" }}>
                  {emoji.split(" \n")[1]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    } else if (currentQuestion.type === "writing") {
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{t(currentQuestion.question)}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleAnswerChange}
            value={answers[questionIndex] || ""}
            placeholder={t("Enter your response")}
            multiline
          />
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor:
                questionIndex === questions.length - 1 ? "#0a2242" : "orange",
            }}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>
              {questionIndex === questions.length - 1
                ? t("Done")
                : t("Continue")}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const [done, setDone] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View style={{ flex: 1 }}>
          {!done && !loading ? (
            <ScrollView>
              <View style={styles.card}>
                {questionIndex === 0 && (
                  <>
                    <Text style={styles.title}>{t("Situation Entry")}</Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "300",
                      }}
                    >
                      {new Date().toDateString()}
                    </Text>
                    <Text style={styles.message}>
                      {t(
                        "This simple situation entry will help you see how any situation is connected by your thoughts, mood, and behavior"
                      )}
                    </Text>
                  </>
                )}

                {renderQuestion()}
              </View>
            </ScrollView>
          ) : loading ? (
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 100,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "white",
                  margin: 30,
                }}
              >
                {t("Summarizing your response and generating suggestions...")}
              </Text>
              <ActivityIndicator
                size="large"
                color="#0000ff"
              ></ActivityIndicator>
            </View>
          ) : (
            <>
              <ExperienceSummary summary={summary}></ExperienceSummary>
            </>
          )}
        </View>
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
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  yesNoButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  emojiButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },
  emojiButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#d2d5d9",
    minWidth: "95%",
    height: 150,
    marginVertical: 20,
    borderRadius: 15,
    padding: 20,
    paddingTop: 10,
    fontSize: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
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

export default ExperienceEntryScreen;
