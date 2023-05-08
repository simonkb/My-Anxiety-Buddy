import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "firebase/firestore";
import { GlobalStateContext } from "../states/GlobalState";
import Loading from "../loading";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import Speech from "expo-speech";
const GAD7Questionnaire = (props) => {
  const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);
  const Chat = (props) => {
    //const { globalState, setGlobalStateNew } = useContext(GlobalStateContext);
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
  const handleSelection = async (response) => {
    // Add response to responses array
    setResponses([...responses, response]);
    setCurrentQuestion(currentQuestion + 1);
  };
  //Reading vitals
  const [heartRate, setHeartRate] = useState<HealthValue[]>([]);
  const [respiratoryRate, setRespiratoryRate] = useState<HealthValue[]>([]);
  const [oxygenSaturation, setOxygenSaturation] = useState<HealthValue[]>([]);
  const [authorized, setAuthorized] = useState<boolean>(false);
  useEffect(() => {
    if (Platform.OS === "ios" && !Platform.isPad) {
      const permissions = {
        permissions: {
          read: [
            AppleHealthKit.Constants.Permissions.HeartRate,
            AppleHealthKit.Constants.Permissions.RespiratoryRate,
            AppleHealthKit.Constants.Permissions.OxygenSaturation,
          ],
        },
      } as HealthKitPermissions;
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        /* Called after we receive a response from the system */
        if (error) {
          Alert.alert("Error", "Access to health data denied. " + error);
        } else {
          setAuthorized(true);
        }
      });

      if (authorized) {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const options = {
          startDate: tenMinutesAgo.toISOString(),
          endDate: new Date().toISOString(),
        };
        AppleHealthKit.getHeartRateSamples(
          options,
          (callbackError: string, heartRateResults: HealthValue[]) => {
            /* Heart rate samples are now collected from HealthKit */
            // console.log(heartRateResults, "HR");
            setHeartRate(heartRateResults);
          }
        );
        AppleHealthKit.getRespiratoryRateSamples(
          options,
          (callbackError: string, respiratoryRateResults: HealthValue[]) => {
            /* Respiratory rate samples are now collected from HealthKit */
            setRespiratoryRate(respiratoryRateResults);
          }
        );
        AppleHealthKit.getOxygenSaturationSamples(
          options,
          (callbackError: string, oxygenSaturationResults: HealthValue[]) => {
            /* Blood oxygen level samples are now collected from HealthKit */
            setOxygenSaturation(oxygenSaturationResults);
          }
        );
      } else {
        //alert("Access to health data denied.");
        AppleHealthKit.initHealthKit(permissions, (error: string) => {
          /* Called after we receive a response from the system */
          if (error) {
            Alert.alert("Error", "Cannot grant permissions!. " + error);
          } else {
            setAuthorized(true);
            // Alert.alert("Access to health data granted.");
          }
        });
      }
    }

    let healthData = {
      heartRate: heartRate,
      respiratoryRate: respiratoryRate,
      oxygenSaturation: oxygenSaturation,
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
      //Calulating average of the vitals

      let heartRateValues = healthData.heartRate.map((sample) =>
        sample.value !== undefined ? sample.value : 0
      );
      let oxygenSaturationValues = healthData.oxygenSaturation.map((sample) =>
        sample.value !== undefined ? sample.value : 0
      );
      let respiratoryRateValues = healthData.respiratoryRate.map((sample) =>
        sample.value !== undefined ? sample.value : 0
      );
      const a = heartRateValues.reduce((total, current) => total + current, 0);
      const mean1 = Math.ceil(
        a / (heartRateValues.length > 0 ? heartRateValues.length : 1)
      );
      const b = oxygenSaturationValues.reduce(
        (total, current) => total + current,
        0
      );
      const mean2 = Math.ceil(
        b /
          (oxygenSaturationValues.length > 0
            ? oxygenSaturationValues.length
            : 1)
      );
      const c = respiratoryRateValues.reduce(
        (total, current) => total + current,
        0
      );
      const mean3 = Math.ceil(
        c /
          (respiratoryRateValues.length > 0 ? respiratoryRateValues.length : 1)
      );

      const currentUserId = auth.currentUser.uid;
      const date = new Date();

      setDoc(
        doc(db, "/Users/" + currentUserId + "/Sessions", date.toString()),
        {
          GAD7Score: responses.slice(5, 12),
          decision: decision,
          averageHeartRate: mean1,
          averageO2level: mean2,
          averageRespiratoryRate: mean3,
          date: date.getTime(),
        }
      );
      props.handleOnPress("Done with GAD7", responses.slice(5, 12));
    }
  }, [currentQuestion]);

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
