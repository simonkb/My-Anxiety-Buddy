import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState({
  defaultLanguage: "eng",
  defaultBackgroundImage: "bgPink",
  isLoggedIn: false,
  currentUser: "simon",
});
export { setGlobalState, useGlobalState };
