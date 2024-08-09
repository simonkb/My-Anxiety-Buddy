import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../config/firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const ReflectionComponent = ({ activity, onClose }) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([
    {
      text: t("How did you feel before starting the " + activity + "?"),
      response: "",
    },
    {
      text: "What thoughts or feelings came up during the exercise?",
      response: "",
    },
    {
      text: "How do you feel now that you've completed the exercise?",
      response: "",
    },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const handleResponseChange = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].response = text;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    // check if all required fields have a value
    const hasEmptyFields = questions.some((q) => q.response.trim() === "");
    if (hasEmptyFields) {
      alert(t("Please reflect on all the questions."));
      return;
    }

    setSubmitting(true);

    // create an object with all the responses
    const reflection = {
      activity,
      date: new Date().getTime(),
      responses: questions.map((q) => ({
        question: q.text,
        response: q.response,
      })),
    };

    const currentUserId = auth.currentUser.uid;
    setDoc(
      doc(db, "/Users/" + currentUserId + "/Reflections", Date()),
      reflection
    ).catch((error) => {
      console.log(error);
    });
    // reset the questions
    setQuestions(questions.map((q) => ({ text: q.text, response: "" })));

    setSubmitting(false);

    onClose();
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("Reflect on your " + activity)}</Text>
        {questions.map((q, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{t(q.text)}</Text>
            <TextInput
              style={styles.responseInput}
              value={q.response}
              required={true}
              onChangeText={(text) => handleResponseChange(index, text)}
            />
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button
            title={submitting ? t("Submitting...") : t("Submit")}
            onPress={handleSubmit}
            disabled={submitting}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxWidth: 500,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  responseInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ReflectionComponent;
