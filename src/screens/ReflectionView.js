import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReflectionView = ({ reflections }) => {
  return (
    <View style={styles.container}>
      {reflections.map((reflection, index) => (
        <View key={index} style={styles.reflectionContainer}>
          <Text style={styles.dateText}>
            {new Date(reflection.date).toLocaleDateString()}
          </Text>
          <View style={styles.responsesContainer}>
            {reflection.responses.map((response, index) => (
              <View key={index} style={styles.responseContainer}>
                <Text style={styles.questionText}>{response.question}</Text>
                <Text style={styles.responseText}>{response.response}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },

  reflectionContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  responsesContainer: {
    marginTop: 10,
  },
  responseContainer: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  responseText: {
    fontSize: 14,
  },
});

export default ReflectionView;
