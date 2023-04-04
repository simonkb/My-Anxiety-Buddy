import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
const FaceEmoji = () => {
  const soundObject = new Audio.Sound();
  const loadSound = async () => {
    await soundObject.loadAsync(require("../../../assets/breathing.wav"));
  };

  const breathAnim = useRef(new Animated.Value(0)).current;
  const inhaleScale = breathAnim.interpolate({
    inputRange: [0.25, 0.5, 0.75],
    outputRange: [1, 1.1, 1.2],
  });
  const exhaleScale = breathAnim.interpolate({
    inputRange: [-1, -0.75, -0.5],
    outputRange: [0.8, 0.9, 1],
  });
  const anim = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const startAnimation = () => {
    setIsAnimating(true);
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(breathAnim, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(breathAnim, {
            toValue: 1,
            duration: 7000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(breathAnim, {
            toValue: 0,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 7000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scaleInhale, {
            toValue: 2,
            duration: 3995,
            useNativeDriver: false,
          }),
          Animated.timing(scaleInhale, {
            toValue: 0,
            duration: 5,
            useNativeDriver: false,
          }),
          Animated.timing(scaleHold, {
            toValue: 1,
            duration: 1,
            useNativeDriver: false,
          }),
          Animated.timing(scaleHold, {
            toValue: 2,
            duration: 6998,
            useNativeDriver: false,
          }),
          Animated.timing(scaleHold, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false,
          }),
          Animated.timing(scaleExhale, {
            toValue: 2,
            duration: 5,
            useNativeDriver: false,
          }),
          Animated.timing(scaleExhale, {
            toValue: 0,
            duration: 7995,
            useNativeDriver: false,
          }),
        ]),
      ])
    ).start();
  };
  const stopAnimation = () => {
    setIsAnimating(false);
    anim.stopAnimation();
    breathAnim.stopAnimation();
    scaleExhale.stopAnimation();
    scaleHold.stopAnimation();
    scaleInhale.stopAnimation();
    anim.setValue(0);
    breathAnim.setValue(0);
    scaleExhale.setValue(0);
    scaleHold.setValue(0);
    scaleInhale.setValue(0);
  };

  const toggleAnimation = async () => {
    if (isAnimating) {
      stopAnimation();
      await soundObject.pauseAsync();
      await soundObject.unloadAsync();
    } else {
      loadSound();
      startAnimation();
      await soundObject.playAsync();
    }
  };

  const height = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const scaleInhale = useRef(new Animated.Value(0)).current;
  const scaleHold = useRef(new Animated.Value(0)).current;
  const scaleExhale = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ scaleX: exhaleScale }, { scaleY: exhaleScale }],
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 35,
              backgroundColor: "black",
              position: "absolute",
              top: 25,
              left: 20,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "white",
              position: "absolute",
              top: 40,
              left: 35,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "white",
              position: "absolute",
              top: 40,
              left: 55,
            }}
          />
          <View
            style={{
              width: 20,
              height: 5,
              borderRadius: 5,
              backgroundColor: "white",
              position: "absolute",
              top: 60,
              left: 42,
            }}
          />
          <Animated.View
            style={{
              width: 100,
              height: 60,
              borderRadius: 15,
              backgroundColor: "black",
              position: "absolute",
              alignContent: "center",
              justifyContent: "center",
              top: 110,
              transform: [{ scaleX: inhaleScale }, { scaleY: inhaleScale }],
            }}
          >
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      scale: scaleInhale,
                    },
                  ],
                },
              ]}
            >
              <View
                style={{
                  alignSelf: "center",
                  position: "relative",
                  display: "flex",
                  marginTop: 0,
                }}
              >
                <Text style={{ color: "white" }}>Inhale</Text>
              </View>
            </Animated.View>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      scale: scaleHold,
                    },
                  ],
                },
              ]}
            >
              <View
                style={{
                  alignSelf: "center",
                  position: "relative",
                  display: "flex",
                  marginTop: 0,
                }}
              >
                <Text style={{ color: "white" }}>Hold</Text>
              </View>
            </Animated.View>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      scale: scaleExhale,
                    },
                  ],
                },
              ]}
            >
              <View
                style={{
                  alignSelf: "center",
                  position: "relative",
                  display: "flex",
                  marginTop: 0,
                }}
              >
                <Text style={{ color: "white" }}>Exhale</Text>
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
      <View style={{ alignItems: "center", top: 60 }}>
        <View
          style={{
            width: 30,
            height: 200,
            //borderRadius: 25,
            backgroundColor: "gray",
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
            borderBottomWidth: 3,
          }}
        />
        <Animated.View
          style={{
            width: 25,
            height: height,
            // borderRadius: 25,
            // top: 40,
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
            borderBottomWidth: 3,

            backgroundColor: "green",
            position: "absolute",
            bottom: 0,
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={toggleAnimation}>
        <Text style={styles.buttonText}>{isAnimating ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  centeredView: {
    width: 100,
    height: 100,
    marginHorizontal: 70,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    margin: 10,
    top: 140,
  },
  buttonText: {
    color: "white",
  },
});
export default FaceEmoji;
