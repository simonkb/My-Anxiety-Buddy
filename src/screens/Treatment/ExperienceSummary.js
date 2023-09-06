import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Alert,
} from "react-native";
import img from "../../../assets/experiencySummaryBg.png";
import { useNavigation } from "@react-navigation/native";
import { SuccessButton } from "../../buttons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExperienceSummary = (props) => {
  const navigator = useNavigation();
  var summary = [];
  try {
    summary = JSON.parse(props.summary);
  } catch (error) {
    Alert.alert(
      "Error",
      "An error occured while generating summary please try again."
    );

    navigator.navigate("Home");
    return;
  }

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardPress = (label, content) => {
    setSelectedCard({ label, content });
    setOverlayVisible(true);
  };

  const handleOverlayDismiss = () => {
    setOverlayVisible(false);
    setSelectedCard({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Situation Summary</Text>
      <View
        style={{
          width: "100%",
          marginHorizontal: 10,
          height: "100%",
          paddingBottom: 500,
        }}
      >
        <ImageBackground source={img} style={styles.experienceSummaryBg} />
        <TouchableOpacity
          style={styles.eventCard}
          onPress={() => handleCardPress("Event", summary[1]?.content)}
        >
          <Text style={styles.cardLabel}>Event</Text>
          <MaterialCommunityIcons
            name="arrow-expand"
            size={20}
            style={{
              position: "absolute",
              right: 4,
              top: 2,
            }}
          ></MaterialCommunityIcons>

          <Text style={styles.smallText}>{summary[1]?.content}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.thoughtsCard}
          onPress={() => handleCardPress("Thoughts", summary[0]?.content)}
        >
          <Text style={styles.cardLabel}>Thoughts</Text>
          <MaterialCommunityIcons
            name="arrow-expand"
            size={20}
            style={{
              position: "absolute",
              right: 4,
              top: 2,
            }}
          ></MaterialCommunityIcons>
          <Text style={styles.smallText}>{summary[0]?.content}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.constructiveCard}
          onPress={() =>
            handleCardPress(`Constructive Behaviors`, summary[3]?.content)
          }
        >
          <Text style={styles.cardLabel}>Constructive{"\n"}Behaviors</Text>
          <MaterialCommunityIcons
            name="arrow-expand"
            size={20}
            style={{
              position: "absolute",
              right: 4,
              top: 2,
            }}
          ></MaterialCommunityIcons>
          <Text style={styles.smallText}>{summary[3]?.content}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.destructiveCard}
          onPress={() =>
            handleCardPress(`Destructive Behaviors`, summary[4]?.content)
          }
        >
          <Text style={styles.cardLabel}>Destructive{"\n"}Behaviors</Text>
          <MaterialCommunityIcons
            name="arrow-expand"
            size={20}
            style={{
              position: "absolute",
              right: 4,
              top: 2,
            }}
          ></MaterialCommunityIcons>
          <Text style={styles.smallText}>{summary[4]?.content}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emotionsCard}
          onPress={() => handleCardPress(`Emotions`, summary[2]?.content)}
        >
          <Text style={styles.cardLabel}>Emotions</Text>
          <MaterialCommunityIcons
            name="arrow-expand"
            size={20}
            style={{
              position: "absolute",
              right: 4,
              top: 2,
            }}
          ></MaterialCommunityIcons>
          <Text style={styles.smallText}>{summary[2]?.content}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionsCard}
          onPress={() =>
            handleCardPress(`My recomendations for you.`, summary[5]?.content)
          }
        >
          <Text style={styles.cardLabel}>My recomendations for you.</Text>
          <MaterialCommunityIcons
            name="arrow-expand"
            size={20}
            style={{
              position: "absolute",
              right: 4,
              top: 2,
            }}
          ></MaterialCommunityIcons>
          <Text style={styles.smallText}>{summary[5]?.content}</Text>
        </TouchableOpacity>
        <View
          style={styles.button1}
          onPress={() => navigator.navigate("Home", { chatType: "breathing" })}
        >
          <SuccessButton
            title={"Continue to calm breathing section"}
            onPress={() =>
              navigator.navigate("Home", { chatType: "breathing" })
            }
          ></SuccessButton>
        </View>
      </View>

      <Modal
        visible={overlayVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleOverlayDismiss}
      >
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <TouchableOpacity
              style={styles.overlayCloseButton}
              onPress={handleOverlayDismiss}
            >
              <Text style={styles.overlayCloseButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.overlayTitle}>{selectedCard.label}</Text>
            <ScrollView style={styles.overlayScrollView}>
              <Text style={styles.overlayText}>{selectedCard.content}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  smallText: { fontSize: 10, margin: 5, textAlign: "justify" },

  experienceSummaryBg: {
    height: 200,
    position: "absolute",
    top: 108,
    width: 200,
    left: 125.5,
  },
  eventCard: {
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    height: 142,
    left: 15,
    position: "absolute",
    top: 135,
    width: 120,
    overflow: "scroll",
  },

  cardLabel: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 10,
    alignSelf: "center",
  },
  thoughtsCard: {
    height: 100,
    left: 115,
    position: "absolute",
    top: 20,
    width: 200,
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    overflow: "scroll",
  },

  constructiveCard: {
    height: 130,
    left: 15,
    position: "absolute",
    top: 307,
    width: 175,
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    overflow: "scroll",
  },
  suggestionsCard: {
    height: 130,
    left: "5%",
    right: "5%",
    width: "90%",
    position: "absolute",
    top: 450,
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    overflow: "scroll",
  },
  destructiveCard: {
    height: 130,
    right: 15,
    position: "absolute",
    top: 307,
    width: 175,
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    overflow: "scroll",
  },
  emotionsCard: {
    height: 135,
    right: 15,
    position: "absolute",
    top: 135,
    width: 126,
    backgroundColor: "#d9d9d9b2",
    borderRadius: 15,
    overflow: "scroll",
  },

  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 5,
  },
  button1: {
    alignSelf: "center",
    position: "absolute",
    top: 600,
  },
  buttonText1: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "90%",
  },
  overlayCloseButton: {
    position: "absolute",
    right: 0,
    width: 30,
    height: 40,
  },
  overlayCloseButtonText: {
    fontSize: 25,
    fontWeight: "700",
    color: "gray",
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  overlayScrollView: {
    maxHeight: "70%",
  },
  overlayText: {
    fontSize: 20,
    textAlign: "justify",
  },
});

export default ExperienceSummary;
