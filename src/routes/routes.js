import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/SignUporLogin/Login";
import Register from "../screens/SignUporLogin/Register";
import forgetPassword from "../screens/SignUporLogin/forgetPassword";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import ProfileHome from "../screens/Profile/ProfileHome";
import Settings from "../screens/Profile/Settings";
import EditProfile from "../screens/Profile/EditProfile";
import TreatmentHome from "../screens/Treatment/TreatmentHome";
import Readings from "../screens/Treatment/Readings";
import JournalChat from "../screens/Treatment/JournalChat";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatBot from "../screens/chatbot";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Your Buddy"
      screenOptions={{
        tabBarActiveTintColor: "green",
      }}
    >
      <Tab.Screen
        name="Your Buddy"
        component={ChatBot}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
        initialParams={{ chatType: "default", otherParam: "nothing" }}
      />
      <Tab.Screen
        name="Treatment"
        component={TreatmentStack}
        options={{
          tabBarLabel: "Contents",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-book" size={size} color={color} />
          ),
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Tab.Screen
        name="Journaling"
        component={JournalChat}
        options={{
          tabBarLabel: "Journaling",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-journal" size={size} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
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
};
const TreatmentStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{ headerShown: true, gestureEnabled: true }}
        name="Treatment Home"
        component={TreatmentHome}
      /> */}
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
        initialParams={{ username: "-" }}
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
const AuthenticationStack = () => {
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
        options={{ headerShown: true, gestureEnabled: true }}
        name="Forget Password"
        component={forgetPassword}
      />
    </Stack.Navigator>
  );
};
const Navigation = () => {
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      setIsLoggedIn(user.emailVerified);
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn && user ? (
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthenticationStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
