// import * as React from "react";
// import {
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Button,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import bg1 from "../../../assets/bg1.jpeg";
// import bg2 from "../../../assets/bg2.jpg";
// import bg3 from "../../../assets/bg3.jpg";
// import { useGlobalState, setGlobalState } from "../../states/state";
// import {
//   signInWithEmailAndPassword,
//   sendEmailVerification,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { collection, doc, setDoc, getDoc } from "firebase/firestore";

// import { auth, db } from "../../config/firebaseConfig";

// const Login = () => {
//   //Updating background
//   let defaultBg = useGlobalState("defaultBackgroundImage");
//   let currentBg;
//   if (defaultBg[0] === "bgOrange") {
//     currentBg = bg3;
//   } else if (defaultBg[0] === "bgBlue") {
//     currentBg = bg2;
//   } else {
//     currentBg = bg1;
//   }
//   //
//   const navigator = useNavigation();
//   const [email, onChangeText] = React.useState(null);
//   const [password, onChangePassword] = React.useState(null);
//   const onSignUpPressed = () => {
//     navigator.navigate("Register");
//   };
//   const onLoginPressed = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;

//         if (user.emailVerified === false) {
//           sendEmailVerification(auth.currentUser).then(() => {
//             Alert.alert(
//               "error",
//               "Please verfy your email. A new verification email has been sent."
//             );
//           });
//         } else {
//           onAuthStateChanged(auth, async (user) => {
//             if (user !== null) {
//               const docRef = doc(db, "Users", user.uid);
//               const docSnap = await getDoc(docRef);
//               if (docSnap.exists()) {
//                 setGlobalState("currentUser", user);
//                 setGlobalState("isLoggedIn", true);
//               }
//             }
//           });
//           navigator.navigate("Main", {
//             screen: "Your Buddy",
//             params: { chatType: "default" },
//           });
//         }
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         Alert.alert(errorCode, errorMessage);
//       });
//   };
//   const onForgetPassPressed = () => {
//     navigator.navigate("Forget Password");
//   };
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={currentBg}
//         resizeMode="cover"
//         style={styles.bgImage}
//       >
//         <Text style={styles.title}>Welcome to </Text>
//         <Text style={styles.title}>Anti-anxiety</Text>
//         <View style={styles.signInRectangle}>
//           <TextInput
//             style={styles.input}
//             onChangeText={onChangeText}
//             value={email}
//             placeholder="Email"
//             keyboardType="email-address"
//             autoCorrect={false}
//             autoCapitalize={false}
//           />
//           <TextInput
//             style={styles.input}
//             onChangeText={onChangePassword}
//             value={password}
//             placeholder="Password"
//             secureTextEntry={true}
//             autoCorrect={false}
//           />
//           <TouchableOpacity
//             style={styles.forgetPass}
//             onPress={onForgetPassPressed}
//           >
//             <Text style={{ color: "#2962FF" }}>Forget password?</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity onPress={onLoginPressed} style={styles.button}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={onSignUpPressed} style={styles.button}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   bgImage: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   signInRectangle: {
//     justifyContent: "center",
//     alignSelf: "center",
//     width: "80%",
//     height: "25%",
//     borderRadius: 10,
//     backgroundColor: "rgba(255, 255, 255, 255)",
//     //backgroundColor: "rgba(255, 255, 255, 0.27)",
//     // opacity: 0.9,
//     marginTop: 40,
//     shadowOpacity: 0.05,
//   },
//   title: {
//     textAlign: "center",
//     color: "rgba(85,82,82,1)",
//     fontSize: 32,
//     letterSpacing: -0.18,
//   },
//   button: {
//     width: 165,
//     height: 45,
//     alignSelf: "center",
//     backgroundColor: "rgba(142,94,181,1)",
//     borderRadius: 15,
//     margin: 20,
//     padding: 8,
//   },
//   buttonText: {
//     color: "white",
//     alignSelf: "center",
//     fontSize: 18,
//   },
//   input: {
//     height: "25%",
//     margin: 5,
//     borderWidth: 0.5,
//     paddingLeft: 10,
//     borderRadius: 10,
//     borderColor: "darkgrey",
//     backgroundColor: "white",
//     fontSize: 18,
//   },
//   forgetPass: {
//     marginTop: 15,
//     fontSize: 14,
//     width: "40%",
//     alignSelf: "flex-end",
//   },
// });

// export default Login;
import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState, setGlobalState } from "../../states/state";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db } from "../../config/firebaseConfig";

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
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const onSignUpPressed = () => {
    navigator.navigate("Register");
  };
  const onLoginPressed = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user)
          if (user.emailVerified === false) {
            sendEmailVerification(auth.currentUser).then(() => {
              Alert.alert(
                "error",
                "Please verify your email. A new verification email has been sent."
              );
            });
          } else {
            onAuthStateChanged(auth, async (user) => {
              if (user !== null) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  setGlobalState("currentUser", user);
                  setGlobalState("isLoggedIn", true);
                }
              }
            });
            navigator.navigate("Main", {
              screen: "Your Buddy",
              params: { chatType: "default" },
            });
          }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  };
  const onForgetPassPressed = () => {
    navigator.navigate("Forget Password");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View style={styles.header}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>Anti-anxiety</Text>
        </View>
        <View style={styles.signInRectangle}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
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
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignUpPressed}>
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text style={{ color: "#2962FF" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

// Styles variable
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  signInRectangle: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
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
  forgetPass: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2962FF",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  signUpText: {
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 20,
  },
});

export default Login;
