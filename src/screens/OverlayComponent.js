import React, { useRef, useState, useContext, useEffect } from "react";
import { Animated, TouchableOpacity, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const OverlayComponent = ({ isVisible, onClose }) => {
  let message =
    "About Breathing Exercise\n\n" +
    "Yes! That is true! We usually don’t pay attention to how we breathe because it’s a completely automatic process." +
    "\n\nHowever, in this exercise, we aim to have you more aware about your breathing." +
    "\n\nAs you start incorporating breathing exercises into your daily routine, this will surely have many benefits for you. It reduces anxiety, promotes calmness, increases your focus and overall mental well being." +
    "\n\nThere are many techniques for deep mindful breathing. Our app is suggesting ‘4-7-8 Breathing’ technique for you. This technique is known as the natural tranquilizer for the nervous system." +
    "\n\nBefore starting this exercise, we urge you to perform the exercise in a setting where you’re prepared to fully relax. Such exercises would not necessarily make you sleep but they will put you in a state of deep relaxation. That is their charm!";

  return (
    <ScrollView
      style={{
        position: "absolute",
        flex: 1,
        top: 20,
        left: 20,
        right: 20,

        backgroundColor: "black",

        opacity: 0.8,
        borderRadius: 15,
        padding: 10,
      }}
    >
      <Text
        style={{
          padding: 10,
          color: "white",
        }}
      >
        {message}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          borderRadius: 5,
          marginTop: 20,
          padding: 10,
          width: 60,
          alignSelf: "center",
        }}
        onPress={onClose}
      >
        <Text style={{ color: "white", alignSelf: "center" }}>OK</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default OverlayComponent;
