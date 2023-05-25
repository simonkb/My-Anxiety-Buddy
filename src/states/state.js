import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState({
  defaultLanguage: "eng",
  defaultBackgroundImage: "bgOrange",
  isLoggedIn: false,
  currentUser: null,
  chat: "default",
  navigation: null,
  speakEnabled: false,
});
export { setGlobalState, useGlobalState };
