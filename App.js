import React from "react";
import { useState } from "react";
import { GlobalStateContext } from "./src/states/GlobalState";
import Navigation from "./src/routes/routes.js";
import * as Speech from "expo-speech";
import { CopilotProvider, CopilotStep } from "react-native-copilot";
import { Text } from "react-native";
if (__DEV__) {
  const ignoreWarns = [
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}

const App = (navigation) => {
  const [globalState, setGlobalStateNew] = useState({
    speakEnabled: false,
    Speech: Speech,
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalStateNew }}>
      <CopilotProvider>
        <Navigation></Navigation>
      </CopilotProvider>
    </GlobalStateContext.Provider>
  );
};
export default App;
