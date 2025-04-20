import React, { useRef } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

/**
 * InputLabel
 * showLength, the length is displayed in the middle of containerStyle
 * @param {*} param0
 * @returns
 */
const InputLabel = ({
  containerStyle,
  placeholder,
  value,
  onChangeText,
  style,
  customContainer,
  maxLength,
  showLength = false,
  multiLine = false,
  ...props
}) => {
  const textInputRef = useRef(null);

  return (
    <View style={containerStyle}>
      <TextInput
        ref={textInputRef}
        style={[
          style,
          {
            textAlign: "center",
            justifyContent: "center",
            textAlignVertical: multiLine ? "top" : "center",
          },
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength ? maxLength : 25}
        {...props}
      />
      {showLength ? (
        <Text style={custom_style.lengthText}>{maxLength - value.length}</Text>
      ) : null}
    </View>
  );
};

const custom_style = StyleSheet.create({
  lengthText: {
    top: -12,
    fontFamily: "Aileron-Bold",
    color: "grey",
    fontSize: 10,
    alignSelf: "center",
  },
});

export default InputLabel;
