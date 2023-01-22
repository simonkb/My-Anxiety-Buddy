import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHome from "../screens/Profile/ProfileHome";
import Settings from "../screens/Profile/Settings";
import EditProfile from "../screens/Profile/EditProfile";
const Stack = createStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="Profile Home"
        component={ProfileHome}
      />
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: false }}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: false }}
        name="Edit Profile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};
export default ProfileStack;
