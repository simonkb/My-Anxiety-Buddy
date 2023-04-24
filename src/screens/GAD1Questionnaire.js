import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../config/firebaseConfig";
import {
  doc,
  setDoc,
  query,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import "firebase/firestore";
import { GlobalStateContext } from "../states/GlobalState";
import Loading from "../loading";
const GAD7Questionnaire = (props) => {
  const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);
  // const Chat = (props) => {
  //   const handleReadOutLoudPress = async (text) => {
  //     // Start the TTS engine and pass the text as a parameter
  //     // Initialize the TTS engine
  //     //
  //     try {
  //       if (globalState.speakEnabled)
  //         globalState.Speech.speak(text, { language: "en-US" });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   // useEffect(() => {
  //   handleReadOutLoudPress(props.message);
  //   // });
  //   return (
  //     <View
  //       style={
  //         props.type === "toUser"
  //           ? {
  //               flexDirection: "row",
  //               position: "relative",
  //               padding: 10,
  //               width: "100%",
  //               marginVertical: 30,
  //               alignSelf: "baseline",
  //             }
  //           : {
  //               left: 5,
  //               flexDirection: "row",
  //               position: "relative",
  //               padding: 10,
  //               marginTop: 20,
  //             }
  //       }
  //     >
  //       {props.type === "toUser" && (
  //         <>
  //           <View
  //             style={{
  //               position: "absolute",
  //               right: "14%",
  //               width: "80%",
  //               alignSelf: "baseline",
  //               backgroundColor: "rgba(0, 0, 0, 0.4)",
  //               borderRadius: 10,
  //               opacity: 0.8,
  //             }}
  //           >
  //             <Text style={{ color: "#FFFFFF", padding: 10 }}>
  //               {props.message}
  //             </Text>
  //           </View>
  //           <View style={{ position: "absolute", right: "5%" }}>
  //             <MaterialCommunityIcons
  //               name="account"
  //               color={"gray"}
  //               size={30}
  //             ></MaterialCommunityIcons>
  //           </View>
  //         </>
  //       )}
  //       {props.type === "toBot" && (
  //         <>
  //           <View style={{ position: "absolute" }}>
  //             <MaterialCommunityIcons
  //               name="account"
  //               color={"gray"}
  //               size={30}
  //             ></MaterialCommunityIcons>
  //           </View>
  //           <View
  //             style={{
  //               position: "absolute",
  //               left: 40,
  //               width: "80%",
  //               alignSelf: "baseline",
  //               backgroundColor: "rgba(255, 255, 255, 0.7)",
  //               borderRadius: 5,
  //               padding: 5,
  //             }}
  //           >
  //             {props.responses.map((option, index) => (
  //               <TouchableOpacity
  //                 key={option}
  //                 style={{
  //                   backgroundColor: "rgba(0, 0, 0, 0.4)",
  //                   opacity: 0.7,
  //                   padding: 5,
  //                   borderRadius: 5,
  //                   marginVertical: 2,
  //                 }}
  //                 onPress={() => props.handleSelection(index)}
  //               >
  //                 <Text>{option}</Text>
  //               </TouchableOpacity>
  //             ))}
  //           </View>
  //         </>
  //       )}
  //     </View>
  //   );
  // };
  // const Chat = (props) => {
  //   const handleReadOutLoudPress = async (text) => {
  //     try {
  //       if (globalState.speakEnabled)
  //         globalState.Speech.speak(text, { language: "en-US" });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     handleReadOutLoudPress(props.message);
  //   }, [props.message]);

  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         alignItems: props.type === "toUser" ? "flex-end" : "flex-start",
  //         marginVertical: 10,
  //       }}
  //     >
  //       <View
  //         style={{
  //           marginRight: 10,
  //           marginLeft: props.type === "toUser" ? 10 : 0,
  //           maxWidth: "70%",
  //         }}
  //       >
  //         <View
  //           style={{
  //             backgroundColor:
  //               props.type === "toUser" ? "#0D6FFF" : "rgba(255,255,255,0.8)",
  //             borderRadius: 10,
  //             padding: 10,
  //           }}
  //         >
  //           <Text
  //             style={{
  //               color: props.type === "toUser" ? "#FFFFFF" : "#000000",
  //             }}
  //           >
  //             {props.message}
  //           </Text>
  //         </View>
  //       </View>

  //       <View style={{ alignItems: "flex-end" }}>
  //         <MaterialCommunityIcons
  //           name="account"
  //           color={"gray"}
  //           size={30}
  //         ></MaterialCommunityIcons>
  //       </View>

  //       {props.type === "toBot" && (
  //         <View
  //           style={{
  //             maxWidth: "70%",
  //             marginTop: 10,
  //             marginLeft: props.type === "toUser" ? "auto" : 0,
  //             marginRight: props.type === "toUser" ? 0 : "auto",
  //           }}
  //         >
  //           {props.responses.map((option, index) => (
  //             <TouchableOpacity
  //               key={option}
  //               style={{
  //                 backgroundColor: "rgba(0, 0, 0, 0.4)",
  //                 opacity: 0.7,
  //                 padding: 5,
  //                 borderRadius: 5,
  //                 marginVertical: 2,
  //               }}
  //               onPress={() => props.handleSelection(index)}
  //             >
  //               <Text style={{ color: "#FFFFFF" }}>{option}</Text>
  //             </TouchableOpacity>
  //           ))}
  //         </View>
  //       )}
  //     </View>
  //   );
  // };
  const Chat = (props) => {
    const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);

    const handleReadOutLoudPress = async (text) => {
      try {
        if (globalState.speakEnabled)
          await Speech.speak(text, { language: "en-US" });
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      handleReadOutLoudPress(props.message);
    }, []);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          marginBottom: 10,
          marginLeft: props.type === "toUser" ? 0 : 5,
          marginRight: props.type === "toBot" ? 0 : 5,
          alignSelf: props.type === "toUser" ? "flex-start" : "flex-end",
        }}
      >
        {props.type === "toUser" && (
          <MaterialCommunityIcons
            name="account"
            color={"gray"}
            size={30}
            style={{ marginRight: 5 }}
          />
        )}
        <View
          style={{
            marginRight: props.type === "toUser" ? 10 : 0,
            marginLeft: props.type === "toUser" ? 0 : 10,
            maxWidth: "90%",
          }}
        >
          <View
            style={{
              backgroundColor:
                props.type === "toUser"
                  ? "#f1f0f0"
                  : "rgba(255, 255, 255, 0.7)",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>{props.message}</Text>
            {props.type === "toBot" &&
              props.responses.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    opacity: 0.9,
                    padding: 5,
                    borderRadius: 5,
                    marginVertical: 2,
                  }}
                  onPress={() => props.handleSelection(index)}
                >
                  <Text
                    style={{ fontSize: 18, color: "black", fontWeight: "bold" }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        {props.type === "toBot" && (
          <MaterialCommunityIcons name="account" color={"gray"} size={30} />
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
    const date = new Date();

    setDoc(doc(db, "/Users/" + currentUserId + "/Sessions", date.toString()), {
      GAD7Score: responses.slice(5, 12),
      decision: decision,
      averageHeartRate: 0,
      averageO2level: 0,
      date: date.getTime(),
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
