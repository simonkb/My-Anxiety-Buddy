import React from "react";
import { useState } from "react";
import { GlobalStateContext } from "./src/states/GlobalState";
import Navigation from "./src/routes/routes.js";
import * as Speech from "expo-speech";

// place at top of app.js
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
      <Navigation></Navigation>
    </GlobalStateContext.Provider>
  );
};
export default App;
// import React, { useCallback, useEffect, useState } from "react";
// import { Text, View } from "react-native";
// import Entypo from "@expo/vector-icons/Entypo";
// import * as SplashScreen from "expo-splash-screen";
// import * as Font from "expo-font";
// import { GlobalStateContext } from "./src/states/GlobalState";
// import Navigation from "./src/routes/routes.js";
// import * as Speech from "expo-speech";
// import { Video } from "expo-av";
// // Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// // place at top of app.js
// if (__DEV__) {
//   const ignoreWarns = [
//     "VirtualizedLists should never be nested inside plain ScrollViews",
//   ];

//   const errorWarn = global.console.error;
//   global.console.error = (...arg) => {
//     for (const error of ignoreWarns) {
//       if (arg[0].startsWith(error)) {
//         return;
//       }
//     }
//     errorWarn(...arg);
//   };
// }

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         await Font.loadAsync(Entypo.font);
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   // const [globalState, setGlobalStateNew] = useState({
//   //   speakEnabled: false,
//   //   Speech: Speech,
//   // });

//   return (
//     // <GlobalStateContext.Provider value={{ globalState, setGlobalStateNew }}>
//     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//       <Video
//         source={require("./assets/splash.mp4")} // Replace with your video file path
//         rate={1.0}
//         isMuted={false}
//         resizeMode="cover"
//         shouldPlay
//         style={{ flex: 1 }}
//         onPlaybackStatusUpdate={(status) => {
//           if (status.didJustFinish) {
//             onLayoutRootView();
//           }
//         }}
//       />
//       <Navigation />
//     </View>
//     // </GlobalStateContext.Provider>
//   );
// }
