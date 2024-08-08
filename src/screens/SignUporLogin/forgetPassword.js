import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGlobalState, bg1, bg2, bg3 } from "../../states/state";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { SuccessButton } from "../../buttons";
import { useTranslation } from "react-i18next";

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
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Message",
          "Password reset email has been sent to your email address"
        );
        navigator.navigate(t("login"));
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      });
  };
  const {t} = useTranslation();
return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Text style={styles.title}>
          {t("enterYourEmailToReset")}
        </Text>

        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={email}
            placeholder={t("email")}
            autoCorrect={false}
            autoCapitalize={false}
            keyboardType="email-address"
          />
        </View>
        <SuccessButton onPress={onSendPressed} title={t("send")}></SuccessButton>
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
    margin: 15,
  },

  title: {
    textAlign: "center",
    //color: "rgba(85,82,82,1)",
    color: "white",
    fontSize: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: "40%",
    marginBottom: 10,
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
