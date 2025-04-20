import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";

const LinearGradientWrapper = ({ children, startColor, endColor }) => {
  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: -0.8, y: 0.3 }}
      end={{ x: 0, y: 1 }}
      style={styles.topHeader}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientWrapper;
