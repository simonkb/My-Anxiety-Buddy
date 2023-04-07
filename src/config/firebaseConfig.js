// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQLC-SQgbUBZHJnSKGo8ge8sqhKQh8NzU",
  authDomain: "anti-anxiety-6a2fd.firebaseapp.com",
  projectId: "anti-anxiety-6a2fd",
  storageBucket: "anti-anxiety-6a2fd.appspot.com",
  messagingSenderId: "294911660009",
  appId: "1:294911660009:web:c9f02ecba99483bed44578",
  measurementId: "G-27CWSN9XMD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// const db = getFirestore(app, { experimentalForceLongPolling: true });
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export { auth, db };
