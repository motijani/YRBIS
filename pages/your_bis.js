import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles"; // Import the styles from styles.js
import InputLabel from "../components/input_label";
import React, { useState, useContext, useEffect, useCallback } from "react";
import BottomBarNavigation from "../navigation/bottom_bar";
import PageTitle from "../components/page_title";
import LinearGradientWrapper from "../components/linear_gradient_wrapper";
import Button from "../components/main_button";
import Colors from "../styles/colors";
import { UserContext } from "../models/UserContext";
import BisView from "../components/bis_view_";
import { useFocusEffect } from "@react-navigation/native";

const YourBis = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const [activeBis, setActiveBis] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pausedBis, setPausedBis] = useState([]);

  const renderUserActiveBis = async () => {
    try {
      let bis = await user.getUserBis();
      const activeBisViews = bis
        .filter((bisItem) => bisItem.status === "Active")
        .map((bisItem) => (
          <BisView
            key={bisItem.business_id}
            data={bisItem}
            navigation={navigation}
          />
        ));

      setActiveBis(activeBisViews);
    } catch (e) {
      console.error(e);
    }
  };

  const renderUserPausedBis = async () => {
    try {
      let bis = await user.getUserBis();
      const activeBisViews = bis
        .filter((bisItem) => bisItem.status === "Paused")
        .map((bisItem) => (
          <BisView
            key={bisItem.business_id}
            data={bisItem}
            navigation={navigation}
          />
        ));

      setPausedBis(activeBisViews);
    } catch (e) {
      console.error(e);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    renderUserPausedBis();
    renderUserActiveBis().then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      renderUserPausedBis();
      renderUserActiveBis();
    }, [])
  );

  useEffect(() => {
    renderUserPausedBis();
    renderUserActiveBis();
  }, []);

  return (
    <LinearGradientWrapper startColor="#2e4057" endColor="#dbcbd8">
      <View style={styles.column_page_header}>
        <PageTitle page_title={"Post Bis"} />
        <Button
          text={"+ Add New"}
          additionalButtonStyle={styles.post_bis_text_container}
          onPress={() => navigation.navigate("PostBis")}
        />
        <View style={customStyles.titleContainer}>
          <Text style={customStyles.title_text}>ACTIVE</Text>
        </View>
        <View style={customStyles.activeContainer}>
          <ScrollView
            contentContainerStyle={customStyles.scrollingContainer}
            keyboardShouldPersistTaps="handled"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {activeBis}
          </ScrollView>
        </View>
        <View style={customStyles.titleContainer}>
          <Text style={customStyles.title_text}>PAUSED</Text>
        </View>
        <View style={customStyles.activeContainer}>
          <ScrollView
            contentContainerStyle={customStyles.scrollingContainer}
            keyboardShouldPersistTaps="handled"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {pausedBis}
          </ScrollView>
        </View>
      </View>
      <BottomBarNavigation />
    </LinearGradientWrapper>
  );
};

export const customStyles = StyleSheet.create({
  sampleBisView: {
    width: 200,
    height: 175 / 1.5,
    backgroundColor: "red",
  },
  scrollingContainer: {
    height: 175,
    gap: 25,
    height: 160,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  activeContainer: {
    display: "flex",
    height: 175,
    backgroundColor: Colors.Primary,
    flexDirection: "row",
    borderRadius: 25,
    marginTop: 15,
    overflow: "hidden", // Ensure content doesn't overflow the container
    paddingHorizontal: 10, // Add padding to the container
    borderColor: Colors.Highlight,
    borderWidth: 2,
    marginBottom: 40,
  },
  title_text: {
    fontFamily: "Aileron-Heavy",
    color: Colors.Secondary,
    fontSize: 18,
    alignSelf: "center",
  },
  titleContainer: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.Primary,
    borderColor: Colors.Highlight,
    borderWidth: 2,
    shadowColor: Colors.Highlight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
});

export default YourBis;
