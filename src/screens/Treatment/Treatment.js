import { NavigationContainer } from "@react-navigation/native";
import TreatmentStack from "../../routes/treatmentStack";
import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useGlobalState, setGlobalState } from "../../states/state.js";
const Treatment = ({ navigation }) => {
  return (
    <>
      <TreatmentStack></TreatmentStack>
    </>
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
  shortTermRow: {
    width: "90%",
    height: 35,
    backgroundColor: "#A984C3",
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    margin: "5%",
  },
});

export default Treatment;
