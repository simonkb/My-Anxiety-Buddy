import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GAD7Questionnaire = (props) => {
  // GAD 7 questionnaire questions and options

  const Chat = (props) => {
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
  const questions = [
    {
      question: "How are you feeling today?",
      options: ["Very good", "Good", "Not good", "Bad"],
    },
    {
      question: "How do you rate your day/week?",
      options: ["Very good", "Good", "Not good", "Bad"],
    },
    {
      question: "Do you know what anxiety is?",
      options: ["Yes", "NO"],
    },
    {
      question: "Do you feel overwhelmed or worried?",
      options: ["Yes", "NO"],
    },

    {
      question: "Have you ever experienced anxiety? Yes or no",
      options: ["Yes", "NO"],
    },
    {
      question:
        "Over the last 2 weeks, how often have you been bothered by the following problem: feeling nervous, anxious or on edge?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
    },
    {
      question:
        "Over the last 2 weeks, how often have you been bothered by the following problem: not being able to stop or control worrying?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
    },
    {
      question:
        "Over the last 2 weeks, how often have you been bothered by the following problem: worrying too much about different things?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
    },
    {
      question:
        "Over the last 2 weeks, how often have you been bothered by the following problem: trouble relaxing?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
    },
    {
      question:
        "Over the last 2 weeks, how often have you been bothered by the following problem: being so restless that it is hard to sit still?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
    },
    {
      question:
        "Over the last 2 weeks, how often have you been bothered by the following problem: becoming easily annoyed or irritable?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
    },
    {
      question:
        "Over the last 2 weeks, how often have you been bothered by the following problem: feeling afraid as if something awful might happen?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
    },
  ];

  // Initialize state to store current question and user responses
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);

  // Function to handle user selection
  const handleSelection = (response) => {
    // Add response to responses array
    setResponses([...responses, response]);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion === questions.length) {
    props.handleOnPress("Done with GAD7", responses.slice(5, 12));
    console.log(responses.slice(5, 12));
  }

  return (
    <View style={styles.container}>
      <Chat type="toUser" message="Please answer the follwing questions:" />

      {currentQuestion < questions.length ? (
        <>
          <Chat type="toUser" message={questions[currentQuestion].question} />
          <Chat
            type="toBot"
            responses={questions[currentQuestion].options}
            handleSelection={handleSelection}
          />
        </>
      ) : (
        // <View>
        //   <Text style={styles.question}>
        //     {questions[currentQuestion].question}
        //   </Text>

        //   {questions[currentQuestion].options.map((option, index) => (
        //     <TouchableOpacity
        //       key={index}
        //       style={styles.option}
        //       onPress={() => handleSelection(index)}
        //     >
        //       <Text>{option}</Text>
        //     </TouchableOpacity>
        //   ))}
        // </View>
        <>
          <Text>Done, Great Job</Text>
          <Text>Let's continue to breathing section</Text>
        </>
      )}
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
