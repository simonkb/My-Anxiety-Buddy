import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommunityHome from "../screens/Community/CommunityHome";
import CommunityUsers from "../screens/Community/CommunityUsers";
const Stack = createStackNavigator();
const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="CommunityHome"
        component={CommunityHome}
      />
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="CommunityUsers"
        component={CommunityUsers}
      />
    </Stack.Navigator>
  );
};
export default CommunityStack;
