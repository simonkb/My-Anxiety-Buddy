import React from "react";

import HomeStack from "./src/routes/homeStack";
import { NavigationContainer } from "@react-navigation/native";
import { BreathingGuide } from "./src/Trail";

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
