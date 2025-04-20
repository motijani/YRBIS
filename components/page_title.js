import React, { useRef } from "react";
import { View, Text } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { StyleSheet } from "react-native-web";
import Colors from "../styles/colors";

/**
 * Creates a pagetitle with a top card
 * @param {} param0 height of the page to take
 * @returns
 */
const PageTitle = ({ page_title }) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{page_title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    color: Colors.Primary,
    fontFamily: "Aileron-Light",
    marginTop: 60,
  },
});

export default PageTitle;
