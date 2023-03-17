import React from "react";
import { useState } from "react";
import { GlobalStateContext } from "./src/states/GlobalState";
import Navigation from "./src/routes/routes.js";
const App = () => {
  const [globalState, setGlobalStateNew] = useState({
    speakEnabled: false,
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalStateNew }}>
      <Navigation></Navigation>
    </GlobalStateContext.Provider>
  );
};
export default App;
