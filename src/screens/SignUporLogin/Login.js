import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState, setGlobalState } from "../../states/state";
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
  const [username, onChangeText] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const onSignUpPressed = () => {
    //validate user
    navigator.navigate("Register");
  };
  const onLoginPressed = () => {
    //validate user
    setGlobalState("isLoggedIn", true);
  };
  const onForgetPassPressed = () => {
    navigator.navigate("forgetPassword");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Text style={styles.title}>Welcome to </Text>
        <Text style={styles.title}>Anti-anxiety</Text>
        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={username}
            placeholder="Username"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
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
        <TouchableOpacity onPress={onLoginPressed} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSignUpPressed} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  signInRectangle: {
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    height: "25%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.9,
    marginTop: 40,
    shadowOpacity: 0.05,
  },
  title: {
    textAlign: "center",
    color: "rgba(85,82,82,1)",
    fontSize: 32,
    letterSpacing: -0.18,
  },
  button: {
    width: 165,
    height: 45,
    alignSelf: "center",
    backgroundColor: "rgba(142,94,181,1)",
    borderRadius: 15,
    margin: 20,
    padding: 8,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
  input: {
    height: "25%",
    margin: 5,
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: "darkgrey",
    backgroundColor: "white",
    fontSize: 18,
  },
  forgetPass: {
    marginTop: 15,
    fontSize: 14,
    width: "40%",
    alignSelf: "flex-end",
  },
});

export default Login;
