import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons
import { useGlobalState, bg1, bg2, bg3 } from "../states/state";

const VoiceRecord = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);
  const [sound, setSound] = useState(null); // State for sound playback
  const [isPlaying, setIsPlaying] = useState(false); // State for playing status
  const [notificationVisible, setNotificationVisible] = useState(false); // State for notification visibility
  const [textMessage, setTextMessage] = useState(""); // State for the text message

  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }

  // Array of random messages
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
    // Set the initial message when the component mounts
    setRandomMessage();
  }, []);

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
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

      console.log("Starting recording..");
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const setRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setTextMessage(messages[randomIndex]); // Set a random message
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI(); // Get the URI of the recorded audio
      setRecordedUri(uri); // Store the recorded URI
      setRecording(null);
      setIsRecording(false);
      console.log("Recording stopped and stored at", uri);

      // Change the message to a new random message after stopping
      setRandomMessage();
      showNotification(uri); // Show notification with the recorded URI
    }
  };

  const showNotification = (uri) => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false); // Hide notification after 3 seconds
    }, 3000);
  };

  const discardRecording = () => {
    console.log("Discarding recording..");
    setRecordedUri(null); // Clear the recorded URI
    setSound(null); // Clear the sound instance
    setIsPlaying(false); // Reset playing status
  };

  const playSound = async () => {
    if (recordedUri) {
      console.log("Playing sound..");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: 1,
        interruptionModeAndroid: 1,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false, // This ensures it plays through loudspeaker on Android
      });
      const { sound: playbackSound } = await Audio.Sound.createAsync(
        { uri: recordedUri },
        { shouldPlay: true }
      );
      setSound(playbackSound);
      setIsPlaying(true);
      playbackSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          playbackSound.unloadAsync(); // Unload the sound after playback
        }
      });
    }
  };

  return (
    <ImageBackground
      source={currentBg}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.instruction}>
            Please read the following text while recording. When you are done,
            click Stop.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>
            {textMessage} {/* Display the random message */}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {isRecording ? (
            <>
              <TouchableOpacity style={styles.button} onPress={stopRecording}>
                <MaterialIcons name="stop" size={30} color="#fff" />
                <Text style={styles.buttonText}>Stop Recording</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={discardRecording}
              >
                <MaterialIcons name="delete" size={30} color="#fff" />
                <Text style={styles.buttonText}>Discard Recording</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={startRecording}>
              <MaterialIcons name="mic" size={30} color="#fff" />
              <Text style={styles.buttonText}>Start Recording</Text>
            </TouchableOpacity>
          )}
        </View>
        {recordedUri && !isPlaying && (
          <TouchableOpacity style={styles.button} onPress={playSound}>
            <MaterialIcons name="play-arrow" size={30} color="#fff" />
            <Text style={styles.buttonText}>Play Recording</Text>
          </TouchableOpacity>
        )}
        {recordedUri && isPlaying && (
          <Text style={styles.recordingStatus}>Playing...</Text>
        )}
        {notificationVisible && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>
              Recording saved: {recordedUri}
            </Text>
          </View>
        )}
      </View>
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
    color: "#333", // Dark text color
    fontWeight: "bold",
  },
  textContainer: {
    backgroundColor: "#fff", // White background for the text container
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
    elevation: 5, // Elevation for Android
    alignItems: "center", // Center the text
    width: "90%", // Width of the container
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    color: "#333", // Dark text color
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
    backgroundColor: "#007bff", // Bootstrap primary color
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
    backgroundColor: "#28a745", // Green background for notification
    padding: 15,
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
});

export default VoiceRecord;
