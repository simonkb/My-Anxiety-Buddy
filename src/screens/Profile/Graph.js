import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";

export default class Graph extends Component {
  state = {
    anxietyData: [
      { date: "2022-01-01", level: 2 },
      { date: "2022-01-02", level: 1 },
      { date: "2022-01-03", level: 3 },
      { date: "2022-01-04", level: 1 },
      { date: "2022-01-05", level: 2 },
      { date: "2022-01-06", level: 3 },
      { date: "2022-01-07", level: 1 },
      { date: "2022-01-08", level: 2 },
      { date: "2022-01-09", level: 3 },
      { date: "2022-01-10", level: 1 },
      { date: "2022-01-11", level: 2 },
      { date: "2022-01-12", level: 3 },
      { date: "2022-01-13", level: 1 },
      { date: "2022-01-14", level: 2 },
      { date: "2022-01-15", level: 3 },
      { date: "2022-01-16", level: 1 },
      { date: "2022-01-17", level: 2 },
      { date: "2022-01-18", level: 3 },
      { date: "2022-01-19", level: 1 },
      { date: "2022-01-20", level: 2 },
      { date: "2022-01-21", level: 3 },
    ],
  };

  render() {
    return (
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
            <VictoryAxis tickFormat={(date) => date.split("-")[2]} />
            <VictoryAxis dependentAxis tickValues={[1, 2, 3]} />
            <VictoryBar
              data={this.state.anxietyData}
              x="date"
              y="level"
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.level === 1
                      ? "green"
                      : datum.level === 2
                      ? "yellow"
                      : "red",
                },
              }}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
