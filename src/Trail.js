import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";

const BREATH_DURATION = 2500;
const HOLD_DURATION = 1000;

const BreathingGuide = () => {
  const [inhaleAnim] = useState(new Animated.Value(1));
  const [exhaleAnim] = useState(new Animated.Value(1));
  const [breathText, setBreathText] = useState("Inhale");

  useEffect(() => {
    animateBreathing();
  }, []);

  const animateBreathing = () => {
    LayoutAnimation.configureNext({
      duration: BREATH_DURATION,
      update: {
        type: LayoutAnimation.Types.easeInOut,
        property: LayoutAnimation.Properties.scaleY,
      },
    });

    if (breathText === "Inhale") {
      setBreathText("Exhale");
      exhaleAnim.setValue(1);
      inhaleAnim.setValue(0);
    } else {
      setBreathText("Inhale");
      exhaleAnim.setValue(0);
      inhaleAnim.setValue(1);
    }

    setTimeout(() => {
      animateBreathing();
    }, BREATH_DURATION + HOLD_DURATION);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.breathIndicator,
          { transform: [{ scaleY: exhaleAnim }] },
        ]}
      />
      <TouchableOpacity onPress={animateBreathing}>
        <Text style={styles.breathText}>{breathText}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.breathIndicator,
          { transform: [{ scaleY: inhaleAnim }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breathIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
  },
  breathText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default BreathingGuide;

