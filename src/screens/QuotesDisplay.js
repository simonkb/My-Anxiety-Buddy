import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
const QuoteDisplay = ({ quote, onSave, onClick }) => {
  const handleSave = async () => {
    try {
      if (auth.currentUser) {
        const currentUserId = auth.currentUser.uid;
        await setDoc(
          doc(db, `Users/${currentUserId}/savedQuotes`, quote.id),
          quote
        );
        Alert.alert("Success", "Saved");
      } else {
        alert("Please login or sign up if you are a new user.");
      }
    } catch (error) {
      if (error.code === "already-exists") {
        // Document with the same ID already exists
        alert("This quote is already saved!");
      } else {
        // Handle other errors
        alert(
          "An error occurred while saving a quote, make sure you are connected to the internet."
        );
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <TouchableOpacity
          onPress={() => {
            if (onClick) onClick();
          }}
        >
          <Text style={styles.quoteText}>{quote?.quote}</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleSave} style={styles.likeButton}>
            <Ionicons name="heart" size={20} color="red" />
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <View style={styles.authorContainer}>
            <Text style={styles.authorText}>- {quote?.author}</Text>
            <Text style={styles.yearText}>{quote?.year}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  quoteContainer: {
    width: "95%",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotateY: "-10deg" }],
  },
  quoteText: {
    fontSize: 26,
    fontStyle: "italic",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  saveText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  authorContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  authorText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  yearText: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default QuoteDisplay;
