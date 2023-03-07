import React from "react";
import { useState } from "react";
import { GlobalStateContext } from "./src/states/GlobalState";
import HomeStack from "./src/routes/homeStack";
import { NavigationContainer } from "@react-navigation/native";
const App = () => {
  const [globalState, setGlobalStateNew] = useState({
    speakEnabled: false,
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalStateNew }}>
      <NavigationContainer independent={true}>
        <HomeStack />
      </NavigationContainer>
    </GlobalStateContext.Provider>
    // <RoutineScreen />
  );
};
export default App;
