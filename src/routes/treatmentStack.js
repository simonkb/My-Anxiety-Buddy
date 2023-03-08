import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TreatmentHome from "../screens/Treatment/TreatmentHome";
import Readings from "../screens/Treatment/Readings";
import JournalChat from "../screens/Treatment/JournalChat";
const Stack = createStackNavigator();
const TreatmentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: true }}
        name="Treatment Home"
        component={TreatmentHome}
      />
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: true }}
        name="Readings"
        component={Readings}
      />
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: true }}
        name="Journals"
        component={JournalChat}
      />
    </Stack.Navigator>
  );
};
export default TreatmentStack;
