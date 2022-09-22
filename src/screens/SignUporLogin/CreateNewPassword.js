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
} from "react-native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { useNavigation } from "@react-navigation/native";
const CreateNewPassword = () => {
  const [password, onChangePassword] = React.useState(null);
  const [passwordConfirm, onChangePasswordConfirm] = React.useState(null);
  const background1 = {
    //uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
    //uri: "https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png",
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };
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
        source={background1}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <KeyboardAwareView animated={false}>
          <ScrollView>
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
            <TouchableOpacity onPress={onSavePressed} style={styles.button}>
              <Text style={styles.buttonText}>Save!</Text>
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
    height: "40%",
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
    paddingTop: "30%",
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
    height: "20%",
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
export default CreateNewPassword;
