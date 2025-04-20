import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import styles from "../styles/styles";
import SeparatorLine from "../components/seperation_line";
import Colors from "../styles/colors";

const BottomBarNavigation = ({ navigationRef }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderIcon = (iconSource, navigateTo) => {
    const isActive = route.name === navigateTo;
    const iconStyle = isActive ? styles.image : undefined;

    return (
      <TouchableOpacity
        style={iconStyle}
        onPress={async () => {
          navigation.navigate(navigateTo);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Image source={iconSource} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.staticBottomContainer}>
      <View style={styles.staticBottomLineContainer}>
        <SeparatorLine x1={0} y1={0} x2={"100%"} y2={0} strokeWidth={4} />
      </View>
      <View style={styles.iconContainer}>
        {renderIcon(require("../assets/icons/home_icon.png"), "FindSearch")}
        {renderIcon(
          require("../assets/icons/messages_icon.png"),
          "Notifications"
        )}
        {renderIcon(require("../assets/icons/activity_icon.png"), "YourBis")}
        {renderIcon(require("../assets/icons/account_icon.png"), "Profile")}
      </View>
    </View>
  );
};

export default BottomBarNavigation;
