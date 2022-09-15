import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
    /*
      screenOptions={{
        headerShown: true,
      }}*/
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
export default HomeStack;
