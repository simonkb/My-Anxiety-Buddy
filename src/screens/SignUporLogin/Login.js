import * as React from "react";
import { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  useGlobalState,
  setGlobalState,
  bg1,
  bg2,
  bg3,
} from "../../states/state";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../../config/firebaseConfig";
import QuoteDisplay from "../QuotesDisplay";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import { SuccessButton } from "../../buttons";

const Login = () => {
  //Updating background
  let defaultBg = useGlobalState("defaultBackgroundImage");
  let currentBg;
  if (defaultBg[0] === "bgOrange") {
    currentBg = bg3;
  } else if (defaultBg[0] === "bgBlue") {
    currentBg = bg2;
  } else {
    currentBg = bg1;
  }
  //
  const navigator = useNavigation();
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const onSignUpPressed = () => {
    navigator.navigate("Register");
  };
  var tester =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const isValidEmail = (email) => {
    if (!email) return false;

    var emailParts = email.split("@");

    if (emailParts.length !== 2) return false;

    var account = emailParts[0];
    var address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    var domainParts = address.split(".");

    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return tester.test(email);
  };

  const validateInput = () => {
    // Validate the email address
    if (!email && !password) {
      alert("Please enter your email and password");
      return false;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      alert("Please enter your password.");
      return false;
    }
    return true;
  };

  const onLoginPressed = () => {
    if (validateInput())
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user)
            if (user.emailVerified === false) {
              sendEmailVerification(auth.currentUser).then(() => {
                Alert.alert(
                  "Please Verify your email",
                  "A link to verfiy your email has been sent to your email address."
                );
              });
            } else {
              onAuthStateChanged(auth, async (user) => {
                if (user !== null) {
                  const docRef = doc(db, "Users", user.uid);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                    setGlobalState("currentUser", user);
                    setGlobalState("isLoggedIn", true);
                  }
                }
              });
              navigator.navigate("Main", {
                screen: "Your Buddy",
                params: { chatType: "default" },
              });
            }
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            alert("Incorrect password. Please try again.");
          } else if (error.code === "auth/missing-email") {
            alert("Please enter your email address");
          } else if (error.code === "auth/user-not-found") {
            alert(
              "No user found with that email. Please check your email address and try again."
            );
          } else {
            alert("An error occurred. Please try again later.");
            alert(error);
          }
        });
  };
  const onForgetPassPressed = () => {
    navigator.navigate("Forget Password");
  };
  const quotesDefault = [
    {
      quote: "Every small step you take towards managing anxiety is a victory.",
      author: "John Smith",
      year: 2019,
      id: "0",
    },
    {
      quote: "You're stronger than you think. Believe in yourself.",
      author: "Emily Johnson",
      year: 2020,
      id: "1",
    },
    {
      quote: "Inhale courage, exhale fear.",
      author: "David Adams",
      year: 2018,
      id: "2",
    },
    {
      quote: "Remember, progress is progress, no matter how small.",
      author: "Sarah Davis",
      year: 2021,
      id: "3",
    },
    {
      quote: "You have the power to overcome anxiety and embrace peace.",
      author: "Michael Roberts",
      year: 2017,
      id: "4",
    },
    {
      quote: "Take a deep breath. You've got this!",
      author: "Olivia Thompson",
      year: 2022,
      id: "5",
    },
    {
      quote: "Challenge your anxious thoughts. You're in control.",
      author: "Daniel Wilson",
      year: 2016,
      id: "6",
    },
    {
      quote: "Keep going, even when anxiety tells you to stop.",
      author: "Sophia Anderson",
      year: 2023,
      id: "7",
    },
    {
      quote: "Your journey may be tough, but so are you. Keep pushing forward.",
      author: "Jennifer Walker",
      year: 2021,
      id: "8",
    },
  ];
  const [quotes, setQuotes] = useState(quotesDefault);
  useEffect(() => {
    const journalsRef = collection(db, "quotes");
    const q = query(journalsRef);
    getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const quoteData = doc.data();
          quoteData.id = doc.id;
          return quoteData;
        });
        setQuotes(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  const [index, setIndex] = useState(Math.floor(Math.random() * quotes.length));
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to AnxietyBuddy</Text>
          <Image
            source={require("../../../assets/icon_copy.png")}
            style={styles.icon}
          />
        </View>
        <QuoteDisplay
          quote={quotes[index]}
          onClick={() => {
            setIndex(Math.floor(Math.random() * quotes.length));
          }}
        ></QuoteDisplay>
        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.forgetPass}
            onPress={onForgetPassPressed}
          >
            <Text style={{ color: "#2962FF" }}>Forget password?</Text>
          </TouchableOpacity>
        </View>
        <SuccessButton onPress={onLoginPressed} title={"Login"}></SuccessButton>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <SuccessButton
          title={"Sign up"}
          onPress={onSignUpPressed}
        ></SuccessButton>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  signInRectangle: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginVertical: 15,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  forgetPass: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  signUpText: {
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default Login;
