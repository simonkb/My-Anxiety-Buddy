import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state";
const CreateNewPassword = () => {
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
  const [password, onChangePassword] = React.useState(null);
  const [passwordConfirm, onChangePasswordConfirm] = React.useState(null);

  const navigator = useNavigation();
  const onSavePressed = () => {
    //Validate, confirm password and save details.
    Alert.alert(
      "Success",
      "Your new password has been saved successfully! Please login with your new credentials."
    );
    navigator.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Text style={styles.title}>Create new password</Text>
          <View style={styles.signUpRectangle}>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder="New password"
              secureTextEntry={true}
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePasswordConfirm}
              value={passwordConfirm}
              placeholder="Confirm new password"
              secureTextEntry={true}
              autoCorrect={false}
            />
          </View>
          <View>
            <TouchableOpacity onPress={onSavePressed} style={styles.button}>
              <Text style={styles.buttonText}>Save!</Text>
            </TouchableOpacity>
          </View>
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
    height: "40%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.9,
    maxHeight: 150,
  },
  title: {
    textAlign: "center",
    color: "rgba(85,82,82,1)",
    fontSize: 24,
    letterSpacing: -0.18,
    margin: 40,
    paddingTop: 70,
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
    height: "40%",
    maxHeight: 30,
    margin: 5,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: "darkgrey",
    backgroundColor: "white",
    fontSize: 16,
    padding: 4,
  },
});
export default CreateNewPassword;
