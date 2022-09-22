import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/SignUporLogin/Login";
import Register from "../screens/SignUporLogin/Register";
import Home from "../screens/Home";
import forgetPassword from "../screens/SignUporLogin/forgetPassword";
import ConfirmOTP from "../screens/SignUporLogin/ConfirmOTP";
import CreateNewPassword from "../screens/SignUporLogin/CreateNewPassword";
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
        name="Home"
        component={Home}
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
    </Stack.Navigator>
  );
};
export default HomeStack;
