import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../styles/colors";
import UpdateForm from "../pages/update_form";
import { UserContext } from "../models/UserContext";

const BisView = ({ data, navigation }) => {
  const formattedDate = new Date(data.datePosted).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const { user } = useContext(UserContext);

  return (
    <TouchableOpacity
      onPress={() => [
        user.changeBisViewId(data.business_id),
        navigation.navigate("UpdateForm"),
      ]}
      style={custom_style.containerStyle}
    >
      <Text style={custom_style.title_text_style}>{data.title}</Text>
      <Text style={[custom_style.title_text_style, { fontSize: 10 }]}>
        Date Posted: {formattedDate}
      </Text>
      <Text
        style={[
          custom_style.title_text_style,
          { color: data.status == "Active" ? "#0bf446" : "grey" },
        ]}
      >
        {data.status}
      </Text>
    </TouchableOpacity>
  );
};

const custom_style = StyleSheet.create({
  title_text_style: {
    fontFamily: "Aileron-Bold",
    color: Colors.Primary,
    fontSize: 18,
    alignSelf: "center",
  },
  containerStyle: {
    justifyContent: "space-between",
    width: 200,
    height: 175 / 2.5,
    backgroundColor: Colors.Secondary,
    borderColor: Colors.Highlight,
    borderRadius: 5,
    opacity: 1,
  },
});

export default BisView;
