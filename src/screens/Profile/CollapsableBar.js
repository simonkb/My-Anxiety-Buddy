import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const CollapsibleBar = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View
      style={{
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        marginBottom: 10,
        overflow: "hidden",
        width: "90%",
        opacity:0.8
      }}
    >
      <TouchableOpacity style={styles.header} onPress={toggleCollapse}>
        <Text style={{ fontWeight: "600" }}>{title}</Text>
        <Icon
          name={isCollapsed ? "chevron-down" : "chevron-up"}
          size={20}
          color="#555"
        />
      </TouchableOpacity>
      {!isCollapsed && children}
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
  },
  topBarViews: {
    width: "25%",
    alignContent: "center",
  },
  title: {
    color: "#333", // color of the title text
    fontSize: 20, // size of the title text
    fontWeight: "bold", // make the text bold
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
export default CollapsibleBar;
