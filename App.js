import React from "react";
import { StyleSheet, View, Text } from "react-native";
import HomeStack from "./src/routes/homeStack";
import { NavigationContainer } from "@react-navigation/native";
//import { LogBox } from 'react-native';
//LogBox.ignoreLogs(['Sending']);
const App = () => {
  return (
    <NavigationContainer
      independent={true}
      screenOptions={{ gestureEnabled: false }}
    >
      <HomeStack />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
export default App;
