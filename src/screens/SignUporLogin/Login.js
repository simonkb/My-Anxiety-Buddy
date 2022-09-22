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

const Login = () => {
  const navigator = useNavigation();
  const [username, onChangeText] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const background1 = {
    ///uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
    //uri: "https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png",
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };
  const onSignUpPressed = () => {
    //validate user
    navigator.navigate("Register");
  };
  const onLoginPressed = () => {
    //validate user
    navigator.navigate("Home");
  };
  const onForgetPassPressed = () => {
    navigator.navigate("forgetPassword");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background1}
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
