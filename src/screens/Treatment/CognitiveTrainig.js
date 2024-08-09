import * as React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";
import { SuccessButton } from "../../buttons";
import { useGlobalState, bg1, bg2, bg3 } from "../../states/state";
import { useTranslation } from "react-i18next";

const CongnitiveTraining = ({ navigation }) => {
  const { t } = useTranslation();
  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            padding: 20,
            top: 100,
          }}
        >
          <View style={styles.bar}>
            <SuccessButton
              title="Phase 1: Mindful Awareness"
              onPress={() => {
                navigation.navigate(t("cognitiveTrainingPhase"), {
                  phase: "Phase 1: Mindful Awareness",
                });
              }}
            ></SuccessButton>
          </View>
          <View style={styles.bar}>
            <SuccessButton
              title="Phase 2: Challenging Thought Patterns"
              onPress={() => {
                navigation.navigate(t("cognitiveTrainingPhase"), {
                  phase: "Phase 2: Challenging Thought Patterns",
                });
              }}
            ></SuccessButton>
          </View>
          <View style={styles.bar}>
            <SuccessButton
              title="Phase 3: Building Resilience"
              onPress={() => {
                navigation.navigate(t("cognitiveTrainingPhase"), {
                  phase: "Phase 3: Building Resilience",
                });
              }}
            ></SuccessButton>
          </View>
          <View style={styles.bar}>
            <SuccessButton
              title="Phase 4: Stress Management Strategies"
              onPress={() => {
                navigation.navigate(t("cognitiveTrainingPhase"), {
                  phase: "Phase 4: Stress Management Strategies",
                });
              }}
            ></SuccessButton>
          </View>
          <View style={styles.bar}>
            <SuccessButton
              title="Phase 5: Maintaining Balance"
              onPress={() => {
                navigation.navigate(t("cognitiveTrainingPhase"), {
                  phase: "Phase 5: Maintaining Balance",
                });
              }}
            ></SuccessButton>
          </View>
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
  bar: { marginVertical: 10 },
});
export default CongnitiveTraining;
