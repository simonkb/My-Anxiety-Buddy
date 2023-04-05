import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function Trial() {
  const [sound, setSound] = useState(Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/breathing.mp3")
    );
    setSound(sound);
  }

  return (
    <View>
      <TouchableOpacity onPress={loadSound}>
        <Text>Load Sound</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
        <Text>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
    </View>
  );
}
