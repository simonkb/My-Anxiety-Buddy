import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/SignUporLogin/Login";
import Register from "../screens/SignUporLogin/Register";
import Home from "../screens/Home";
import forgetPassword from "../screens/SignUporLogin/forgetPassword";
import ConfirmOTP from "../screens/SignUporLogin/ConfirmOTP";
import CreateNewPassword from "../screens/SignUporLogin/CreateNewPassword";
import { setGlobalState, useGlobalState } from "../states/state";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
const Stack = createStackNavigator();
const HomeStack = () => {
  const [user, setUser] = React.useState(null);
  onAuthStateChanged(auth, async (user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      if (user.emailVerified) setUser(user);
      setGlobalState("isLoggedIn", user.emailVerified);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGlobalState("currentUser", docSnap.data());
        //Change needed
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  return (
    <Stack.Navigator>
      {user !== null ? (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="Home"
            component={Home}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
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
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
export default HomeStack;
