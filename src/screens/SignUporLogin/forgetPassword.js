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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
//import { StaticImage } from "../../classes/StaticImages";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state";
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
  const [phoneNumber, onChangeNumber] = React.useState(null);
  const navigator = useNavigation();
  const onSendPressed = () => {
    navigator.navigate("ConfirmOTP");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Text style={styles.title}>
          Enter your phone number/email, we will send you OTP to verify.
        </Text>
        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={phoneNumber}
            placeholder="Phone number or email"
            autoCorrect={false}
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
    height: "10%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.9,
    marginTop: 10,
    shadowOpacity: 0.05,
  },
  title: {
    textAlign: "center",
    color: "rgba(85,82,82,1)",
    fontSize: 18,
    width: 300,
    alignSelf: "center",
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
    height: "50%",
    margin: 5,
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: "darkgrey",
    backgroundColor: "white",
    fontSize: 18,
  },
});
export default ForgetPassword;
