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
import { useGlobalState } from "../../states/state";
const ConfirmOTP = () => {
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
  const [OTP, onChangeNumber] = React.useState(null);

  const navigator = useNavigation();
  const oneDonePressed = () => {
    navigator.navigate("CreateNewPassword");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Text style={styles.title}>
          Enter the One Time Password(OTP) number we have sent you.
        </Text>
        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={OTP}
            placeholder="OTP"
            keyboardType="phone-pad"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.forgetPass}>
            <Text style={{ color: "#2962FF" }}>Resend it?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={oneDonePressed}>
          <Text style={styles.buttonText}>Done!</Text>
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
    height: "15%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.9,
    marginTop: 40,
    shadowOpacity: 0.05,
  },
  title: {
    textAlign: "center",
    color: "rgba(85,82,82,1)",
    fontSize: 25,
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
    height: "30%",
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
    width: "60%",
    alignSelf: "flex-end",
  },
});
export default ConfirmOTP;
