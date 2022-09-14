import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Register from "./src/screens/Register";
const App = () => {
  return (
    <View style={styles.container}>
      <Register></Register>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default App;
