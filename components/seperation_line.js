import React from "react";
import Svg, { Line } from "react-native-svg";
import Colors from "../styles/colors";

const SeparatorLine = ({
  height,
  width,
  x1,
  y1,
  x2,
  y2,
  strokeColor,
  strokeWidth,
}) => (
  <Svg height={height} width={width}>
    <Line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={strokeColor ? strokeColor : Colors.Highlight}
      strokeWidth={strokeWidth ? strokeWidth : 3}
    />
  </Svg>
);

export default SeparatorLine;
