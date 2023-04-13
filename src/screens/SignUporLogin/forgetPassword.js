import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const ForgetPassword = () => {
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
  const [email, onChangeNumber] = React.useState(null);
  const navigator = useNavigation();
  const onSendPressed = () => {
    //navigator.navigate("ConfirmOTP");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Message",
          "Password reset email has been sent to your email address"
        );
        navigator.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Text style={styles.title}>
          Enter your email, to reset your password.
        </Text>

        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={email}
            placeholder="email"
            autoCorrect={false}
            autoCapitalize={false}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onSendPressed}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    alignItems: "center",
  },
  signInRectangle: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "rgba(85,82,82,1)",
    fontSize: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: "40%",
  },
  button: {
    backgroundColor: "#2962FF",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
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
});
export default ForgetPassword;
