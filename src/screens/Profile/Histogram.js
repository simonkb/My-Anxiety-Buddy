import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Histogram = ({ data }) => {
  const colorMap = {
    mild: "green",
    moderate: "yellow",
    severe: "red",
  };

  // Extract the maximum value of anxiety from the data
  const maxAnxiety = Math.max(...data.map((item) => item.anxietyLevel));

  // Calculate the height of each bar in the histogram
  const barHeight = 200 / maxAnxiety;

  // Render a bar for each day in the data
  const bars = data.map((item, index) => {
    const barStyle = {
      height: item.anxietyLevel * barHeight,
      backgroundColor: colorMap[item.anxietyLevel],
    };

    return (
      <View key={index} style={styles.bar}>
        <View style={[styles.barFill, barStyle]} />
        <Text style={styles.barLabel}>{item.day}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.yAxis}>
        <Text style={styles.yAxisLabel}>Severity</Text>
        <View style={styles.yAxisTicks}>
          <Text style={styles.yAxisTick}>0</Text>
          <Text style={styles.yAxisTick}>{maxAnxiety / 2}</Text>
          <Text style={styles.yAxisTick}>{maxAnxiety}</Text>
        </View>
      </View>
      <View style={styles.bars}>{bars}</View>
      <Text style={styles.xAxisLabel}>Days</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 10,
  },
  yAxis: {
    alignItems: "flex-end",
    marginRight: 5,
  },
  yAxisLabel: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  yAxisTicks: {
    height: 200,
    justifyContent: "space-between",
  },
  yAxisTick: {
    fontWeight: "bold",
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 1,
  },
  bar: {
    width: 20,
    marginRight: 5,
    alignItems: "center",
  },
  barFill: {
    width: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  barLabel: {
    marginTop: 5,
    fontWeight: "bold",
  },
  xAxisLabel: {
    alignSelf: "center",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default Histogram;
