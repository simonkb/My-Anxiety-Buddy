import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { setGlobalState, useGlobalState } from "../../states/state.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const TreatmentHome = () => {
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
  const navigator = useNavigation();
  const onShortReadingsPressed = () => {
    navigator.navigate("Readings");
  };
  const onJournalingPressed = () => {
    navigator.navigate("Journal Chat");
  };
  const onBreathingPressed = () => {
    setGlobalState("chat", "breathing");
    navigator.navigate("Home", {
      screen: "Your Buddy",
      params: { chatType: "breathing" },
    });
  };
  const onBrainExercisePressed = () => {
    setGlobalState("chat", "brain");
    navigator.navigate("Home", {
      screen: "Your Buddy",
      params: { chatType: "brain" },
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View
          style={{
            width: "90%",
            height: "22%",
            backgroundColor: "rgba(217, 217, 217, 0.53)",
            borderRadius: 15,
            left: "5%",
            right: "5%",
            marginVertical: 5,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              paddingTop: 5,
            }}
          >
            Short Term Treatment
          </Text>
          <TouchableOpacity onPress={onBreathingPressed}>
            <View style={styles.shortTermRow}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 17,
                  color: "#FFFFFF",
                  padding: 4,
                }}
              >
                Breathing Exercise
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "90%",
            height: "70%",
            backgroundColor: "rgba(217, 217, 217, 0.53)",
            borderRadius: 15,
            left: "5%",
            right: "5%",
            paddingTop: 10,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              paddingTop: 4,
            }}
          >
            Long Term Treatments
          </Text>
          <TouchableOpacity onPress={onBrainExercisePressed}>
            <View style={styles.shortTermRow}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 17,
                  color: "#FFFFFF",
                  padding: 4,
                }}
              >
                Brain Exercise
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShortReadingsPressed}>
            <View style={styles.shortTermRow}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 17,
                  color: "#FFFFFF",
                  padding: 4,
                }}
              >
                Short Readings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.shortTermRow}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 17,
                  color: "#FFFFFF",
                  padding: 4,
                }}
              >
                Create Routines
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.shortTermRow}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 17,
                  color: "#FFFFFF",
                  padding: 4,
                }}
              >
                Meditation
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onJournalingPressed}>
            <View style={styles.shortTermRow}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 17,
                  color: "#FFFFFF",
                  padding: 4,
                }}
              >
                Journaling
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
  shortTermRow: {
    width: "90%",
    height: 35,
    backgroundColor: "#A984C3",
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    margin: "5%",
  },
});

export default TreatmentHome;
