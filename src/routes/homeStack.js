import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/SignUporLogin/Login";
import Register from "../screens/SignUporLogin/Register";
import Home from "../screens/Home";
import forgetPassword from "../screens/SignUporLogin/forgetPassword";
import ConfirmOTP from "../screens/SignUporLogin/ConfirmOTP";
import CreateNewPassword from "../screens/SignUporLogin/CreateNewPassword";
import { setGlobalState, useGlobalState } from "../states/state";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const Stack = createStackNavigator();
const HomeStack = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setGlobalState("isLoggedIn", true);
      setGlobalState("currentUser", user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  return (
    <Stack.Navigator>
      {useGlobalState("isLoggedIn")[0] ? (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="Home"
            component={Home}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: true }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="forgetPassword"
            component={forgetPassword}
          />
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="ConfirmOTP"
            component={ConfirmOTP}
          />
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="CreateNewPassword"
            component={CreateNewPassword}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
export default HomeStack;
