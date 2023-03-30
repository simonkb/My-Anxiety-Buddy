import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/SignUporLogin/Login";
import Register from "../screens/SignUporLogin/Register";
import forgetPassword from "../screens/SignUporLogin/forgetPassword";
import ConfirmOTP from "../screens/SignUporLogin/ConfirmOTP";
import CreateNewPassword from "../screens/SignUporLogin/CreateNewPassword";
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
import CommunityHome from "../screens/Community/CommunityHome";
import CommunityUsers from "../screens/Community/CommunityUsers";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: true }}
        name="CommunityHome"
        component={CommunityHome}
      />
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: true }}
        name="CommunityUsers"
        component={CommunityUsers}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
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
        component={TreatmentStack}
        options={{
          tabBarLabel: "Treatment",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lungs" color={color} size={size} />
          ),
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          //tabBarBadge: 5,
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
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: false }}
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
const Navigation = () => {
  const [user, setUser] = React.useState(null);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
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
