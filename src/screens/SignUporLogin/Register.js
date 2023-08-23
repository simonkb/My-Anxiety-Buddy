import { useState } from "react";
import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { useGlobalState, bg1, bg2, bg3 } from "../../states/state";
import { auth, db } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const Register = () => {
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
  const [username, onChangeText] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [passwordConfirm, onChangePasswordConfirm] = React.useState(null);

  const [phoneNumber, onChangeNumber] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const navigator = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const onLoginPressed = () => {
    navigator.navigate("Login");
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
    if (!email && !password && !passwordConfirm && !username) {
      alert("Please fill out all required fields");
      return false;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate the password
    if (!password || password.length < 6) {
      alert("Please enter a password with at least 6 characters.");
      return false;
    }

    // Validate the confirmed password
    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
      return false;
    }

    // Validate the phone number (optional)
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a 10-digit phone number.");
      return false;
    }

    // Validate the username
    if (!username) {
      alert("Please enter your username.");
      return false;
    }

    // All input is valid
    return true;
  };

  const onSignUpPressed = () => {
    if (validateInput()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser)
            .then(() => {
              Alert.alert(
                "Verify",
                "Verification email sent, please check your email."
              );
            })
            .catch((error) => {
              Alert.alert(error.code, error.message);
            });
          const usersRef = collection(db, "Users");
          await setDoc(doc(usersRef, user.uid), {
            username: username,
            email_address: email,
            phone_number: phoneNumber,
            birthDate: 0,
          }).catch((error) => {
            Alert.alert(error.errorCode, error.message);
          });
          //navigator.navigate("Login");
          setIsLoading(auth.currentUser !== null);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            alert("Please enter a valid email address.");
          } else if (error.code === "auth/weak-password") {
            alert(
              "Please choose a stronger password with at least 8 characters, including uppercase and lowercase letters, numbers, and symbols."
            );
          } else if (error.code === "auth/email-already-in-use") {
            alert(
              "This email address is already in use. Please try signing in or use a different email address."
            );
          } else {
            alert(
              "There was a problem signing up. Please check your internet connection and try again."
            );
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        {isLoading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        <KeyboardAvoidingView behavior="height">
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>AnxietyBuddy</Text>
            <View style={styles.signUpRectangle}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email address"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize={false}
              />

              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                autoCorrect={false}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangePasswordConfirm}
                value={passwordConfirm}
                placeholder="Confirm password"
                secureTextEntry={true}
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={phoneNumber}
                placeholder="Phone number (optional)"
                keyboardType="phone-pad"
                autoCorrect={false}
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={username}
                placeholder="Username"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity onPress={onSignUpPressed} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLoginPressed}>
              <Text style={styles.signUpText}>
                Already have an account?
                <Text style={{ color: "#2962FF" }}> Login</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  signUpRectangle: {
    minWidth: "90%",
    maxWidth: "95%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    //color: "rgba(85,82,82,1)",
    color:'white',
    fontWeight:'bold',
    fontSize: 32,
    letterSpacing: -0.18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    minWidth: "90%",
    maxWidth: "95%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  signUpText: {
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
  },
});
export default Register;
