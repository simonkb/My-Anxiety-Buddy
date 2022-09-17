import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
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
    </Stack.Navigator>
  );
};
export default HomeStack;
