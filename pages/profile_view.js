import React, { useContext, useState, useEffect } from "react";
import { View, ImageBackground, Text } from "react-native";
import styles from "../styles/styles"; // Ensure the path to the styles file is correct
import { UserContext } from "../models/UserContext";
import BottomBarNavigation from "../navigation/bottom_bar";
import PageTitle from "../components/page_title";
import SeparatorLine from "../components/seperation_line";
import ProfileStats from "../components/profile_stats";
import LinearGradientWrapper from "../components/linear_gradient_wrapper";

const image = {
  uri: "https://docs.expo.dev/static/images/tutorial/background-image.png",
};

const ProfileView = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: "",
    fullname: "",
    stars: 0,
    review_count: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const fetchedData = await user.fetchUserData();
        setUserData({
          username: fetchedData.username,
          fullname: fetchedData.fullname,
          stars: fetchedData.stars,
          review_count: fetchedData.review_count,
        });
      }
    };
    fetchUserData();
  }, [user]);
  return (
    <LinearGradientWrapper startColor="#2e4057" endColor="#dbcbd8">
      <PageTitle page_title={"Profile"} />
      <View style={styles.profile_main_view}>
        <View style={styles.profile_image_section}>
          <ImageBackground
            source={image}
            style={styles.profile_image_view}
            imageStyle={styles.profile_image_style}
          />
          <Text style={styles.profile_username_text}>{userData.username}</Text>
        </View>
        <View style={styles.pfp_image_line_sep}>
          <SeparatorLine
            height={110}
            width={10}
            x1={0}
            y1={0}
            x2={0}
            y2={100}
          />
        </View>
        <ProfileStats userData={userData} />
      </View>
      <BottomBarNavigation />
    </LinearGradientWrapper>
  );
};

export default ProfileView;
