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
import OverlayComponent from "../OverlayComponent";

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
    navigator.navigate("Readings");
  };
  const onJournalingPressed = () => {
    navigator.navigate("Journals");
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

  const onBreathingPressed1 = () => {
    setOverlayVisible(true);
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
          />
        )}
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
});

export default TreatmentHome;
