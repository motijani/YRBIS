import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import styles from "../styles/styles"; // Import the styles from styles.js
import InputLabel from "../components/input_label";
import React, { useState, useEffect } from "react";
import BottomBarNavigation from "../navigation/bottom_bar";
import PageTitle from "../components/page_title";
import useGetBis from "../components/hooks/useGetBis";

const FindSearch = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("For You");
  const { data, isLoading, refetch } = useGetBis(); // Call the hook here

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const image = {
    uri: "https://docs.expo.dev/static/images/tutorial/background-image.png",
  };
  const renderForYou = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    if (!data || data.length === 0) {
      return <Text>No businesses found</Text>;
    }
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={customStyles.itemContainer}>
            <View style={customStyles.profile}>
              <Text style={customStyles.itemTitle}>{item.title}</Text>
              <ImageBackground
                source={image}
                style={styles.profile_image_view}
                imageStyle={styles.profile_image_style}
              />
            </View>
            <Text style={customStyles.itemDescription}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.business_id.toString()} // Use business_id as key
      />
    );
  };

  return (
    <View style={styles.main_background}>
      <View style={styles.column_page_header}>
        <PageTitle page_title={"Find Bis"} />
        <InputLabel
          containerStyle={styles.input_container}
          style={[styles.generic_input_container, { height: 50, width: "90%" }]}
          placeholder="Search Businesses" //Current text asset does not load certain characters properly
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <View style={styles.bis_tab_nav}>
          <TouchableOpacity
            style={[
              styles.bis_tab_nav_item,
              selectedTab === "For You" && styles.bis_tab_nav_item_selected,
            ]}
            onPress={() => setSelectedTab("For You")}
          >
            <Text>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.bis_tab_nav_item,
              selectedTab === "Best Sellers" &&
                styles.bis_tab_nav_item_selected,
            ]}
            onPress={() => setSelectedTab("Best Sellers")}
          >
            <Text>Best Sellers</Text>
          </TouchableOpacity>
        </View>
        <View style={customStyles.view_bis_list_container}>
          <SafeAreaView
            contentContainerStyle={customStyles.scrollViewContentContainer}
            bounces={true}
          >
            {selectedTab === "For You" && !isLoading && renderForYou()}
            {selectedTab === "Best Sellers" && (
              <Text>Best Sellers content goes here</Text>
            )}
          </SafeAreaView>
        </View>
      </View>
      <BottomBarNavigation />
    </View>
  );
};

export const customStyles = StyleSheet.create({
  view_bis_list_container: {
    flexDirection: "column",
    borderRadius: 25,
    marginTop: 25,
    paddingHorizontal: 10, // Add padding to the container
    marginBottom: 40,
  },
  scrollViewContentContainer: {
    paddingBottom: 20, // Add extra padding at the bottom to ensure content is visible
  },

  itemTitle: {
    fontSize: 16,
    fontFamily: "Aileron-Light",
  },

  itemContainer: {
    height: 150,
    width: "90%",
    marginHorizontal: 10,
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },

  profile: {
    marginLeft: 10,
    marginTop: 10,
  },
});

export default FindSearch;
