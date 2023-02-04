import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => (
  <View
    style={{
      marginTop: 40,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ActivityIndicator size="large" />
  </View>
);

export default Loading;
