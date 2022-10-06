import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import bg1 from "../../../assets/bg1.jpeg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import { useGlobalState } from "../../states/state.js";
const Readings = () => {
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
  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View
          style={{
            width: "94%",
            height: 50,
            left: "3%",
            right: "3%",
            top: 20,
            backgroundColor: "#00236A",
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "400",
                padding: 10,
              }}
            >
              Readings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "400",
                padding: 10,
              }}
            >
              Positive Qoutes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "400",
                padding: 10,
              }}
            >
              Links
            </Text>
          </TouchableOpacity>
        </View>
        <>
          <ScrollView
            style={{
              width: "94%",
              height: "100%",
              backgroundColor: "rgba(217, 217, 217, 0.53)",
              left: "3%",
              right: "3%",
              top: 70,
              flex: 1,
            }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#A984C3",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  fontWeight: "400",
                  padding: 10,
                }}
              >
                Popular this week
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "rgba(255, 255, 255, 0.31)",
                flexDirection: "row",
                shadowColor: "rgba(0, 0, 0, 0.25)",
                borderBottomColor: "gray",
                borderBottomWidth: 2,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#000000",
                    fontWeight: "400",
                    padding: 10,
                  }}
                >
                  How to build confidence?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="eye"
                  color={"gray"}
                  size={18}
                  style={{ padding: 10, left: 15 }}
                >
                  <Text style={{ fontSize: 14 }}>232</Text>
                </MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "rgba(255, 255, 255, 0.31)",
                flexDirection: "row",
                shadowColor: "rgba(0, 0, 0, 0.25)",
                borderBottomColor: "gray",
                borderBottomWidth: 2,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#000000",
                    fontWeight: "400",
                    padding: 10,
                  }}
                >
                  Habits to reduce anxiety
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="eye"
                  color={"gray"}
                  size={18}
                  style={{ padding: 10, paddingLeft: 30, position: "absolute" }}
                >
                  <Text style={{ fontSize: 14 }}>232</Text>
                </MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#A984C3",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  fontWeight: "400",
                  padding: 10,
                }}
              >
                Latest Releases
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "rgba(255, 255, 255, 0.31)",
                flexDirection: "row",
                shadowColor: "rgba(0, 0, 0, 0.25)",
                borderBottomColor: "gray",
                borderBottomWidth: 2,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#000000",
                    fontWeight: "400",
                    padding: 10,
                  }}
                >
                  Habits to reduce anxiety
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="eye"
                  color={"gray"}
                  size={18}
                  style={{ padding: 10, paddingLeft: 30, position: "absolute" }}
                >
                  <Text style={{ fontSize: 14 }}>232</Text>
                </MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
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
});

export default Readings;
