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

const ForgetPassword = () => {
  const [phoneNumber, onChangeNumber] = React.useState(null);
  const navigator = useNavigation();
  const background1 = {
    ///uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
    //uri: "https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png",
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };
  const onSendPressed = () => {
    navigator.navigate("ConfirmOTP");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background1}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Text style={styles.title}>
          Enter your phone number/email, we will send you OTP to verfiy.
        </Text>
        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={phoneNumber}
            placeholder="Phone number"
            keyboardType="phone-pad"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.forgetPass}>
            <Text style={{ color: "#2962FF" }}>Use email address instead?</Text>
          </TouchableOpacity>
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
export default ForgetPassword;
