import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";

const JournalChat = () => {
  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }
  const [journalList, setJournalList] = useState([
    "What are you grateful for today?",
    "What did you learn today?",
    "What was your biggest challenge today?",
  ]);
  const [journalResponses, setJournalResponses] = useState([]);

  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("");
  const [response3, setResponse3] = useState("");

  const handleResponseSubmit = () => {
    const responseObj = {
      questions: journalList,
      responses: [response1, response2, response3],
      date: new Date().toString(),
    };
    setJournalResponses([...journalResponses, responseObj]);
    setResponse1("");
    setResponse2("");
    setResponse3("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <ScrollView style={styles.responsesContainer}>
          <View style={styles.journalInputContainer}>
            {journalList.map((question, index) => (
              <View key={index}>
                <Text style={styles.inputLabel}>{question}</Text>
                <TextInput
                  style={styles.textInput}
                  value={
                    index === 0
                      ? response1
                      : index === 1
                      ? response2
                      : response3
                  }
                  onChangeText={
                    index === 0
                      ? setResponse1
                      : index === 1
                      ? setResponse2
                      : setResponse3
                  }
                />
              </View>
            ))}
            <Button title="Submit" onPress={handleResponseSubmit} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              All Journals
            </Text>
          </View>
          {journalResponses.map((responseObj, index) => (
            <TouchableOpacity key={index} style={styles.response}>
              <View>
                <Text style={styles.dateText}>{responseObj.date}</Text>
              </View>
              <View style={styles.responses}>
                <Text>{responseObj.questions[0]}</Text>
                <Text style={styles.responseText}>
                  {responseObj.responses[0]}
                </Text>
                <Text>{responseObj.questions[1]}</Text>

                <Text style={styles.responseText}>
                  {responseObj.responses[1]}
                </Text>
                <Text>{responseObj.questions[2]}</Text>

                <Text style={styles.responseText}>
                  {responseObj.responses[2]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  journalInputContainer: {
    marginBottom: 0,
    padding: 20,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  responsesContainer: {
    flexGrow: 1,
    padding: 20,
  },
  response: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "white",
    opacity: 0.7,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  responses: {
    marginLeft: 20,
  },
  responseText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default JournalChat;
