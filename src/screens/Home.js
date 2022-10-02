import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatBot from "./chatbot";
import community from "./Community/Community";
import treatment from "./Treatment";
import Profile from "./Profile/Profile";

const Tab = createBottomTabNavigator();

function BottomButtons() {
  return (
    <Tab.Navigator
      initialRouteName="Chatbot"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Chatbot"
        component={ChatBot}
        options={{
          tabBarLabel: "Chatbot",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
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
