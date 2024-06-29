import React, { useRef, useState, useContext, useEffect } from "react";
import { Animated, TouchableOpacity, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const OverlayComponent = ({ isVisible, onClose, type }) => {
  const Tips = {
    BreathingGuide: {
      descriptions:
        "About Breathing Exercise\n\n" +
        "Yes! That is true! We usually don’t pay attention to how we breathe because it’s a completely automatic process." +
        "\n\nHowever, in this exercise, we aim to have you more aware about your breathing." +
        "\n\nAs you start incorporating breathing exercises into your daily routine, this will surely have many benefits for you. It reduces anxiety, promotes calmness, increases your focus and overall mental well being." +
        "\n\nThere are many techniques for deep mindful breathing. Our app is suggesting ‘4-7-8 Breathing’ technique for you. This technique is known as the natural tranquilizer for the nervous system." +
        "\n\nBefore starting this exercise, we urge you to perform the exercise in a setting where you’re prepared to fully relax. Such exercises would not necessarily make you sleep but they will put you in a state of deep relaxation. That is their charm!",
    },
    BrainExercise: {
      descriptions:
        "About Brain Exercise" +
        "\nSolve a crossword puzzle or Sudoku to improve your cognitive abilities." +
        "Read a book or article to exercise your brain and expand your knowledge." +
        "Play brain games like chess, Scrabble, or memory matching to challenge yourself." +
        "Learn a new skill or hobby to stimulate your brain and increase creativity." +
        "Do mental math exercises or quizzes to improve your problem-solving skills.",
    },
    ShortReadings: {
      descriptions:
        "About short readings\n\n" +
        "Read a daily inspirational quote to start your day on a positive note." +
        "Subscribe to a newsletter for short and informative articles on a variety of topics." +
        "Read a short story or poem to relax and de-stress." +
        "Follow a social media account that posts daily motivational messages." +
        "Read a news summary or headline to stay informed without overwhelming yourself.",
    },
    Journaling: {
      descriptions:
        "About Journaling\n\n" +
        "Write down your thoughts and feelings in a journal to reflect on your experiences." +
        "Keep a gratitude journal to focus on the positive aspects of your life." +
        "Write a to-do list or goals for the day to increase productivity and motivation." +
        "Use a journal prompt or question to spark creativity and self-reflection." +
        "Write about a challenge you faced and how you overcame it to build resilience.",
    },
  };

  return (
    <ScrollView
      style={{
        position: "absolute",
        flex: 1,
        top: 20,
        left: 20,
        right: 20,

        backgroundColor: "rgba(142,94,181,1)",

        opacity: 0.95,
        borderRadius: 15,
        padding: 10,
        height: "80%",
      }}
    >
      <Text
        style={{
          padding: 10,
          color: "white",
        }}
      >
        {Tips[type].descriptions}
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
