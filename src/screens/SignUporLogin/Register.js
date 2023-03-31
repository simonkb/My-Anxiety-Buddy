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
  ActivityIndicator,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state";
import { auth, db } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
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
  const resend = () => {
    if (auth.currentUser !== null && !auth.currentUser.emailVerified)
      sendEmailVerification(auth.currentUser)
        .then(() => {
          Alert.alert(
            "Verify",
            "Verification email sent again, please check your email."
          );
          setIsLoading(!auth.currentUser.emailVerified);
        })
        .catch((error) => {
          Alert.alert(error.code, error.message);
        });
  };
  const onSignUpPressed = () => {
    //Validate, confirm password and save details.
    if (password != "" && password.length >= 6) {
      if (password === passwordConfirm) {
        //const auth = getAuth();
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
            }).catch((error) => {
              Alert.alert(error.errorCode, error.message);
            });
            navigator.navigate("Login");
            // if (user.emailVerified) {
            //   const usersRef = collection(db, "Users");
            //   await setDoc(doc(usersRef, user.uid), {
            //     username: username,
            //     email_address: email,
            //     phone_number: phoneNumber,
            //     birthDate: "00/00/00",
            //   })
            //     .then(() => {
            //       navigator.navigate("Login");
            //     })
            //     .catch((error) => {
            //       Alert.alert(error.errorCode, error.message);
            //     });
            // }

            // const newCollectionRef = doc(usersRef, user.uid).collection(
            //   "Sessions"
            // );
            // await setDoc(doc(newCollectionRef, "na"), {
            //   default: "default",
            // });
            // await newCollectionRef.add({
            //   data-field-1: "value-1",
            //   data-field-2: "value-2",
            // })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorCode, errorMessage);
          });

        // onAuthStateChanged(auth, async (user) => {
        //   if (user.emailVerified) {
        //     const usersRef = collection(db, "Users");
        //     usersRef
        //       .doc(user.uid)
        //       .set({
        //         username: username,
        //         email_address: email,
        //         phone_number: phoneNumber,
        //         birthDate: "00/00/00",
        //       })
        //       .then(() => {
        //         console.log("User data has been added to the Users collection");
        //         setIsLoading(false);
        //       })
        //       .catch((error) => {
        //         console.error(error);
        //       });
        //   } else {
        //     console.log(
        //       "User email is not verified. Wait for the email verification."
        //     );
        //   }
        // });
      } else {
        Alert.alert("error", "Password doesn't match.");
      }
    } else {
      Alert.alert("error", "Password length should at least 6 characters");
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        {/* {isLoading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        )} */}
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView>
            <Text style={styles.title}>Anti-anxiety</Text>
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
                placeholder="Username (optional)"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity onPress={onSignUpPressed} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            {isLoading && (
              <Button
                title="Resend the verification email"
                onPress={resend()}
              ></Button>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  signUpRectangle: {
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    height: "55%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.9,
  },
  title: {
    textAlign: "center",
    color: "rgba(85,82,82,1)",
    fontSize: 32,
    //fontFamily: "Arial",
    letterSpacing: -0.18,
    margin: 40,
  },
  button: {
    width: 165,
    height: 45,
    alignSelf: "center",
    backgroundColor: "rgba(142,94,181,1)",
    borderRadius: 15,
    margin: 60,
    padding: 8,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
  input: {
    height: "12%",
    margin: "3%",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: "darkgrey",
    backgroundColor: "white",
    fontSize: 18,
    borderWidth: 0.5,
  },
});
export default Register;
