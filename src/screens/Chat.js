import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Picker,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Chat extends React.Component {
  render() {
    if (this.props.type === "toUser") {
      return (
        <View
          style={{
            flexDirection: "row",
            position: "relative",
            padding: 10,
            width: "100%",
            marginVertical: 30,
            alignSelf: "baseline",
          }}
        >
          <View
            style={{
              position: "absolute",
              right: "14%",
              width: "80%",
              alignSelf: "baseline",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderRadius: 10,
              opacity: 0.8,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                padding: 10,
              }}
            >
              {this.props.message}
            </Text>
          </View>

          <View
            style={{
              position: "absolute",
              right: "5%",
            }}
          >
            <MaterialCommunityIcons
              name="account"
              color={"gray"}
              size={30}
            ></MaterialCommunityIcons>
          </View>
        </View>
      );
    } else if (this.props.type === "toBot") {
      return (
        <View
          style={{
            left: 5,
            flexDirection: "row",
            position: "relative",
            padding: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              position: "absolute",
            }}
          >
            <MaterialCommunityIcons
              name="account"
              color={"gray"}
              size={30}
            ></MaterialCommunityIcons>
          </View>

          <View
            style={{
              position: "absolute",
              left: 40,
              width: "80%",
              alignSelf: "baseline",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 5,
              padding: 5,
            }}
          >
            {this.props.responses.option_1 != null ? (
              <TouchableOpacity
                // onPress={() => {
                //   this.props.onPress(this.props.responses.option_1);
                // }}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0.7,
                  padding: 5,
                  borderRadius: 5,
                  marginVertical: 2,
                }}
              >
                <Text>{this.props.responses.option_1}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {this.props.responses.option_2 != null ? (
              <TouchableOpacity
                // onPress={() => {
                //   this.props.onPress(this.props.responses.option_2);
                // }}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0.7,
                  padding: 5,
                  borderRadius: 5,
                  marginVertical: 2,
                }}
              >
                <Text>{this.props.responses.option_2}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {this.props.responses.option_3 != null ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0.7,
                  padding: 5,
                  borderRadius: 5,
                  marginVertical: 2,
                }}
              >
                <Text>{this.props.responses.option_3}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {this.props.responses.option_4 != null ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0.7,
                  padding: 5,
                  borderRadius: 5,
                  marginVertical: 2,
                }}
              >
                <Text>{this.props.responses.option_4}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}
