import React, { useRef } from "react";
import { View, ScrollView, Text } from "react-native";
import { Svg, Rect, Text as T } from "react-native-svg";

const BAR_WIDTH = 30;
const BAR_SPACING = 50;
const GRAPH_MARGIN = 30;

const COLORS = {
  1: "green",
  2: "#A9DE11",
  3: "#DED511",
  4: "red",
};

const BarGraph = ({ data }) => {
  const scrollViewRef = useRef();
  const maxLevel = Math.max(...data.map((item) => item.level));
  const graphHeight = maxLevel * 50 + 40;
  const graphWidth =
    (BAR_WIDTH + BAR_SPACING) * data.length - BAR_SPACING + 2 * GRAPH_MARGIN;
  const LEGEND_DATA = [
    { color: "green", label: "Normal" },
    { color: "#A9DE11", label: "Mild anxiety" },
    { color: "#DED511", label: "Moderate anxiety" },
    { color: "red", label: "Severe anxiety" },
  ];

  const LegendItem = ({ color, label }) => {
    return (
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View
          style={{
            width: 16,
            height: 16,
            backgroundColor: color,
            marginRight: 0,
            margin: 5,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: 16,
            marginRight: 0,
            margin: 5,
          }}
        >
          <Text>{label}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <Svg width={graphWidth} height={graphHeight + 2 * GRAPH_MARGIN}>
          <Rect
            x={GRAPH_MARGIN}
            y={GRAPH_MARGIN}
            width={graphWidth - 2 * GRAPH_MARGIN}
            height={graphHeight}
            fill="#eee"
          />
          {data.map((item, index) => (
            <Rect
              key={index}
              x={GRAPH_MARGIN + index * (BAR_WIDTH + BAR_SPACING)}
              y={graphHeight - item.level * 50 + GRAPH_MARGIN}
              width={BAR_WIDTH}
              height={item.level * 50}
              fill={COLORS[item.level]}
            />
          ))}
          {data.map((item, index) => (
            <T
              key={index}
              x={
                GRAPH_MARGIN + index * (BAR_WIDTH + BAR_SPACING) + BAR_WIDTH / 2
              }
              y={graphHeight + GRAPH_MARGIN + 15}
              fontSize="12"
              textAnchor="middle"
            >
              {item.date}
            </T>
          ))}
        </Svg>
      </ScrollView>
      <View style={{ bottom: 0, width: "100%" }}>
        <View style={{ flexDirection: "column", left: "10%" }}>
          {LEGEND_DATA.map((legendItem, index) => (
            <LegendItem
              key={index}
              color={legendItem.color}
              label={legendItem.label}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default BarGraph;
