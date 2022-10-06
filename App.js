import React from "react";

import HomeStack from "./src/routes/homeStack";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  console.log(global.ErrorUtils);
  return (
    <NavigationContainer independent={true}>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
