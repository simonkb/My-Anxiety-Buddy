import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GAD7Questionnaire = () => {
  // GAD 7 questionnaire questions and options
  const questions = [
    "Over the last 2 weeks, how often have you been bothered by the following problem: feeling nervous, anxious or on edge?",
    "Over the last 2 weeks, how often have you been bothered by the following problem: not being able to stop or control worrying?",
    "Over the last 2 weeks, how often have you been bothered by the following problem: worrying too much about different things?",
    "Over the last 2 weeks, how often have you been bothered by the following problem: trouble relaxing?",
    "Over the last 2 weeks, how often have you been bothered by the following problem: being so restless that it is hard to sit still?",
    "Over the last 2 weeks, how often have you been bothered by the following problem: becoming easily annoyed or irritable?",
    "Over the last 2 weeks, how often have you been bothered by the following problem: feeling afraid as if something awful might happen?",
  ];
  const options = [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day",
  ];

  // Initialize state to store current question and user responses
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);

  // Function to handle user selection
  const handleSelection = (response) => {
    // Add response to responses array
    setResponses([...responses, response]);
    // Move to next question
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Please answer the follwing questions:</Text>
      <Text style={styles.question}>{questions[currentQuestion]}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleSelection(index)}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default GAD7Questionnaire;
