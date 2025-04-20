import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import { UserContext } from "../models/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import LinearGradientWrapper from "../components/linear_gradient_wrapper";

const GetStarted = ({ navigation }) => {
  const { user } = useContext(UserContext);
  //If new account, get started should route into profile section, otherwise straight to find search page
  return (
    <LinearGradientWrapper startColor={"#dbcbd8"} endColor={"#2e4057"}>
      <View style={styles.homeMainContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FindSearch")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradientWrapper>
  );
};

export default GetStarted;
