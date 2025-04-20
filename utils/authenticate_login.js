import * as React from "react";
import { Image, View, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import styles from "../styles/styles";

const LoggedIn = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <View style={styles.appContainer}>
        <HomeStackNavigator />
        <BottomBarNavigation navigationRef={navigationRef} />
      </View>
    </NavigationContainer>
  );
};
export default LoggedIn;
