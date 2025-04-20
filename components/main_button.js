import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../styles/colors";

/**
 *
 * @param
 *  text: the text to put on the button
 *  onPress: function for the press
 *  buttonContainer: a style contaning the hight and widht, and any other aspect that may not be generic ex: alignment
 * @returns A button with the style structure given
 */
const Button = ({ text, onPress, additionalButtonStyle }) => (
  <TouchableOpacity
    style={Object.assign(
      {},
      additionalButtonStyle,
      styles.generic_button_container
    )}
    onPress={onPress}
  >
    <Text style={styles.button_style}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  generic_button_container: {
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: Colors.Primary,
    borderColor: Colors.Highlight,
    borderWidth: 2,
    shadowColor: Colors.Highlight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  button_style: {
    fontSize: 15,
    fontFamily: "Aileron-Heavy",
    color: Colors.Secondary,
  },
});

export default Button;
