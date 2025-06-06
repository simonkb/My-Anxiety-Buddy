import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { Video } from "expo-av";
import LevelPicker from "./levelPicker";
import Loading from "../loading";
import ReflectionComponent from "./ReflectionComponent";
import { SuccessButton } from "../buttons";
import { useTranslation } from "react-i18next";

export default function VideoPlayer({ videoFilename }) {
  const [videoRef, setVideoRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoWidth, setVideoWidth] = useState("100%");
  const [videoHeight, setVideoHeight] = useState("100%");
  const [difficulty, setDifficulty] = useState(
    "https://firebasestorage.googleapis.com/v0/b/anti-anxiety-6a2fd.appspot.com/o/videos%2Feasy.mp4?alt=media&token=cc1040c9-3ea1-4340-8560-d2f87c833e0e"
  ); // default value is 'easy'
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [displayReflection, setDisplayReflection] = useState(false);
  const handlePlayPause = async () => {
    if (videoRef && isPlaying) {
      // Stop the video
      await videoRef.pauseAsync();
      setIsPlaying(false);
      setVideoWidth("100%");
      //if (loopCount >= 3) {
      setDisplayReflection(true);
      //}
      setLoopCount(0);
      // setVideoHeight("100%");
    } else if (videoRef && !isPlaying) {
      // Start playing the video from the beginning
      setLoopCount(0);
      await videoRef.setPositionAsync(0);
      await videoRef.playAsync();
      setIsPlaying(true);
      setVideoWidth(Dimensions.get("window").width);
      setVideoHeight(Dimensions.get("window").height);
      setDisplayReflection(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const handleLoadStart = () => {
    setIsLoading(true);
    setIsError(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setIsError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };
  const handleVideoReady = () => {
    setIsVideoReady(true);
  };
  useEffect(() => {
    setIsVideoReady(false);
  }, [difficulty]);

  const handlePlaybackStatusUpdate = (playbackStatus) => {
    const { positionMillis, durationMillis, isLooping } = playbackStatus;
    if (positionMillis === durationMillis && isLooping) {
      setLoopCount(loopCount + 0.5);
    }
  };
  if (loopCount === 10) {
    Alert.alert(
      t("Success"),
      t("Good job, you have completed 10 cycles of breathing.")
    );
    videoRef.pauseAsync();
    setIsPlaying(false);
    setVideoWidth("100%");
    setDisplayReflection(true);
    setLoopCount(0);
  }
  const { t } = useTranslation();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        //padding: 10,
      }}
    >
      <LevelPicker
        selectedLevel={difficulty}
        onLevelSelected={setDifficulty}
      ></LevelPicker>
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
        {!isVideoReady && <Loading />}
        {isError && (
          <Text>{t("Oops! An error occurred while loading the video.")}</Text>
        )}

        <Video
          ref={(ref) => setVideoRef(ref)}
          style={{
            flexGrow: 1,
            width: "100%",
            height: "100%",
            marginVertical: 5,
          }}
          source={{ uri: difficulty }}
          useNativeControls={false}
          resizeMode="contain"
          isLooping
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          onReadyForDisplay={handleVideoReady}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </View>

      <SuccessButton
        title={t(isPlaying ? "Stop" : "Start")}
        onPress={handlePlayPause}
      ></SuccessButton>

      <View
        style={{
          backgroundColor: "gray",
          padding: 10,
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 5,
        }}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
        >
          {t("Breath Count:")} {loopCount}
        </Text>
      </View>

      {displayReflection && (
        <ReflectionComponent
          activity={"breathing exercise"}
          onClose={() => {
            setDisplayReflection(false);
          }}
        />
      )}
    </View>
  );
}
