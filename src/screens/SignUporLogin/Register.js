import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { useNavigation } from "@react-navigation/native";
import { StaticImage } from "../../classes/StaticImages";

const Register = () => {
  const [username, onChangeText] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [passwordConfirm, onChangePasswordConfirm] = React.useState(null);

  const [phoneNumber, onChangeNumber] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const navigator = useNavigation();
  const onSignUpPressed = () => {
    //Validate, confirm password and save details.
    navigator.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={StaticImage.currentBackgroundImage}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <KeyboardAwareView>
          <ScrollView>
            <Text style={styles.title}>Anti-anxiety</Text>
            <View style={styles.signUpRectangle}>
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
                placeholder="Phone number"
                keyboardType="phone-pad"
                autoCorrect={false}
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email address"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity onPress={onSignUpPressed} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAwareView>
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
