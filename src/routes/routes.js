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
//import NotificationsPage from "../screens/NotificationsPage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
import MorningCheckInScreen from "../screens/Treatment/MorningCheckIn";
import ExperienceEntryScreen from "../screens/Treatment/ExperienceEntry";
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  const navigator = useNavigation();
  // Configure the notification handling
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      // Navigate to the Journaling Screen when the notification is clicked
      const screen = notification.request.content.data.screen; // Access the screen name from the notification data
      navigator.navigate(screen); // Navigate to the specified screen
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      };
    },
  });
  // Function to schedule a daily notification at a specific time
  const scheduleDailyNotification = async (hour, minute) => {
    // Calculate the delay until the next specified time
    const now = new Date();
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
      0,
      0
    );
    let delay = targetTime.getTime() - now.getTime();
    if (delay < 0) {
      delay += 24 * 60 * 60 * 1000; // Add 24 hours if the target time has already passed
    }

    // Schedule the notification trigger
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to reflect!",
        body: "Don't forget to reflect on your day, this will boost your productivity",
        data: { screen: "Journaling" },
      },

      trigger: { seconds: Math.floor(delay / 1000) },
    });
  };

  // useEffect(() => {
  //   const getNotificationPermission = async () => {
  //     if (Platform.OS === "ios") {
  //       const { status } = await Permissions.askAsync(
  //         Permissions.NOTIFICATIONS
  //       );
  //       if (status !== "granted") {
  //         // Handle the case when permission is not granted
  //         return;
  //       }
  //     }
  //   };

  //   getNotificationPermission();
  // }, []);

  useEffect(() => {
    // Request notifications permissions
    async function registerForPushNotifications() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        // Handle permission denied case
        return;
      }
    }
    registerForPushNotifications();
  }, []);

  useEffect(() => {
    const scheduleNotifications = async () => {
      const selectedHour = 20; // Example: 8:00pm
      const selectedMinute = 0;

      //const heartRateThreshold = 100; // Example threshold

      await scheduleDailyNotification(selectedHour, selectedMinute);
      // await scheduleHeartRateNotification(heartRateThreshold);
    };

    scheduleNotifications();
  }, []);

  // Function to schedule a heart rate notification
  // const scheduleHeartRateNotification = async (threshold) => {
  //   const heartRate = HeartRate.getHeartRate(); // Assuming you have a method to get the current heart rate
  //   if (heartRate > threshold) {
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "High Heart Rate",
  //         body: `Your heart rate is above ${threshold}. Take a break and relax.`,
  //         data: { screen: "HeartRateScreen" }, // Replace "HeartRateScreen" with the actual screen name to navigate to
  //       },
  //       trigger: null, // Trigger immediately
  //     });
  //   }
  // };

  return (
    <Tab.Navigator
      initialRouteName="Your Buddy"
      screenOptions={{
        tabBarActiveTintColor: "green",
      }}
    >
      <Tab.Screen
        name="Your Buddy"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
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

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialParams={{ chatType: "default", otherParam: "nothing" }}
        options={{ headerShown: false, gestureEnabled: false }}
        name="Home"
        component={ChatBot}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: false }}
        name="Check in"
        component={MorningCheckInScreen}
      />
      {/* <Stack.Screen
        options={{ headerShown: true, gestureEnabled: false }}
        name="Daily check in"
        component={DailyCheckin}
      /> */}
      <Stack.Screen
        options={{ headerShown: true, gestureEnabled: false }}
        name="Situation entry"
        component={ExperienceEntryScreen}
      />
    </Stack.Navigator>
  );
};
const TreatmentStack = () => {
  return (
    <Stack.Navigator>
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
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      // setIsLoggedIn(user.emailVerified);
    } else {
      setUser(null);
    }
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
