import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";
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
    "Feel free to write about anything else. (optional)",
  ]);
  const [journalResponses, setJournalResponses] = useState([]);

  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("");
  const [response3, setResponse3] = useState("");
  const [response4, setResponse4] = useState("");

  const handleResponseSubmit = () => {
    if ((response1 === "") | (response2 === "") | (response3 === "")) {
      Alert.alert("Messeage", "Please answer all of the above questions.");
    } else {
      const responseObj = {
        questions: journalList,
        responses: [response1, response2, response3, response4],
        date: new Date().getTime(),
      };
      const currentUserId = auth.currentUser.uid;
      setDoc(doc(db, "/Users/" + currentUserId + "/Journals", Date()), {
        questions: journalList,
        responses: [response1, response2, response3, response4],
        date: new Date().getTime(),
      });
      setJournalResponses([responseObj, ...journalResponses]);
      setResponse1("");
      setResponse2("");
      setResponse3("");
      setResponse4("");
    }
  };
  useEffect(() => {
    const currentUserId = auth.currentUser.uid;
    const journalsRef = collection(db, "Users", currentUserId, "Journals");
    const q = query(journalsRef, orderBy("date", "desc"));
    getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setJournalResponses(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

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
                      : index === 2
                      ? response3
                      : response4
                  }
                  onChangeText={
                    index === 0
                      ? setResponse1
                      : index === 1
                      ? setResponse2
                      : index === 2
                      ? setResponse3
                      : setResponse4
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
                <Text style={styles.dateText}>
                  Your journal on{" "}
                  {new Date(responseObj.date).toString().substring(0, 16)}
                </Text>
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
                <Text>{responseObj.questions[3]}</Text>

                <Text style={styles.responseText}>
                  {responseObj.responses[3]}
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
    opacity: 0.6,
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
