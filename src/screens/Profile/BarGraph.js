import React from "react";
import { View, Text } from "react-native";
import { Svg, Rect, Text as SVGText } from "react-native-svg";

const BarGraph = ({ data, width, height }) => {
  const maxValue = Math.max(...data);
  const barWidth = width / data.length;

  return (
    <Svg width={width} height={height}>
      {data.map((value, index) => (
        <Rect
          key={index}
          x={index * barWidth}
          y={height - (value / maxValue) * height}
          width={barWidth}
          height={(value / maxValue) * height}
          fill="blue"
        />
      ))}
      {data.map((value, index) => (
        <SVGText
          key={index}
          x={index * barWidth + barWidth / 2}
          y={height - (value / maxValue) * height - 10}
          fontSize="12"
          fill="white"
          textAnchor="middle"
        >
          {value}
        </SVGText>
      ))}
    </Svg>
  );
};

export default BarGraph;
