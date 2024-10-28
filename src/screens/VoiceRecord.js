import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalState, bg1, bg2, bg3 } from "../states/state";
import { useTranslation } from "react-i18next";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSOutputFormat,
} from "expo-av/build/Audio";
import { SuccessButton } from "../buttons";
import { useNavigation } from "@react-navigation/native";

const VoiceRecord = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [mood, setMood] = useState(null);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigation();

  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }
  const { t } = useTranslation();

  const messages = [
    "It's a calm day, and everything feels just right. Embrace the tranquility around you. Let your voice reflect this peaceful moment.",
    "Take a moment to breathe deeply and relax. Allow your thoughts to flow freely. Your voice can express a range of feelings today.",
    "Imagine a beautiful sunset as you speak. Think of the colors blending in the sky. Let your emotions guide your voice in this moment.",
    "Your words can carry joy, sadness, or calmness. Reflect on the good moments as you share your voice. Feel the warmth of the sun as you talk.",
    "Think of a happy memory while you speak. Let that happiness shine through your voice. Embrace the joy of sharing your thoughts.",
    "Picture a serene landscape while you talk. Imagine the gentle breeze and soft sounds around you. Allow your voice to convey a sense of peace and clarity.",
    "As you speak, think of the different shades of emotion. Your voice can tell a story filled with different feelings. Let your thoughts resonate with the beauty around you.",
    "Imagine a peaceful scene and let your voice reflect that. Breathe deeply and express what you feel. Each word can paint a picture of your emotions.",
    "Feel free to express any thoughts or feelings that come to mind. Your voice can be a powerful tool for sharing your inner world. Let it flow naturally, without pressure.",
    "Allow your voice to resonate with a mixture of feelings. Embrace the complexity of your emotions. Your words can create a rich tapestry of sound and sentiment.",
  ];

  useEffect(() => {
    setRandomMessage();
  }, []);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access microphone is denied");
        return;
      }
      await Audio.setAudioModeAsync({
        //This is needed for iOS
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          extension: ".wav",
          outputFormat: AndroidOutputFormat.DEFAULT,
          audioEncoder: AndroidAudioEncoder.DEFAULT,
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          extension: ".wav",
          outputFormat: IOSOutputFormat.LINEARPCM,
        },
      });
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const setRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setTextMessage(messages[randomIndex]);
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      getEmotion(uri);
      setRandomMessage();
      showNotification(uri);
    }
  };

  const showNotification = (uri) => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  const discardRecording = () => {
    setRecordedUri(null);
    setSound(null);
  };
  const emotions = {
    1: {
      emotion: "Neutral",
      emoji: "😐",
      color: "#a4c3e2",
      message:
        "It seems you're feeling neutral. This could be a great time to explore new ideas! Head over to the reading section for some inspiration.",
      title: "Go to Readings",
      onPress: () => {
        navigator.navigate("Treatment");
      },
    },
    2: {
      emotion: "Calm",
      emoji: "😌",
      color: "#98FB98",
      message:
        "You're feeling calm. Moments like these are perfect to reflect on your day! Go to the journal and capture this peaceful moment.",
      title: "Go to Journaling",
      onPress: () => {
        navigator.navigate(t("journaling"));
      },
    },
    3: {
      emotion: "Happy",
      emoji: "😊",
      color: "#FFD700",
      message:
        "You're feeling happy! Let's keep that positivity going. Why not head to the journal and record this joyful moment?",
      title: "Go to Journaling",
      onPress: () => {
        navigator.navigate(t("journaling"));
      },
    },
    4: {
      emotion: "Sad",
      emoji: "😢",
      color: "#87CEEB",
      message:
        "It looks like you're feeling sad. Take a moment to calm down and try a breathing exercise. Remember, it's okay to feel this way.",
      title: "Go to Breathing Guide",
      onPress: () => {
        navigator.navigate(t("home"), { chatType: "breathing" });
      },
    },
    5: {
      emotion: "Angry",
      emoji: "😠",
      color: "#f28055",
      message:
        "You're feeling angry. Take a deep breath and let's go through some calming exercises together to help manage those feelings.",
      title: "Go to Breathing Guide",
      onPress: () => {
        navigator.navigate(t("home"), { chatType: "breathing" });
      },
    },
    6: {
      emotion: "Fear",
      emoji: "😱",
      color: "#FFB6C1",
      message:
        "You're feeling fearful. Reflecting on the situation may help. Let's go to the situation entry and work through it together.",
      title: "Situation Entry",
      onPress: () => {
        navigator.navigate(t("situationEntryRoute"));
      },
    },
    7: {
      emotion: "Disgust",
      emoji: "🙄",
      color: "#FFDAB9",
      message:
        "You're feeling disgusted. Processing these emotions can help. Head to the situation entry to sort through these feelings.",
      title: "Situation Entry",
      onPress: () => {
        navigator.navigate(t("situationEntryRoute"));
      },
    },
    8: {
      emotion: "Surprise",
      emoji: "😲",
      color: "#FF69B4",
      message:
        "You're feeling surprised! This is a moment to remember. Visit the journal and capture this unexpected feeling.",
      title: "Go to Journaling",
      onPress: () => {
        navigator.navigate(t("journaling"));
      },
    },
  };

  const getEmotion = async (_recordingUri) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", {
        uri: _recordingUri,
        type: "audio/wav",
        name: "recording.wav",
      });

      const response = await fetch(
        "https://seremotionpredictor-294911660009.asia-south1.run.app/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to fetch emotion data");
      const result = await response.json();

      const emotionData = emotions[result.prediction];
      setMood(emotionData);
      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    } catch (error) {
      console.error("API call failed:", error);
      Alert.alert("Error", "Failed to analyze the emotion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={currentBg}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.instruction}>
            {t(
              "Please read the following text while recording. When you are done, click Stop."
            )}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>{t(textMessage)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {isRecording ? (
            <>
              <TouchableOpacity style={styles.button} onPress={stopRecording}>
                <MaterialIcons name="stop" size={30} color="#fff" />
                <Text style={styles.buttonText}>{t("Stop Recording")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={discardRecording}
              >
                <MaterialIcons name="delete" size={30} color="#fff" />
                <Text style={styles.buttonText}>{t("Discard Recording")}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={startRecording}>
              <MaterialIcons name="mic" size={30} color="#fff" />
              <Text style={styles.buttonText}>{t("Start Recording")}</Text>
            </TouchableOpacity>
          )}
        </View>
        {mood && !isLoading && !recording && (
          <>
            <Animated.View
              style={{
                ...styles.textContainer,
                backgroundColor: mood.color,
                transform: [{ scale: scaleAnim }],
              }}
            >
              <Text style={styles.instruction}>{t(mood.message)}</Text>
            </Animated.View>
            <SuccessButton
              title={t(mood.title)}
              onPress={mood.onPress}
            ></SuccessButton>
          </>
        )}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={styles.loadingIndicator}
          />
        )}

        {notificationVisible && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>
              {t("The voice recording will be discarded after analyzing")}
            </Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  instruction: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  textContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    marginBottom: 20,
    elevation: 5,
    alignItems: "center",
    width: "90%",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
  },
  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  notification: {
    position: "absolute",
    top: 50,
    padding: 15,
    backgroundColor: "#28a745",
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  notificationText: {
    color: "#fff",
    fontSize: 14,
  },
  recordingStatus: {
    marginTop: 10,
    fontSize: 14,
    color: "green",
  },
  bgImage: {
    flex: 1,
  },
  moodDisplay: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 40,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginVertical: 20,
    transform: [{ scale: 1 }],
  },
  moodText: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  moodEmoji: { fontSize: 50, marginVertical: 10 },
});

export default VoiceRecord;
