import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatBot from "./chatbot";
import community from "./Community";
import treatment from "./Treatment";
import profile from "./Profile";
import { Image } from "react-native-web";

const Tab = createBottomTabNavigator();
const chatbotIcon = {
  uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/Q4JhbWp965ZufzssZ8HUvrlU.png",
};
function BottomButtons() {
  return (
    <Tab.Navigator
      initialRouteName="Chatbot"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
      options={{ gestureEnabled: false }}
    >
      <Tab.Screen
        name="Chatbot"
        component={ChatBot}
        options={{
          tabBarLabel: "Chatbot",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Treatment"
        component={treatment}
        options={{
          tabBarLabel: "Treatment",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lungs" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={community}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              //name="home-group"
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Home() {
  return (
    <NavigationContainer independent={true}>
      <BottomButtons />
    </NavigationContainer>
  );
}
