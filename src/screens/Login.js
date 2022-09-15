import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const Login = () => {
  const navigator = useNavigation();
  const [username, onChangeText] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const background1 = {
    //source: require("/Users/simondarota/My/assets/background1.jpeg"),
    //uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
    //uri: "https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png",
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };
  const onSignUpPressed = () => {
    //validate user
    navigator.navigate("Register");
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
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button}>
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
    width: 342,
    height: 160,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.9,
    marginTop: 40,
  },
  title: {
    textAlign: "center",
    color: "rgba(85,82,82,1)",
    fontSize: 32,
    fontFamily: "Arial",
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "darkgrey",
    backgroundColor: "white",
    fontSize: 16,
  },
});

export default Login;
