import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatBot from "./chatbot";
import community from "./Community/Community";
import treatment from "./Treatment/Treatment";
import Profile from "./Profile/Profile";
import { useGlobalState, setGlobalState } from "../states/state";

const Tab = createBottomTabNavigator();

function BottomButtons() {
  return (
    <Tab.Navigator
      initialRouteName="Your Buddy"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Your Buddy"
        component={ChatBot}
        options={{
          tabBarLabel: "Your Buddy",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
          headerShown: true,
        }}
        initialParams={{ chatType: "default", otherParam: "nothing" }}
      />
      <Tab.Screen
        name="Treatment"
        component={treatment}
        options={{
          tabBarLabel: "Treatment",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lungs" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Community"
        component={community}
        options={{
          tabBarLabel: "Community",
          tabBarBadge: 7,

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
          tabBarBadge: 5,
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
  return <BottomButtons />;
}
