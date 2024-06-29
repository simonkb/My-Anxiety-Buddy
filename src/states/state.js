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
import bg1 from "../../assets/bg1.jpeg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/splash.jpeg";
export { setGlobalState, useGlobalState, bg1, bg2, bg3 };
