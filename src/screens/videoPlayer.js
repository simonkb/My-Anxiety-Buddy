import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Video } from "expo-av";

export default function VideoPlayer({ videoFilename }) {
  const [videoRef, setVideoRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoWidth, setVideoWidth] = useState("100%");
  const [videoHeight, setVideoHeight] = useState("100%");

  const handlePlayPause = async () => {
    if (videoRef && isPlaying) {
      // Stop the video
      await videoRef.pauseAsync();
      setIsPlaying(false);
      setIsFullScreen(false);
      setVideoWidth("100%");
      // setVideoHeight("100%");
    } else if (videoRef && !isPlaying) {
      // Start playing the video from the beginning
      await videoRef.setPositionAsync(0);
      await videoRef.playAsync();
      setIsPlaying(true);
      setIsFullScreen(true);
      setVideoWidth(Dimensions.get("window").width);
      setVideoHeight(Dimensions.get("window").height);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        //height: "100%",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        padding: 10,
      }}
    >
      <View
        style={{
          overflow: "hidden",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flexGrow: 1,
          width: videoWidth,
          height: videoHeight,
          maxHeight: 500,
          maxWidth: 800,
        }}
      >
        <Video
          ref={(ref) => setVideoRef(ref)}
          style={{
            flexGrow: 1,
            width: "100%",
            height: "100%",
          }}
          source={require("../../assets/breathingGuide.mp4")}
          useNativeControls={false}
          resizeMode="contain"
          isLooping
        />
      </View>
      <TouchableOpacity
        onPress={handlePlayPause}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {isPlaying ? "Stop" : "Start"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
