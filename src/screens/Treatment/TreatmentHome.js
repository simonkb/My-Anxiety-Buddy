import * as React from "react";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  setGlobalState,
  useGlobalState,
  bg1,
  bg2,
  bg3,
} from "../../states/state.js";
import OverlayComponent from "./OverlayComponent";

const TreatmentHome = (route, navigation) => {
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
    navigator.navigate(t("readings"));
  };
  const onJournalingPressed = () => {
    navigator.navigate(t("journals"));
  };
  const onBreathingPressed = () => {
    navigator.navigate("Main", {
      screen: "Your Buddy",
      params: { chatType: "breathing" },
    });
  };
  const onBrainExercisePressed = () => {
    navigator.navigate("Main", {
      screen: "Your Buddy",
      params: { chatType: "brain" },
    });
  };
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [typeOfOverlay, setTypeOfOverlay] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <ScrollView>
          <View
            style={{
              width: "90%",
              backgroundColor: "rgba(217, 217, 217, 0.53)",
              borderRadius: 15,
              left: "5%",
              right: "5%",
              marginVertical: 20,
              paddingTop: 10,
              top: 10,
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
            <TouchableOpacity
              onPress={() => {
                setOverlayVisible(true);
                setTypeOfOverlay("BreathingGuide");
              }}
            >
              <View style={styles.shortTermRow1}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 17,
                    color: "#000000",
                    padding: 4,
                  }}
                >
                  i
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "90%",
              //height: "70%",
              backgroundColor: "rgba(217, 217, 217, 0.53)",
              borderRadius: 15,
              left: "5%",
              right: "5%",
              paddingTop: 10,
              marginVertical: 20,
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
            <TouchableOpacity
              onPress={() => {
                setOverlayVisible(true);
                setTypeOfOverlay("BrainExercise");
              }}
            >
              <View style={styles.shortTermRow2}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 17,
                    color: "#000000",
                    padding: 4,
                  }}
                >
                  i
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
            <TouchableOpacity
              onPress={() => {
                setOverlayVisible(true);
                setTypeOfOverlay("ShortReadings");
              }}
            >
              <View style={styles.shortTermRow3}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 17,
                    color: "#000000",
                    padding: 4,
                  }}
                >
                  i
                </Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={onJournalingPressed}>
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
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                setOverlayVisible(true);
                setTypeOfOverlay("Journaling");
              }}
            >
              <View style={styles.shortTermRow4}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 17,
                    color: "#000000",
                    padding: 4,
                  }}
                >
                  !
                </Text>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity>
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
          </TouchableOpacity> */}
          </View>
          {overlayVisible && (
            <OverlayComponent
              isVisible={overlayVisible}
              onClose={() => setOverlayVisible(false)}
              type={typeOfOverlay}
            />
          )}
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
    //justifyContent: "center",
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

  shortTermRow2: {
    width: 35,
    height: 30,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignSelf: "flex-end",
    alignItems: "center",
    margin: "0%",
    top: "-156%",
    start: -23,
  },
  shortTermRow1: {
    width: 35,
    height: 30,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignSelf: "flex-end",
    alignItems: "center",
    margin: 0,
    top: "-156%",
    start: -23,
  },
  shortTermRow3: {
    width: 35,
    height: 30,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignSelf: "flex-end",
    alignItems: "center",
    margin: 0,
    top: "-156%",
    start: -23,
  },
  shortTermRow4: {
    width: 35,
    height: 30,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignSelf: "flex-end",
    alignItems: "center",
    margin: 0,
    top: "-156%",
    start: -23,
  },
});

export default TreatmentHome;
