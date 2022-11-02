/*import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Chatbot = () => {
  var background1 = {
    uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/w608HSFdrL1GbEz2kUQTnfsl.jpeg",
  };
  const treatment = () => {
    //validate user
    navigator.navigate("Treatment");
  };
  const comm = () => {
    //validate user
    navigator.navigate("Community");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={background1}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Image
          style={{
            width: "102%",
            height: "20%",
            top: "-2%",
            start: "-1%",
          }}
          resizeMode="center"
          source={require("../../assets/Head.png")}
        ></Image>

        <ScrollView>
          <View style={styles.hello}>
            <Text style={styles.chat1}>Hello there..</Text>
          </View>
          <Image
            style={styles.person1}
            resizeMode="stretch"
            source={require("../../assets/Person.png")}
          ></Image>

          <View style={styles.hello2}>
            <Text style={styles.chat2}>Welcome to my Anxiety Buddy</Text>
          </View>
          <Image
            style={styles.person2}
            resizeMode="stretch"
            source={require("../../assets/Person.png")}
          ></Image>

          <View style={styles.hello3}>
            <Text style={styles.chat3}>
              I'm here to be your companion . . . Let me know why you're here ?
            </Text>
          </View>
          <Image
            style={styles.person3}
            resizeMode="stretch"
            source={require("../../assets/Person.png")}
          ></Image>

          <View style={styles.hello4}>
            <Text style={styles.chat4}> </Text>
            <TouchableOpacity onPress={treatment} style={styles.button}>
              <Text style={styles.buttonText}>I feel anxious</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={comm} style={styles.button}>
              <Text style={styles.buttonText}>Connect with people</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.person4}
            resizeMode="stretch"
            source={require("../../assets/Profile.png")}
          ></Image>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
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
  hello: {
    justifyContent: "center",
    alignSelf: "center",
    width: "40%",
    height: "15%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "10%",
    start: "5%",
  },
  chat1: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },
  person1: {
    width: "15%",
    height: "25%",
    top: "-10%",
    start: "80%",
  },
  hello2: {
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "19%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "0%",
    start: "-9%",
  },
  chat2: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person2: {
    width: "15%",
    height: "25%",
    top: "-20%",
    start: "80%",
  },
  hello3: {
    justifyContent: "center",
    alignSelf: "center",
    width: "71%",
    height: "35%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "-10%",
    start: "-9%",
  },
  chat3: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person3: {
    width: "15%",
    height: "25%",
    top: "-46%",
    start: "80%",
  },
  hello4: {
    justifyContent: "center",
    alignSelf: "center",
    width: "71%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "-5%",
    start: "2%",
  },
  chat4: {
    color: "black",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person4: {
    width: "15%",
    height: "25%",
    top: "-70%",
    start: "0%",
  },
  button: {
    width: "80%",
    height: "35%",
    alignSelf: "center",
    backgroundColor: "rgba(50,50,50,255)",
    borderRadius: 15,
    margin: 10,
    padding: 8,
    top: "-10%",
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
});

export default Chatbot;*/

import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import bg1 from "../../assets/bg1.jpeg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import { useGlobalState } from "../states/state.js";
const Chatbot = () => {
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
  const treatment = () => {
    //validate user
    navigator.navigate("Treatment");
  };
  const comm = () => {
    //validate user
    navigator.navigate("Community");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={currentBg}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <Image
            style={{
              width: "100%",
              height: "20%",
              top: "-2%",
              start: "-1%",
            }}
            resizeMode="center"
            source={require("../../assets/Head.jpg")}
          ></Image>

          <ScrollView>
            <View style={styles.hello}>
              <Text style={styles.chat1}>Hello there..</Text>
            </View>
            <Image
              style={styles.person1}
              resizeMode="stretch"
              source={require("../../assets/Person.jpg")}
            ></Image>

            <View style={styles.hello2}>
              <Text style={styles.chat2}>Welcome to my Anxiety Buddy</Text>
            </View>
            <Image
              style={styles.person2}
              resizeMode="stretch"
              source={require("../../assets/Person.jpg")}
            ></Image>

            <View style={styles.hello3}>
              <Text style={styles.chat3}>
                I'm here to be your companion . . . Let me know why you're here
                ?
              </Text>
            </View>
            <Image
              style={styles.person3}
              resizeMode="stretch"
              source={require("../../assets/Person.jpg")}
            ></Image>

            <View style={styles.hello4}>
              <Text style={styles.chat4}> </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>I feel anxious</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Connect with people</Text>
              </TouchableOpacity>
            </View>
            <Image
              style={styles.person4}
              resizeMode="stretch"
              source={require("../../assets/Profile.png")}
            ></Image>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
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
  hello: {
    justifyContent: "center",
    alignSelf: "center",
    width: "40%",
    height: "15%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "10%",
    start: "5%",
  },
  chat1: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },
  person1: {
    width: "15%",
    height: "25%",
    top: "-10%",
    start: "80%",
  },
  hello2: {
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "19%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "0%",
    start: "-9%",
  },
  chat2: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person2: {
    width: "15%",
    height: "25%",
    top: "-20%",
    start: "80%",
  },
  hello3: {
    justifyContent: "center",
    alignSelf: "center",
    width: "71%",
    height: "35%",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "-10%",
    start: "-9%",
  },
  chat3: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person3: {
    width: "15%",
    height: "25%",
    top: "-46%",
    start: "80%",
  },
  hello4: {
    justifyContent: "center",
    alignSelf: "center",
    width: "71%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 255)",
    opacity: 0.6,
    marginTop: "0%",
    shadowOpacity: 0.05,
    top: "-5%",
    start: "2%",
  },
  chat4: {
    color: "black",
    alignSelf: "flex-start",
    fontSize: 18,
    start: 15,
  },

  person4: {
    width: "15%",
    height: "25%",
    top: "-70%",
    start: "0%",
  },
  button: {
    width: "80%",
    height: "35%",
    alignSelf: "center",
    backgroundColor: "rgba(50,50,50,255)",
    borderRadius: 15,
    margin: 10,
    padding: 8,
    top: "-10%",
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
});

export default Chatbot;
